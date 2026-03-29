import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

type ImportRow = {
  email?: string;
  firstName?: string;
  lastName?: string;
  yearLevel?: string;
  course?: string;
  division?: string;
  age?: string | number;
  password?: string;
};

function generatePassword() {
  const randomPart = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `Alumno${randomPart}!`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const authHeader = req.headers.get("Authorization") ?? "";

    if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
      throw new Error("Faltan variables de entorno para la función.");
    }

    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader
        }
      }
    });

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const {
      data: { user },
      error: authError
    } = await userClient.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: "No autorizado." }, { status: 401, headers: corsHeaders });
    }

    const { data: adminProfile, error: adminProfileError } = await userClient
      .from("profiles")
      .select("id, role")
      .eq("id", user.id)
      .single();

    if (adminProfileError || adminProfile?.role !== "admin") {
      return Response.json({ error: "Solo un usuario administrador puede importar estudiantes." }, { status: 403, headers: corsHeaders });
    }

    const body = await req.json();
    const rows = Array.isArray(body?.rows) ? (body.rows as ImportRow[]) : [];

    let created = 0;
    let updated = 0;
    let skipped = 0;
    const createdCredentials: Array<{ email: string; password: string }> = [];
    const details: string[] = [];

    for (const rawRow of rows) {
      const email = String(rawRow.email ?? "").trim().toLowerCase();
      if (!email) {
        skipped += 1;
        details.push("Fila omitida por no tener email.");
        continue;
      }

      const password = String(rawRow.password ?? "").trim() || generatePassword();

      const { data: existingProfile } = await adminClient
        .from("profiles")
        .select("id, email")
        .eq("email", email)
        .maybeSingle();

      if (existingProfile?.id) {
        const { error: updateProfileError } = await adminClient
          .from("profiles")
          .update({
            first_name: rawRow.firstName ?? null,
            last_name: rawRow.lastName ?? null,
            full_name: `${rawRow.firstName ?? ""} ${rawRow.lastName ?? ""}`.trim() || null,
            year_level: rawRow.yearLevel ?? null,
            course: rawRow.course ?? null,
            division: rawRow.division ?? null,
            age: rawRow.age ? Number(rawRow.age) : null,
            email
          })
          .eq("id", existingProfile.id);

        if (updateProfileError) {
          skipped += 1;
          details.push(`No se pudo actualizar ${email}.`);
          continue;
        }

        updated += 1;
        continue;
      }

      const { data: createdUser, error: createUserError } = await adminClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (createUserError || !createdUser.user) {
        skipped += 1;
        details.push(`No se pudo crear ${email}: ${createUserError?.message ?? "sin detalle"}`);
        continue;
      }

      const userId = createdUser.user.id;

      const { error: profileError } = await adminClient.from("profiles").upsert({
        id: userId,
        role: "student",
        email,
        first_name: rawRow.firstName ?? null,
        last_name: rawRow.lastName ?? null,
        full_name: `${rawRow.firstName ?? ""} ${rawRow.lastName ?? ""}`.trim() || null,
        year_level: rawRow.yearLevel ?? null,
        course: rawRow.course ?? null,
        division: rawRow.division ?? null,
        age: rawRow.age ? Number(rawRow.age) : null
      });

      if (profileError) {
        skipped += 1;
        details.push(`Se creó el usuario ${email}, pero falló la ficha de perfil.`);
        continue;
      }

      await adminClient.from("journey_progress").upsert({
        student_id: userId,
        submitted: false,
        completion_percent: 0,
        current_module: 0
      });

      created += 1;
      createdCredentials.push({ email, password });
    }

    return Response.json(
      {
        created,
        updated,
        skipped,
        createdCredentials,
        details
      },
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Error inesperado en importación." },
      { status: 500, headers: corsHeaders }
    );
  }
});
