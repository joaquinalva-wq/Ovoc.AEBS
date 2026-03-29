const appEl = document.getElementById("app");
const modePill = document.getElementById("mode-pill");
const logoutButton = document.getElementById("logout-button");
const sessionSummary = document.getElementById("session-summary");

const APP = window.APP_CONFIG || {};

const MODULES = [
  {
    key: "perfil",
    title: "Abrir mi legajo",
    description: "Datos iniciales, contexto escolar y primera foto vocacional.",
    activities: ["profile_intro", "identity_story"]
  },
  {
    key: "intereses",
    title: "Intereses y preferencias",
    description: "Qué me atrae, qué valoro y con qué tareas conecto.",
    activities: ["interests_board", "task_links", "values_rank"]
  },
  {
    key: "fortalezas",
    title: "Fortalezas y habilidades",
    description: "Dónde me siento fuerte y qué necesito trabajar más.",
    activities: ["strengths_radar", "growth_reflection"]
  },
  {
    key: "proyeccion",
    title: "Proyección vocacional",
    description: "Cómo imagino mi futuro y qué caminos quiero explorar.",
    activities: ["ideal_day_draw", "decision_scenarios", "future_options"]
  },
  {
    key: "cierre",
    title: "Cierre y envío",
    description: "Síntesis final, próximos pasos y envío a administración.",
    activities: ["final_commitment"]
  }
];

const ACTIVITIES = {
  profile_intro: { key: "profile_intro", moduleKey: "perfil", title: "Ficha inicial", description: "Información básica del estudiante y primera hipótesis vocacional." },
  identity_story: { key: "identity_story", moduleKey: "perfil", title: "Autorretrato breve", description: "Frases cortas para empezar a registrar disfrutes, referentes y rechazos." },
  interests_board: { key: "interests_board", moduleKey: "intereses", title: "Tablero de intereses", description: "Cada tarjeta se valora por nivel de atracción: mucho, algo o poco." },
  task_links: { key: "task_links", moduleKey: "intereses", title: "Uní con flechas", description: "Conectá tareas que te gustan con áreas de estudio o trabajo." },
  values_rank: { key: "values_rank", moduleKey: "intereses", title: "Ranking de valores", description: "Ordená qué pesa más cuando imaginás tu futuro." },
  strengths_radar: { key: "strengths_radar", moduleKey: "fortalezas", title: "Radar de fortalezas", description: "Puntaje personal con evidencia concreta de tu forma de actuar." },
  growth_reflection: { key: "growth_reflection", moduleKey: "fortalezas", title: "Habilidades a trabajar", description: "Obstáculos, emociones y apoyos que hoy necesitás." },
  ideal_day_draw: { key: "ideal_day_draw", moduleKey: "proyeccion", title: "Mi día ideal", description: "Dibujo libre más reflexión sobre el tipo de futuro que imaginás." },
  decision_scenarios: { key: "decision_scenarios", moduleKey: "proyeccion", title: "Escenarios de decisión", description: "Situaciones breves para observar criterio, prioridades y estilo de elección." },
  future_options: { key: "future_options", moduleKey: "proyeccion", title: "Opciones a explorar", description: "Formatos de estudio, inquietudes y experiencias que querés probar." },
  final_commitment: { key: "final_commitment", moduleKey: "cierre", title: "Cierre del proceso", description: "Plan inmediato, conciencia de fortalezas y envío para revisión." }
};

const INTEREST_CARDS = [
  { id: "salud", title: "Salud y bienestar", text: "Cuidado, prevención, acompañamiento, mente y cuerpo." },
  { id: "tecnologia", title: "Tecnología e innovación", text: "Resolver problemas, crear sistemas, programar, investigar." },
  { id: "comunicacion", title: "Comunicación y medios", text: "Hablar, escribir, influir, contar historias, crear contenidos." },
  { id: "negocios", title: "Negocios y liderazgo", text: "Organizar proyectos, vender ideas, emprender y gestionar." },
  { id: "arte", title: "Arte y diseño", text: "Imaginar, diseñar, producir, representar, crear visualmente." },
  { id: "social", title: "Derecho y ciencias sociales", text: "Debatir, mediar, analizar contextos, defender causas." },
  { id: "educacion", title: "Educación y acompañamiento", text: "Explicar, enseñar, guiar, escuchar y ayudar a crecer." },
  { id: "deporte", title: "Deporte y movimiento", text: "Entrenar, activar al cuerpo, rendimiento, hábitos y equipo." }
];

const TASK_LINKS = {
  left: [
    { id: "task_explain", title: "Explicar ideas con claridad", text: "Dar ejemplos, traducir temas complejos y sostener la atención." },
    { id: "task_build", title: "Diseñar o construir soluciones", text: "Crear objetos, prototipos, sistemas o experiencias nuevas." },
    { id: "task_help", title: "Acompañar a otras personas", text: "Escuchar, orientar, contener y mejorar su bienestar." },
    { id: "task_argue", title: "Argumentar y defender una postura", text: "Debatir con fundamentos y persuadir con evidencia." },
    { id: "task_lead", title: "Coordinar equipos o proyectos", text: "Planificar, ordenar tiempos y lograr resultados." },
    { id: "task_move", title: "Trabajar con el cuerpo y la acción", text: "Entrenar, acompañar hábitos, mejorar rendimiento o movilidad." }
  ],
  right: [
    { id: "educacion", title: "Educación y acompañamiento", text: "Profesorados, psicopedagogía, tutorías." },
    { id: "tecnologia", title: "Tecnología e innovación", text: "Sistemas, ingeniería, datos, UX." },
    { id: "salud", title: "Salud y bienestar", text: "Psicología, medicina, kinesiología, nutrición." },
    { id: "social", title: "Derecho y ciencias sociales", text: "Derecho, relaciones humanas, mediación." },
    { id: "negocios", title: "Negocios y liderazgo", text: "Administración, marketing, emprendimientos." },
    { id: "arte", title: "Arte y diseño", text: "Diseño gráfico, audiovisual, arquitectura." },
    { id: "deporte", title: "Deporte y movimiento", text: "Entrenamiento, educación física, rendimiento." }
  ]
};

const VALUE_ITEMS = ["Impacto social", "Autonomía", "Creatividad", "Estabilidad", "Innovación", "Trabajo con personas", "Investigación", "Ingresos"];

const SKILLS = [
  { id: "communication", label: "Comunicación" },
  { id: "organization", label: "Organización" },
  { id: "creativity", label: "Creatividad" },
  { id: "problem_solving", label: "Resolución de problemas" },
  { id: "teamwork", label: "Trabajo en equipo" },
  { id: "autonomy", label: "Autonomía" },
  { id: "emotional", label: "Manejo emocional" },
  { id: "consistency", label: "Constancia" }
];

const SCENARIOS = [
  {
    id: "scenario_a",
    title: "Elegir entre tres caminos",
    text: "Tenés que optar por una propuesta estable, una muy creativa y otra con alto impacto social. ¿Cuál elegís primero?",
    options: [
      "La estable, porque necesito seguridad para avanzar.",
      "La creativa, porque necesito sentir entusiasmo por lo que hago.",
      "La de impacto social, porque necesito sentir que lo que hago sirve."
    ]
  },
  {
    id: "scenario_b",
    title: "Tu rol en un proyecto grupal",
    text: "En un proyecto importante del colegio, ¿qué lugar solés ocupar?",
    options: [
      "Ordeno, reparto tareas y cuido que todo llegue a tiempo.",
      "Propongo ideas y busco una forma diferente de hacerlo.",
      "Escucho al grupo, sostengo el clima y ayudo a destrabar conflictos."
    ]
  },
  {
    id: "scenario_c",
    title: "Cómo aprendés mejor",
    text: "Si querés descubrir si un área te gusta de verdad, ¿qué hacés?",
    options: [
      "Tomo un curso breve y pruebo con una experiencia concreta.",
      "Busco mucha información antes de moverme.",
      "Hablo con gente que ya está en ese camino."
    ]
  }
];

const FORMAT_OPTIONS = ["Carrera universitaria", "Tecnicatura o formación corta", "Curso intensivo", "Pasantía o práctica", "Proyecto emprendedor", "Voluntariado o experiencia social"];
const CONCERN_OPTIONS = ["No tengo claro qué me gusta", "Me gusta algo pero dudo de mis habilidades", "Siento presión externa por elegir", "Me preocupa la salida laboral", "Me cuesta decidir entre varias opciones", "Quiero explorar sin comprometerme todavía"];
const EXPERIENCE_OPTIONS = ["Visitar una universidad", "Entrevistar a un profesional", "Hacer una mini pasantía", "Tomar un curso de prueba", "Participar en un proyecto real", "Hacer voluntariado"];

const TRACKS = {
  salud: { title: "Salud y bienestar", careers: ["Psicología", "Medicina", "Kinesiología", "Nutrición"], shortPrograms: ["Acompañamiento terapéutico", "Primeros auxilios", "Promoción de la salud"], experiences: ["Voluntariado de acompañamiento", "Charlas con profesionales de salud"] },
  tecnologia: { title: "Tecnología e innovación", careers: ["Ingeniería en sistemas", "Analista de sistemas", "UX/UI", "Ciencia de datos"], shortPrograms: ["Programación web", "Python inicial", "Robótica"], experiences: ["Hackatón escolar", "Proyecto de prototipado", "Mentoría tecnológica"] },
  comunicacion: { title: "Comunicación y medios", careers: ["Comunicación social", "Periodismo", "Publicidad", "Relaciones públicas"], shortPrograms: ["Oratoria", "Podcasting", "Community management"], experiences: ["Radio escolar", "Cobertura de eventos", "Laboratorio de contenidos"] },
  negocios: { title: "Negocios y liderazgo", careers: ["Administración", "Marketing", "Recursos humanos", "Comercio internacional"], shortPrograms: ["Excel aplicado", "Ventas consultivas", "Emprendedurismo"], experiences: ["Feria de emprendimientos", "Shadowing en empresas", "Proyecto comercial"] },
  arte: { title: "Arte y diseño", careers: ["Diseño gráfico", "Diseño industrial", "Arquitectura", "Producción audiovisual"], shortPrograms: ["Fotografía", "Modelado 3D", "Edición visual"], experiences: ["Portafolio personal", "Taller creativo", "Laboratorio maker"] },
  social: { title: "Derecho y ciencias sociales", careers: ["Derecho", "Trabajo social", "Relaciones internacionales", "Ciencia política"], shortPrograms: ["Debate", "Mediación", "Ciudadanía y participación"], experiences: ["Modelo ONU", "Clínica de debate", "Proyecto comunitario"] },
  educacion: { title: "Educación y acompañamiento", careers: ["Profesorados", "Psicopedagogía", "Ciencias de la educación", "Orientación escolar"], shortPrograms: ["Tutorías", "Diseño de talleres", "Herramientas de facilitación"], experiences: ["Apoyo escolar", "Mentorías entre pares", "Diseño de clases"] },
  deporte: { title: "Deporte y movimiento", careers: ["Educación física", "Entrenamiento deportivo", "Recreación", "Preparación física"], shortPrograms: ["Entrenamiento inicial", "Arbitraje", "Recreación y campamentos"], experiences: ["Clínica deportiva", "Coordinación de equipos", "Organización de torneos"] }
};

const state = {
  service: null,
  mode: "demo",
  session: null,
  profile: null,
  progress: { submitted: false, updatedAt: null },
  answers: {},
  selectedModule: 0,
  flash: null,
  adminStudents: [],
  adminBundle: null,
  adminFilters: { course: "all", status: "all" },
  interactive: { linkSelections: {} }
};

class DemoService {
  constructor() {
    this.mode = "demo";
    this.keys = {
      users: "mapaVocacionalDemoUsers",
      profiles: "mapaVocacionalDemoProfiles",
      answers: "mapaVocacionalDemoAnswers",
      progress: "mapaVocacionalDemoProgress",
      notes: "mapaVocacionalDemoNotes",
      session: "mapaVocacionalDemoSession"
    };
    this.seed();
  }

  seed() {
    if (localStorage.getItem(this.keys.users)) {
      return;
    }

    const users = [
      { id: "admin-1", email: "admin@austin-demo.edu", password: "Admin2026!", role: "admin", fullName: "Psicología Austin" },
      { id: "student-1", email: "lucia@austin-demo.edu", password: "Alumno2026!", role: "student", fullName: "Lucía Gómez" },
      { id: "student-2", email: "tomas@austin-demo.edu", password: "Alumno2026!", role: "student", fullName: "Tomás Ruiz" },
      { id: "student-3", email: "malena@austin-demo.edu", password: "Alumno2026!", role: "student", fullName: "Malena Sosa" }
    ];

    const profiles = {
      "admin-1": { id: "admin-1", role: "admin", fullName: "Psicología Austin", email: "admin@austin-demo.edu" },
      "student-1": { id: "student-1", role: "student", fullName: "Lucía Gómez", email: "lucia@austin-demo.edu", course: "5A", division: "A", yearLevel: "5to", age: "16" },
      "student-2": { id: "student-2", role: "student", fullName: "Tomás Ruiz", email: "tomas@austin-demo.edu", course: "6A", division: "A", yearLevel: "6to", age: "17" },
      "student-3": { id: "student-3", role: "student", fullName: "Malena Sosa", email: "malena@austin-demo.edu", course: "4B", division: "B", yearLevel: "4to", age: "15" }
    };

    const answers = {
      "student-1": {
        profile_intro: {
          firstName: "Lucía",
          lastName: "Gómez",
          age: "16",
          yearLevel: "5to",
          course: "5A",
          division: "A",
          email: "lucia@austin-demo.edu",
          favoriteSubjects: "Biología, literatura y psicología",
          difficultSubjects: "Matemática",
          extracurriculars: "Hockey, voluntariado con chicos",
          familyExpectations: "Que haga algo que disfrute pero con salida laboral",
          initialIdea: "Psicología o medicina"
        },
        identity_story: {
          capable: "Me siento capaz cuando acompaño a alguien y logro que se sienta mejor.",
          timeless: "Pierdo noción del tiempo cuando preparo actividades para otros.",
          admire: "Admiro a personas que saben escuchar y actuar con criterio.",
          reject: "No me veo en trabajos muy rutinarios o sin contacto humano."
        },
        interests_board: { salud: 3, tecnologia: 1, comunicacion: 2, negocios: 1, arte: 1, social: 2, educacion: 3, deporte: 2 },
        task_links: { pairs: [{ left: "task_help", right: "salud" }, { left: "task_explain", right: "educacion" }, { left: "task_argue", right: "social" }, { left: "task_move", right: "deporte" }] },
        values_rank: { order: ["Impacto social", "Trabajo con personas", "Estabilidad", "Autonomía", "Creatividad", "Investigación", "Innovación", "Ingresos"] },
        strengths_radar: {
          scores: { communication: 5, organization: 4, creativity: 4, problem_solving: 3, teamwork: 5, autonomy: 3, emotional: 4, consistency: 4 },
          evidence: "Suelo sostener equipos, escuchar a otros y organizar acciones concretas."
        },
        growth_reflection: {
          growthAreas: "Me cuesta poner límites y decidir rápido cuando hay varias opciones.",
          stressHandling: "Cuando me estreso necesito ordenar pasos y hablarlo con alguien.",
          helpNeeded: "Quiero fortalecer toma de decisiones y manejo de ansiedad."
        },
        ideal_day_draw: {
          environment: "Un espacio dinámico con personas, escucha y planificación.",
          people: "Me imagino trabajando con grupos, familias o adolescentes.",
          purpose: "Quiero ayudar a que otros estén mejor y puedan crecer."
        },
        decision_scenarios: {
          scenario_a: "La de impacto social, porque necesito sentir que lo que hago sirve.",
          why_scenario_a: "Necesito encontrar sentido en el trabajo.",
          scenario_b: "Escucho al grupo, sostengo el clima y ayudo a destrabar conflictos.",
          why_scenario_b: "Termino ocupando ese lugar naturalmente.",
          scenario_c: "Tomo un curso breve y pruebo con una experiencia concreta.",
          why_scenario_c: "Solo lo confirmo de verdad cuando lo vivo."
        },
        future_options: {
          formats: ["Carrera universitaria", "Pasantía o práctica", "Voluntariado o experiencia social"],
          concerns: ["Me cuesta decidir entre varias opciones", "Me preocupa la salida laboral"],
          experiences: ["Entrevistar a un profesional", "Hacer voluntariado", "Visitar una universidad"],
          tentativeOptions: "Psicología, medicina, acompañamiento terapéutico, orientación escolar."
        },
        final_commitment: {
          thirtyDays: "Entrevistar a una psicóloga y visitar una universidad.",
          sixtyDays: "Hacer un curso corto de escucha o acompañamiento.",
          ninetyDays: "Definir si quiero una carrera de salud o de acompañamiento educativo.",
          ready: true
        }
      },
      "student-2": {
        profile_intro: {
          firstName: "Tomás",
          lastName: "Ruiz",
          age: "17",
          yearLevel: "6to",
          course: "6A",
          division: "A",
          email: "tomas@austin-demo.edu",
          favoriteSubjects: "Matemática, informática, física",
          difficultSubjects: "Literatura",
          extracurriculars: "Gaming, fútbol, armado de PC",
          familyExpectations: "Que elija algo con futuro tecnológico",
          initialIdea: "Ingeniería en sistemas"
        },
        interests_board: { salud: 1, tecnologia: 3, comunicacion: 1, negocios: 2, arte: 1, social: 1, educacion: 1, deporte: 2 },
        task_links: { pairs: [{ left: "task_build", right: "tecnologia" }, { left: "task_lead", right: "negocios" }, { left: "task_move", right: "deporte" }] }
      }
    };

    const progress = {
      "student-1": { submitted: true, completionPercent: 100, currentModule: 4, updatedAt: nowIso(), submittedAt: nowIso() },
      "student-2": { submitted: false, completionPercent: 36, currentModule: 1, updatedAt: nowIso(), submittedAt: null },
      "student-3": { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: nowIso(), submittedAt: null }
    };

    const notes = {
      "student-1": [{ id: crypto.randomUUID(), author: "Psicología Austin", note: "Perfil con fuerte orientación al acompañamiento. Conviene explorar psicología, educación y salud mental.", createdAt: nowIso() }],
      "student-2": [],
      "student-3": []
    };

    localStorage.setItem(this.keys.users, JSON.stringify(users));
    localStorage.setItem(this.keys.profiles, JSON.stringify(profiles));
    localStorage.setItem(this.keys.answers, JSON.stringify(answers));
    localStorage.setItem(this.keys.progress, JSON.stringify(progress));
    localStorage.setItem(this.keys.notes, JSON.stringify(notes));
  }

  getUsers() { return JSON.parse(localStorage.getItem(this.keys.users) || "[]"); }
  getProfiles() { return JSON.parse(localStorage.getItem(this.keys.profiles) || "{}"); }
  getAnswers() { return JSON.parse(localStorage.getItem(this.keys.answers) || "{}"); }
  getProgressData() { return JSON.parse(localStorage.getItem(this.keys.progress) || "{}"); }
  getNotes() { return JSON.parse(localStorage.getItem(this.keys.notes) || "{}"); }
  saveProfiles(data) { localStorage.setItem(this.keys.profiles, JSON.stringify(data)); }
  saveAnswersData(data) { localStorage.setItem(this.keys.answers, JSON.stringify(data)); }
  saveProgressData(data) { localStorage.setItem(this.keys.progress, JSON.stringify(data)); }
  saveNotesData(data) { localStorage.setItem(this.keys.notes, JSON.stringify(data)); }

  async restoreSession() {
    const raw = localStorage.getItem(this.keys.session);
    return raw ? JSON.parse(raw) : null;
  }

  async signIn(email, password) {
    const user = this.getUsers().find((item) => item.email.toLowerCase() === email.toLowerCase().trim());
    if (!user || user.password !== password) {
      throw new Error("Credenciales inválidas para el modo demo.");
    }
    const session = { user: { id: user.id, email: user.email, role: user.role } };
    localStorage.setItem(this.keys.session, JSON.stringify(session));
    return session;
  }

  async signOut() { localStorage.removeItem(this.keys.session); }
  async getProfile(userId) { return this.getProfiles()[userId] || null; }

  async saveProfile(userId, data) {
    const profiles = this.getProfiles();
    const current = profiles[userId] || {};
    profiles[userId] = {
      ...current,
      ...data,
      id: userId,
      fullName: [data.firstName || current.firstName || "", data.lastName || current.lastName || ""].join(" ").trim() || current.fullName,
      updatedAt: nowIso()
    };
    this.saveProfiles(profiles);
    return profiles[userId];
  }

  async loadAnswers(userId) { return this.getAnswers()[userId] || {}; }

  async saveAnswer(userId, activityKey, payload) {
    const answers = this.getAnswers();
    answers[userId] = answers[userId] || {};
    answers[userId][activityKey] = payload;
    this.saveAnswersData(answers);
    return answers[userId][activityKey];
  }

  async getProgress(userId) {
    return this.getProgressData()[userId] || { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: null, submittedAt: null };
  }

  async saveProgress(userId, patch) {
    const progress = this.getProgressData();
    progress[userId] = {
      submitted: false,
      completionPercent: 0,
      currentModule: 0,
      updatedAt: nowIso(),
      submittedAt: null,
      ...(progress[userId] || {}),
      ...patch,
      updatedAt: nowIso()
    };
    this.saveProgressData(progress);
    return progress[userId];
  }

  async listStudents() {
    const profiles = this.getProfiles();
    const progress = this.getProgressData();
    return Object.values(profiles)
      .filter((profile) => profile.role === "student")
      .map((profile) => ({
        ...profile,
        progress: progress[profile.id] || { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: null, submittedAt: null }
      }))
      .sort((a, b) => (a.fullName || "").localeCompare(b.fullName || "", "es"));
  }

  async getStudentBundle(studentId) {
    return {
      profile: await this.getProfile(studentId),
      answers: await this.loadAnswers(studentId),
      progress: await this.getProgress(studentId),
      notes: this.getNotes()[studentId] || []
    };
  }

  async saveAdminNote(studentId, author, note) {
    const notes = this.getNotes();
    notes[studentId] = notes[studentId] || [];
    notes[studentId].unshift({ id: crypto.randomUUID(), author, note, createdAt: nowIso() });
    this.saveNotesData(notes);
    return notes[studentId];
  }

  async importStudents(rows) {
    const users = this.getUsers();
    const profiles = this.getProfiles();
    const answers = this.getAnswers();
    const progress = this.getProgressData();
    const notes = this.getNotes();
    const createdCredentials = [];
    let created = 0;
    let updated = 0;
    let skipped = 0;

    rows.forEach((row) => {
      const email = (row.email || "").toLowerCase().trim();
      if (!email) {
        skipped += 1;
        return;
      }

      const existingUser = users.find((user) => user.email.toLowerCase() === email);
      const userId = existingUser?.id || `student-${crypto.randomUUID()}`;
      const password = row.password || existingUser?.password || generateTemporaryPassword();

      if (existingUser && existingUser.role !== "student") {
        skipped += 1;
        return;
      }

      if (!existingUser) {
        users.push({
          id: userId,
          email,
          password,
          role: "student",
          fullName: `${row.firstName || ""} ${row.lastName || ""}`.trim()
        });
        created += 1;
        createdCredentials.push({ email, password });
      } else {
        existingUser.password = row.password || existingUser.password;
        existingUser.fullName = `${row.firstName || profiles[userId]?.firstName || ""} ${row.lastName || profiles[userId]?.lastName || ""}`.trim();
        updated += 1;
      }

      profiles[userId] = {
        ...(profiles[userId] || {}),
        id: userId,
        role: "student",
        email,
        firstName: row.firstName,
        lastName: row.lastName,
        fullName: `${row.firstName || ""} ${row.lastName || ""}`.trim(),
        yearLevel: row.yearLevel,
        course: row.course,
        division: row.division,
        age: row.age,
        updatedAt: nowIso()
      };
      answers[userId] = answers[userId] || {};
      progress[userId] = progress[userId] || { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: nowIso(), submittedAt: null };
      notes[userId] = notes[userId] || [];
    });

    localStorage.setItem(this.keys.users, JSON.stringify(users));
    this.saveProfiles(profiles);
    this.saveAnswersData(answers);
    this.saveProgressData(progress);
    this.saveNotesData(notes);

    return { created, updated, skipped, createdCredentials };
  }
}

class SupabaseService {
  constructor(config) {
    this.mode = "production";
    this.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
  }

  async restoreSession() {
    const { data, error } = await this.client.auth.getSession();
    if (error) { throw error; }
    if (!data.session) { return null; }
    const profile = await this.getProfile(data.session.user.id);
    return { user: { id: data.session.user.id, email: data.session.user.email, role: profile?.role || "student" } };
  }

  async signIn(email, password) {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) { throw error; }
    const profile = await this.getProfile(data.user.id);
    return { user: { id: data.user.id, email: data.user.email, role: profile?.role || "student" } };
  }

  async signOut() {
    const { error } = await this.client.auth.signOut();
    if (error) { throw error; }
  }

  async getProfile(userId) {
    const { data, error } = await this.client.from("profiles").select("*").eq("id", userId).single();
    if (error && error.code !== "PGRST116") { throw error; }
    return data ? normalizeSupabaseProfile(data) : null;
  }

  async saveProfile(userId, data) {
    const row = {
      id: userId,
      role: data.role || "student",
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      full_name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
      year_level: data.yearLevel,
      course: data.course,
      division: data.division,
      age: data.age
    };
    const { error } = await this.client.from("profiles").upsert(row);
    if (error) { throw error; }
    return this.getProfile(userId);
  }

  async loadAnswers(userId) {
    const { data, error } = await this.client.from("journey_answers").select("activity_key,payload").eq("student_id", userId);
    if (error) { throw error; }
    return (data || []).reduce((acc, row) => {
      acc[row.activity_key] = row.payload;
      return acc;
    }, {});
  }

  async saveAnswer(userId, activityKey, payload) {
    const { error } = await this.client.from("journey_answers").upsert(
      { student_id: userId, activity_key: activityKey, payload },
      { onConflict: "student_id,activity_key" }
    );
    if (error) { throw error; }
    return payload;
  }

  async getProgress(userId) {
    const { data, error } = await this.client.from("journey_progress").select("*").eq("student_id", userId).single();
    if (error && error.code !== "PGRST116") { throw error; }
    return data
      ? { submitted: data.submitted, completionPercent: data.completion_percent, currentModule: data.current_module, updatedAt: data.updated_at, submittedAt: data.submitted_at }
      : { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: null, submittedAt: null };
  }

  async saveProgress(userId, patch) {
    const row = {
      student_id: userId,
      submitted: patch.submitted,
      completion_percent: patch.completionPercent,
      current_module: patch.currentModule,
      submitted_at: patch.submitted ? patch.submittedAt || nowIso() : null
    };
    const { error } = await this.client.from("journey_progress").upsert(row);
    if (error) { throw error; }
    return this.getProgress(userId);
  }

  async listStudents() {
    const { data, error } = await this.client
      .from("profiles")
      .select("id,full_name,email,course,division,year_level,age,journey_progress(submitted,completion_percent,current_module,updated_at,submitted_at)")
      .eq("role", "student")
      .order("full_name");
    if (error) { throw error; }
    return (data || []).map((row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      course: row.course,
      division: row.division,
      yearLevel: row.year_level,
      age: row.age,
      progress: row.journey_progress?.[0]
        ? {
          submitted: row.journey_progress[0].submitted,
          completionPercent: row.journey_progress[0].completion_percent,
          currentModule: row.journey_progress[0].current_module,
          updatedAt: row.journey_progress[0].updated_at,
          submittedAt: row.journey_progress[0].submitted_at
        }
        : { submitted: false, completionPercent: 0, currentModule: 0, updatedAt: null, submittedAt: null }
    }));
  }

  async getStudentBundle(studentId) {
    const [profile, answers, progress, notesResult] = await Promise.all([
      this.getProfile(studentId),
      this.loadAnswers(studentId),
      this.getProgress(studentId),
      this.client.from("admin_notes").select("*").eq("student_id", studentId).order("created_at", { ascending: false })
    ]);
    if (notesResult.error) { throw notesResult.error; }
    return {
      profile,
      answers,
      progress,
      notes: (notesResult.data || []).map((note) => ({ id: note.id, author: note.author_name, note: note.note, createdAt: note.created_at }))
    };
  }

  async saveAdminNote(studentId, author, note) {
    const { error } = await this.client.from("admin_notes").insert({ student_id: studentId, author_name: author, note });
    if (error) { throw error; }
    const bundle = await this.getStudentBundle(studentId);
    return bundle.notes;
  }

  async importStudents(rows) {
    const functionName = APP.importFunctionName || "import-students";
    const { data, error } = await this.client.functions.invoke(functionName, {
      body: { rows }
    });
    if (error) { throw error; }
    return data;
  }
}

function normalizeSupabaseProfile(profile) {
  if (!profile) { return null; }
  return {
    id: profile.id,
    role: profile.role,
    fullName: profile.full_name,
    email: profile.email,
    firstName: profile.first_name,
    lastName: profile.last_name,
    course: profile.course,
    division: profile.division,
    yearLevel: profile.year_level,
    age: profile.age
  };
}

function createService() {
  if (APP.mode === "production" && APP.supabaseUrl && APP.supabaseAnonKey) {
    return new SupabaseService(APP);
  }
  return new DemoService();
}

async function init() {
  state.service = createService();
  state.mode = state.service.mode;
  updateModePill();

  logoutButton.addEventListener("click", async () => {
    await state.service.signOut();
    resetState();
    render();
  });

  try {
    const session = await state.service.restoreSession();
    if (session) {
      await hydrateSession(session);
    }
  } catch (error) {
    console.error(error);
    state.flash = { type: "error", text: "No se pudo restaurar la sesión anterior." };
  }

  render();
}

function resetState() {
  state.session = null;
  state.profile = null;
  state.progress = { submitted: false, updatedAt: null };
  state.answers = {};
  state.selectedModule = 0;
  state.adminStudents = [];
  state.adminBundle = null;
}

async function hydrateSession(session) {
  state.session = session;
  const rawProfile = await state.service.getProfile(session.user.id);
  state.profile = rawProfile || {
    id: session.user.id,
    role: session.user.role,
    email: session.user.email,
    fullName: session.user.email
  };

  if (state.profile.role === "admin") {
    await refreshAdminData();
    return;
  }

  state.answers = await state.service.loadAnswers(session.user.id);
  state.progress = await state.service.getProgress(session.user.id);
  state.selectedModule = findFirstIncompleteModule(state.answers);
}

async function refreshAdminData() {
  state.adminStudents = await state.service.listStudents();
  if (!state.adminBundle && state.adminStudents.length > 0) {
    await openStudentBundle(state.adminStudents[0].id);
  } else if (state.adminBundle) {
    await openStudentBundle(state.adminBundle.profile.id);
  }
}

async function openStudentBundle(studentId) {
  state.adminBundle = await state.service.getStudentBundle(studentId);
}

function updateModePill() {
  modePill.textContent = state.mode === "production" ? "Modo producción" : "Modo demo";
}

function render() {
  sessionSummary.classList.toggle("hidden", false);
  logoutButton.classList.toggle("hidden", !state.session);

  if (!state.session) {
    appEl.innerHTML = renderLoginView();
    bindLoginView();
    return;
  }

  if (state.profile.role === "admin") {
    appEl.innerHTML = renderAdminView();
    bindAdminView();
    return;
  }

  appEl.innerHTML = renderStudentView();
  bindStudentView();
}

function renderFlash() {
  if (!state.flash) {
    return "";
  }
  return `<div class="flash ${state.flash.type}">${escapeHtml(state.flash.text)}</div>`;
}

function clearFlashLater() {
  window.clearTimeout(clearFlashLater.timer);
  clearFlashLater.timer = window.setTimeout(() => {
    state.flash = null;
    render();
  }, 2600);
}

function renderLoginView() {
  return `
    <section class="auth-shell glass-card">
      <div class="hero-pane">
        <div>
          <p class="eyebrow">Recorrido común para todos los estudiantes</p>
          <h2>Autoconocimiento, exploración y decisión en una sola base.</h2>
          <p>
            Esta versión organiza un proceso formal e innovador: formularios, frases guiadas,
            actividades de unir con flechas, dibujo libre, ranking de valores, radar de fortalezas
            y síntesis para administración.
          </p>
          <div class="hero-grid">
            <div class="hero-chip">
              <strong>Estudiante</strong>
              Ingresa con su usuario, completa módulos secuenciales y deja evidencia de su recorrido.
            </div>
            <div class="hero-chip">
              <strong>Administración</strong>
              Visualiza progreso, interpreta respuestas, agrega notas y exporta información.
            </div>
            <div class="hero-chip">
              <strong>Base de información</strong>
              Guarda respuestas, dibujos, prioridades, fortalezas y áreas a trabajar.
            </div>
            <div class="hero-chip">
              <strong>Salida orientativa</strong>
              Propone carreras, trayectos cortos, cursos y experiencias para explorar.
            </div>
          </div>
        </div>
        <p class="muted">
          Referencia funcional: el actual formulario de Google Forms puede seguir existiendo como
          antecedente, pero esta app amplía el recorrido con actividades visuales y una capa
          administrativa centralizada.
        </p>
      </div>

      <div class="login-pane">
        <h3>Ingresar al sistema</h3>
        <p class="muted">
          ${state.mode === "production"
            ? "Ingresá con tu usuario configurado en el backend."
            : "En demo podés probar tanto la vista del estudiante como la del administrador."}
        </p>
        ${renderFlash()}
        <form id="login-form" class="form-grid">
          <label>
            Correo o usuario
            <input type="email" name="email" placeholder="usuario@institucion.edu" required>
          </label>
          <label>
            Contraseña
            <input type="password" name="password" placeholder="••••••••" required>
          </label>
          <div class="actions-row">
            <button class="primary-button" type="submit">Ingresar</button>
          </div>
        </form>
        ${state.mode === "demo"
          ? `
            <div class="actions-row" style="margin-top: 0.9rem;">
              <button class="secondary-button" type="button" data-quick-login="student">Probar como estudiante</button>
              <button class="ghost-button" type="button" data-quick-login="admin">Probar como admin</button>
            </div>
          `
          : ""}
        ${state.mode === "demo"
          ? `
            <div class="activity-card" style="margin-top: 1.2rem;">
              <h4>Cuentas demo</h4>
              <p class="muted">Administrador: <strong>admin@austin-demo.edu</strong> / <strong>Admin2026!</strong></p>
              <p class="muted">Estudiante: <strong>lucia@austin-demo.edu</strong> / <strong>Alumno2026!</strong></p>
              <p class="muted">También hay demo con <strong>tomas@austin-demo.edu</strong> y <strong>malena@austin-demo.edu</strong>.</p>
            </div>
          `
          : ""}
      </div>
    </section>
  `;
}

function bindLoginView() {
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const session = await state.service.signIn(email, password);
      state.flash = null;
      await hydrateSession(session);
      render();
    } catch (error) {
      state.flash = { type: "error", text: error.message || "No se pudo iniciar sesión." };
      render();
    }
  });

  document.querySelectorAll("[data-quick-login]").forEach((button) => {
    button.addEventListener("click", async () => {
      const type = button.dataset.quickLogin;
      const credentials = type === "admin"
        ? { email: "admin@austin-demo.edu", password: "Admin2026!" }
        : { email: "lucia@austin-demo.edu", password: "Alumno2026!" };

      try {
        const session = await state.service.signIn(credentials.email, credentials.password);
        state.flash = null;
        await hydrateSession(session);
        render();
      } catch (error) {
        state.flash = { type: "error", text: error.message || "No se pudo abrir el modo demo." };
        render();
      }
    });
  });
}

function renderStudentView() {
  const module = MODULES[state.selectedModule];
  const summary = buildSummaryFromAnswers(state.answers);
  const readOnly = Boolean(state.progress.submitted);
  const completion = computeCompletion(state.answers);

  return `
    <section class="dashboard-shell">
      ${renderFlash()}
      <div class="dashboard-top">
        <aside class="sidebar-panel">
          <div class="between-row">
            <div>
              <p class="eyebrow">Legajo vocacional</p>
              <h3>${escapeHtml(displayName(state.profile))}</h3>
            </div>
            <span class="status-pill">${completion.percent}% completo</span>
          </div>
          <p class="muted">
            ${readOnly
              ? "El legajo fue enviado. Solo administración puede reabrirlo."
              : "Todos los estudiantes recorren las mismas actividades, con guardado por módulo."}
          </p>
          <div class="module-nav">
            ${MODULES.map((item, index) => renderModuleTab(item, index, state.answers)).join("")}
          </div>
          <div class="activity-card" style="margin-top: 1rem;">
            <h4>Perfil preliminar</h4>
            <p class="muted">${escapeHtml(summary.shortSummary)}</p>
            <div class="pair-list">
              <div class="pair-pill">
                <span>Fortalezas detectadas</span>
                <strong>${escapeHtml(summary.strengths.slice(0, 2).join(", ") || "Aún sin datos")}</strong>
              </div>
              <div class="pair-pill">
                <span>Áreas a desarrollar</span>
                <strong>${escapeHtml(summary.growthAreas.slice(0, 2).join(", ") || "Aún sin datos")}</strong>
              </div>
            </div>
          </div>
        </aside>

        <section class="content-panel">
          <div class="activity-card">
            <div class="between-row">
              <div>
                <p class="eyebrow">${escapeHtml(module.title)}</p>
                <h2>${escapeHtml(module.description)}</h2>
              </div>
              ${state.progress.updatedAt
                ? `<span class="mini-pill">Última actualización: ${escapeHtml(formatDate(state.progress.updatedAt))}</span>`
                : ""}
            </div>
            <p class="helper-text">
              Completá cada actividad con honestidad. El sistema guarda tus respuestas y genera una síntesis para orientación.
            </p>
          </div>

          ${module.activities.map((activityKey) => renderActivityCard(activityKey, state.answers[activityKey] || {}, readOnly)).join("")}

          <div class="activity-card">
            <div class="between-row">
              <div>
                <h3>Resumen orientativo del sistema</h3>
                <p class="helper-text">Esta lectura es automática y sirve de apoyo. La interpretación final la hace administración.</p>
              </div>
              <button class="secondary-button" type="button" id="refresh-summary-button">Actualizar lectura</button>
            </div>
            ${renderStudentSummary(summary)}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderModuleTab(module, index, answers) {
  const completed = isModuleCompleted(module, answers);
  const active = index === state.selectedModule;
  return `
    <button class="module-tab ${active ? "active" : ""}" type="button" data-module-index="${index}">
      <strong>${index + 1}. ${escapeHtml(module.title)}</strong>
      <small>${escapeHtml(module.description)}</small>
      <span class="module-badge ${completed ? "" : "pending"}">${completed ? "Listo" : "Pendiente"}</span>
    </button>
  `;
}

function renderActivityCard(activityKey, answer, readOnly) {
  const activity = ACTIVITIES[activityKey];
  return `
    <article class="activity-card" id="activity-card-${activityKey}">
      <div class="activity-header">
        <div class="activity-title">
          <p class="eyebrow">${escapeHtml(getModuleTitle(activity.moduleKey))}</p>
          <h3>${escapeHtml(activity.title)}</h3>
          <p class="helper-text">${escapeHtml(activity.description)}</p>
        </div>
        <span class="mini-pill ${isActivityCompleted(activityKey, answer) ? "success" : "warning"}">
          ${isActivityCompleted(activityKey, answer) ? "Completada" : "Falta completar"}
        </span>
      </div>
      ${renderActivityForm(activityKey, answer, readOnly)}
    </article>
  `;
}

function renderActivityForm(activityKey, answer, readOnly) {
  switch (activityKey) {
    case "profile_intro": return renderProfileForm(answer, readOnly);
    case "identity_story": return renderIdentityStoryForm(answer, readOnly);
    case "interests_board": return renderInterestsForm(answer, readOnly);
    case "task_links": return renderTaskLinksForm(answer, readOnly);
    case "values_rank": return renderValuesRankForm(answer, readOnly);
    case "strengths_radar": return renderStrengthsForm(answer, readOnly);
    case "growth_reflection": return renderGrowthForm(answer, readOnly);
    case "ideal_day_draw": return renderDrawingForm(answer, readOnly);
    case "decision_scenarios": return renderScenariosForm(answer, readOnly);
    case "future_options": return renderFutureOptionsForm(answer, readOnly);
    case "final_commitment": return renderFinalCommitmentForm(answer, readOnly);
    default: return "";
  }
}

function renderProfileForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="profile_intro">
      <div class="form-grid three">
        <label>Nombre<input name="firstName" value="${escapeAttr(answer.firstName || state.profile.firstName || "")}" ${readOnly ? "disabled" : ""} required></label>
        <label>Apellido<input name="lastName" value="${escapeAttr(answer.lastName || state.profile.lastName || "")}" ${readOnly ? "disabled" : ""} required></label>
        <label>Edad<input name="age" type="number" min="14" max="21" value="${escapeAttr(answer.age || state.profile.age || "")}" ${readOnly ? "disabled" : ""} required></label>
      </div>
      <div class="form-grid three">
        <label>Año<select name="yearLevel" ${readOnly ? "disabled" : ""} required>${renderOptions(["4to", "5to", "6to"], answer.yearLevel || state.profile.yearLevel || "")}</select></label>
        <label>Curso<input name="course" value="${escapeAttr(answer.course || state.profile.course || "")}" ${readOnly ? "disabled" : ""} required></label>
        <label>División<input name="division" value="${escapeAttr(answer.division || state.profile.division || "")}" ${readOnly ? "disabled" : ""}></label>
      </div>
      <label>Email o usuario institucional<input type="email" name="email" value="${escapeAttr(answer.email || state.profile.email || state.session.user.email || "")}" ${readOnly ? "disabled" : ""} required></label>
      <label>Materias que más disfrutás<textarea name="favoriteSubjects" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.favoriteSubjects || "")}</textarea></label>
      <label>Materias que hoy más te cuestan<textarea name="difficultSubjects" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.difficultSubjects || "")}</textarea></label>
      <label>Actividades fuera del aula, hobbies o espacios donde te sentís vos<textarea name="extracurriculars" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.extracurriculars || "")}</textarea></label>
      <label>Expectativas o mensajes que sentís alrededor tuyo sobre tu futuro<textarea name="familyExpectations" ${readOnly ? "disabled" : ""}>${escapeHtml(answer.familyExpectations || "")}</textarea></label>
      <label>Si hoy tuvieras que nombrar una idea vocacional inicial, ¿cuál sería?<textarea name="initialIdea" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.initialIdea || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar ficha inicial")}
    </form>
  `;
}

function renderIdentityStoryForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="identity_story">
      <label>Me siento capaz cuando...<textarea name="capable" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.capable || "")}</textarea></label>
      <label>Pierdo noción del tiempo cuando...<textarea name="timeless" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.timeless || "")}</textarea></label>
      <label>Admiro a las personas que...<textarea name="admire" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.admire || "")}</textarea></label>
      <label>No me veo en caminos donde...<textarea name="reject" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.reject || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar autorretrato")}
    </form>
  `;
}

function renderInterestsForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="interests_board">
      <div class="card-grid">
        ${INTEREST_CARDS.map((card) => {
          const value = Number(answer[card.id] || 0);
          const className = value === 3 ? "active-mucho" : value === 2 ? "active-medio" : value === 1 ? "active-poco" : "";
          return `
            <section class="interest-card ${className}" data-interest-card="${card.id}">
              <div><h4>${escapeHtml(card.title)}</h4><p class="muted">${escapeHtml(card.text)}</p></div>
              <div class="interest-levels">
                ${renderLevelButton(card.id, 3, "Mucho", value, readOnly)}
                ${renderLevelButton(card.id, 2, "Algo", value, readOnly)}
                ${renderLevelButton(card.id, 1, "Poco", value, readOnly)}
                ${renderLevelButton(card.id, 0, "Nada", value, readOnly)}
              </div>
              <input type="hidden" name="interest-${card.id}" value="${value}">
            </section>
          `;
        }).join("")}
      </div>
      ${renderFormActions(readOnly, "Guardar intereses")}
    </form>
  `;
}

function renderLevelButton(cardId, level, label, currentValue, readOnly) {
  return `
    <button type="button" class="chip-button ${currentValue === level ? "active" : ""}" data-interest-id="${cardId}" data-level="${level}" ${readOnly ? "disabled" : ""}>
      ${label}
    </button>
  `;
}

function renderTaskLinksForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="task_links">
      <p class="helper-text">Hacé clic primero en una tarea de la izquierda y después en un campo de la derecha para unirlos.</p>
      <div class="linking-board" data-link-board="task_links">
        <div class="link-column">
          ${TASK_LINKS.left.map((item) => `
            <button class="link-node" type="button" data-side="left" data-node-id="${item.id}" ${readOnly ? "disabled" : ""}>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.text)}</small>
            </button>
          `).join("")}
        </div>
        <div class="link-center"><svg class="link-svg" viewBox="0 0 100 100" preserveAspectRatio="none"></svg></div>
        <div class="link-column">
          ${TASK_LINKS.right.map((item) => `
            <button class="link-node" type="button" data-side="right" data-node-id="${item.id}" ${readOnly ? "disabled" : ""}>
              <strong>${escapeHtml(item.title)}</strong>
              <small>${escapeHtml(item.text)}</small>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="pair-list" data-pair-list="task_links"></div>
      <input type="hidden" name="pairsJson" value="${escapeAttr(JSON.stringify(answer.pairs || []))}">
      ${renderFormActions(readOnly, "Guardar conexiones")}
    </form>
  `;
}

function renderValuesRankForm(answer, readOnly) {
  const order = answer.order && answer.order.length ? answer.order : [...VALUE_ITEMS];
  return `
    <form class="activity-form form-grid" data-activity-key="values_rank">
      <p class="helper-text">Ordená con los botones de subir y bajar. El valor 1 es el que más pesa hoy para vos.</p>
      <div class="ranking-list" data-ranking-list="values_rank">
        ${order.map((item, index) => `
          <div class="rank-card" data-rank-item="${escapeAttr(item)}">
            <div class="between-row" style="flex:1;">
              <div><div class="rank-index">${index + 1}</div></div>
              <div style="flex:1;"><strong>${escapeHtml(item)}</strong></div>
            </div>
            <div class="actions-row">
              <button class="tiny-button" type="button" data-rank-action="up" data-value="${escapeAttr(item)}" ${readOnly ? "disabled" : ""}>Subir</button>
              <button class="tiny-button" type="button" data-rank-action="down" data-value="${escapeAttr(item)}" ${readOnly ? "disabled" : ""}>Bajar</button>
            </div>
          </div>
        `).join("")}
      </div>
      <input type="hidden" name="rankOrder" value="${escapeAttr(JSON.stringify(order))}">
      ${renderFormActions(readOnly, "Guardar ranking")}
    </form>
  `;
}

function renderStrengthsForm(answer, readOnly) {
  const scores = answer.scores || {};
  return `
    <form class="activity-form form-grid" data-activity-key="strengths_radar">
      <div class="skill-grid">
        ${SKILLS.map((skill) => {
          const score = Number(scores[skill.id] || 3);
          return `
            <div class="skill-row">
              <strong>${escapeHtml(skill.label)}</strong>
              <input type="range" name="skill-${skill.id}" min="1" max="5" value="${score}" ${readOnly ? "disabled" : ""}>
              <div class="range-value" data-range-output="skill-${skill.id}">${score}/5</div>
            </div>
          `;
        }).join("")}
      </div>
      <label>Contá un ejemplo real que respalde tus puntajes<textarea name="evidence" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.evidence || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar fortalezas")}
    </form>
  `;
}

function renderGrowthForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="growth_reflection">
      <label>Hoy siento que necesito trabajar más en...<textarea name="growthAreas" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.growthAreas || "")}</textarea></label>
      <label>Cuando me estreso o me frustro, normalmente...<textarea name="stressHandling" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.stressHandling || "")}</textarea></label>
      <label>Para seguir creciendo me ayudaría...<textarea name="helpNeeded" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.helpNeeded || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar reflexión")}
    </form>
  `;
}

function renderDrawingForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="ideal_day_draw">
      <div class="drawing-card">
        <div class="drawing-toolbar">
          <label>Color<input type="color" name="drawColor" value="#1d6c63" ${readOnly ? "disabled" : ""}></label>
          <label>Trazo<input type="range" name="drawSize" min="2" max="18" value="4" ${readOnly ? "disabled" : ""}></label>
          <button class="tiny-button" type="button" data-canvas-action="clear" ${readOnly ? "disabled" : ""}>Limpiar dibujo</button>
        </div>
        <canvas class="drawing-canvas" data-drawing-canvas="ideal_day_draw" data-readonly="${readOnly ? "true" : "false"}" data-initial-image="${escapeAttr(answer.drawingDataUrl || "")}"></canvas>
      </div>
      <label>¿Cómo es el lugar donde te imaginás?<textarea name="environment" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.environment || "")}</textarea></label>
      <label>¿Con qué personas te imaginás interactuando?<textarea name="people" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.people || "")}</textarea></label>
      <label>¿Para qué querrías hacer ese trabajo o proyecto?<textarea name="purpose" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.purpose || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar dibujo y reflexión")}
    </form>
  `;
}

function renderScenariosForm(answer, readOnly) {
  return `
    <form class="activity-form form-grid" data-activity-key="decision_scenarios">
      ${SCENARIOS.map((scenario) => `
        <section class="scenario-card">
          <h4>${escapeHtml(scenario.title)}</h4>
          <p class="muted">${escapeHtml(scenario.text)}</p>
          <div class="radio-list">
            ${scenario.options.map((option) => `
              <label class="radio-item">
                <input type="radio" name="${scenario.id}" value="${escapeAttr(option)}" ${answer[scenario.id] === option ? "checked" : ""} ${readOnly ? "disabled" : ""}>
                <span>${escapeHtml(option)}</span>
              </label>
            `).join("")}
          </div>
          <label style="margin-top: 0.8rem;">¿Por qué elegís esa opción?<textarea name="why_${scenario.id}" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer[`why_${scenario.id}`] || "")}</textarea></label>
        </section>
      `).join("")}
      ${renderFormActions(readOnly, "Guardar decisiones")}
    </form>
  `;
}

function renderFutureOptionsForm(answer, readOnly) {
  const formats = answer.formats || [];
  const concerns = answer.concerns || [];
  const experiences = answer.experiences || [];
  return `
    <form class="activity-form form-grid" data-activity-key="future_options">
      <div class="detail-grid two">
        <section class="choice-card">
          <h4>Formatos que hoy te interesan</h4>
          <div class="checkbox-list">${FORMAT_OPTIONS.map((item) => renderCheckbox("formats", item, formats.includes(item), readOnly)).join("")}</div>
        </section>
        <section class="choice-card">
          <h4>Qué te genera más duda hoy</h4>
          <div class="checkbox-list">${CONCERN_OPTIONS.map((item) => renderCheckbox("concerns", item, concerns.includes(item), readOnly)).join("")}</div>
        </section>
      </div>
      <section class="choice-card">
        <h4>Experiencias que te ayudarían a explorar mejor</h4>
        <div class="checkbox-list">${EXPERIENCE_OPTIONS.map((item) => renderCheckbox("experiences", item, experiences.includes(item), readOnly)).join("")}</div>
      </section>
      <label>Si hoy tuvieras que dejar 2 o 3 opciones tentativas para explorar, ¿cuáles serían?<textarea name="tentativeOptions" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.tentativeOptions || "")}</textarea></label>
      ${renderFormActions(readOnly, "Guardar exploración")}
    </form>
  `;
}

function renderCheckbox(group, value, checked, readOnly) {
  return `
    <label class="checkbox-item">
      <input type="checkbox" name="${group}" value="${escapeAttr(value)}" ${checked ? "checked" : ""} ${readOnly ? "disabled" : ""}>
      <span>${escapeHtml(value)}</span>
    </label>
  `;
}

function renderFinalCommitmentForm(answer, readOnly) {
  const allComplete = computeCompletion(state.answers).completeActivities === Object.keys(ACTIVITIES).length;
  return `
    <form class="activity-form form-grid" data-activity-key="final_commitment">
      <label>Mi paso concreto para los próximos 30 días<textarea name="thirtyDays" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.thirtyDays || "")}</textarea></label>
      <label>Mi paso concreto para los próximos 60 días<textarea name="sixtyDays" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.sixtyDays || "")}</textarea></label>
      <label>Mi paso concreto para los próximos 90 días<textarea name="ninetyDays" ${readOnly ? "disabled" : ""} required>${escapeHtml(answer.ninetyDays || "")}</textarea></label>
      <label class="checkbox-item">
        <input type="checkbox" name="ready" ${answer.ready ? "checked" : ""} ${readOnly ? "disabled" : ""}>
        <span>Declaro que revisé mis respuestas y quiero enviar este legajo para revisión administrativa.</span>
      </label>
      <div class="actions-row">
        ${renderReadonlyButton(readOnly, "Guardar cierre")}
        <button class="secondary-button" type="button" id="submit-journey-button" ${readOnly || !allComplete ? "disabled" : ""}>Enviar legajo a administración</button>
      </div>
      ${!allComplete && !readOnly ? `<span class="inline-note">Completá todas las actividades antes de enviar el legajo.</span>` : ""}
      ${readOnly ? `<span class="inline-note">El legajo ya fue enviado el ${escapeHtml(formatDate(state.progress.submittedAt || state.progress.updatedAt))}.</span>` : ""}
    </form>
  `;
}

function renderReadonlyButton(readOnly, label) {
  if (readOnly) {
    return `<button class="primary-button" type="button" disabled>Solo lectura</button>`;
  }
  return `<button class="primary-button" type="submit">${escapeHtml(label)}</button>`;
}

function renderFormActions(readOnly, label) {
  return `<div class="actions-row">${renderReadonlyButton(readOnly, label)}</div>`;
}

function renderStudentSummary(summary) {
  return `
    <div class="summary-grid">
      <section class="summary-block"><h4>Fortalezas</h4><p>${escapeHtml(summary.strengths.join(", ") || "Todavía no hay suficientes datos.")}</p></section>
      <section class="summary-block"><h4>Habilidades a trabajar</h4><p>${escapeHtml(summary.growthAreas.join(", ") || "Todavía no hay suficientes datos.")}</p></section>
      <section class="summary-block"><h4>Opciones sugeridas</h4><p>${escapeHtml(summary.topTracks.map((item) => item.title).join(", ") || "Todavía no hay suficientes datos.")}</p></section>
    </div>
  `;
}

function bindStudentView() {
  bindModuleTabs();
  bindActivityForms();
  bindInterestButtons();
  bindRankingButtons();
  bindRangeOutputs();
  bindTaskLinksBoard();
  bindDrawingCanvas();

  const summaryButton = document.getElementById("refresh-summary-button");
  if (summaryButton) {
    summaryButton.addEventListener("click", () => render());
  }

  const submitJourneyButton = document.getElementById("submit-journey-button");
  if (submitJourneyButton) {
    submitJourneyButton.addEventListener("click", handleSubmitJourney);
  }
}

function bindModuleTabs() {
  document.querySelectorAll("[data-module-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedModule = Number(button.dataset.moduleIndex);
      render();
    });
  });
}

function bindActivityForms() {
  document.querySelectorAll(".activity-form").forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const activityKey = form.dataset.activityKey;
      try {
        const payload = serializeActivityForm(activityKey, form);
        await saveActivity(activityKey, payload);
      } catch (error) {
        state.flash = { type: "error", text: error.message || "No se pudo guardar la actividad." };
        render();
      }
    });
  });
}

function bindInterestButtons() {
  document.querySelectorAll("[data-interest-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const form = button.closest("form");
      const cardId = button.dataset.interestId;
      const level = Number(button.dataset.level);
      form.querySelector(`input[name="interest-${cardId}"]`).value = String(level);
      const card = form.querySelector(`[data-interest-card="${cardId}"]`);
      card.classList.remove("active-mucho", "active-medio", "active-poco");
      if (level === 3) { card.classList.add("active-mucho"); }
      if (level === 2) { card.classList.add("active-medio"); }
      if (level === 1) { card.classList.add("active-poco"); }
      card.querySelectorAll("[data-interest-id]").forEach((chip) => chip.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function bindRankingButtons() {
  document.querySelectorAll("[data-rank-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const list = button.closest("form").querySelector("[data-ranking-list='values_rank']");
      const input = button.closest("form").querySelector("input[name='rankOrder']");
      const order = JSON.parse(input.value);
      const value = button.dataset.value;
      const index = order.indexOf(value);
      if (button.dataset.rankAction === "up" && index > 0) { [order[index - 1], order[index]] = [order[index], order[index - 1]]; }
      if (button.dataset.rankAction === "down" && index < order.length - 1) { [order[index + 1], order[index]] = [order[index], order[index + 1]]; }
      input.value = JSON.stringify(order);
      list.innerHTML = order.map((item, orderIndex) => `
        <div class="rank-card" data-rank-item="${escapeAttr(item)}">
          <div class="between-row" style="flex:1;">
            <div><div class="rank-index">${orderIndex + 1}</div></div>
            <div style="flex:1;"><strong>${escapeHtml(item)}</strong></div>
          </div>
          <div class="actions-row">
            <button class="tiny-button" type="button" data-rank-action="up" data-value="${escapeAttr(item)}">Subir</button>
            <button class="tiny-button" type="button" data-rank-action="down" data-value="${escapeAttr(item)}">Bajar</button>
          </div>
        </div>
      `).join("");
      bindRankingButtons();
    });
  });
}

function bindRangeOutputs() {
  document.querySelectorAll("input[type='range']").forEach((input) => {
    const output = document.querySelector(`[data-range-output="${input.name}"]`);
    if (!output) { return; }
    input.addEventListener("input", () => { output.textContent = `${input.value}/5`; });
  });
}

function bindTaskLinksBoard() {
  const form = document.querySelector("form[data-activity-key='task_links']");
  if (!form) { return; }
  const input = form.querySelector("input[name='pairsJson']");
  const answer = { pairs: JSON.parse(input.value || "[]") };
  state.interactive.linkSelections.task_links = null;
  const board = form.querySelector("[data-link-board='task_links']");
  const pairList = form.querySelector("[data-pair-list='task_links']");
  const updateBoard = () => drawLinksBoard(board, pairList, answer);

  board.querySelectorAll(".link-node").forEach((node) => {
    node.addEventListener("click", () => {
      const side = node.dataset.side;
      const nodeId = node.dataset.nodeId;
      if (side === "left") {
        state.interactive.linkSelections.task_links = nodeId;
        updateBoard();
        return;
      }
      const selectedLeft = state.interactive.linkSelections.task_links;
      if (!selectedLeft) { return; }
      answer.pairs = answer.pairs.filter((pair) => pair.left !== selectedLeft);
      answer.pairs.push({ left: selectedLeft, right: nodeId });
      input.value = JSON.stringify(answer.pairs);
      state.interactive.linkSelections.task_links = null;
      updateBoard();
    });
  });

  window.requestAnimationFrame(updateBoard);
  window.addEventListener("resize", updateBoard, { passive: true });
}

function drawLinksBoard(board, pairList, answer) {
  const svg = board.querySelector("svg");
  const readOnly = board.closest("form").querySelector(".primary-button[disabled]") !== null;
  const selectedLeft = state.interactive.linkSelections.task_links;
  board.querySelectorAll(".link-node").forEach((node) => {
    const nodeId = node.dataset.nodeId;
    const side = node.dataset.side;
    node.classList.toggle("active", selectedLeft === nodeId && side === "left");
    node.classList.toggle("connected", answer.pairs.some((pair) => pair.left === nodeId || pair.right === nodeId));
  });

  pairList.innerHTML = answer.pairs.length
    ? answer.pairs.map((pair) => `
      <div class="pair-pill">
        <span>${escapeHtml(findTaskTitle(pair.left))} → ${escapeHtml(findTrackTitle(pair.right))}</span>
        <button class="tiny-button" type="button" data-remove-pair="${escapeAttr(pair.left)}" ${readOnly ? "disabled" : ""}>Quitar</button>
      </div>
    `).join("")
    : `<div class="pair-pill"><span>Todavía no hay conexiones guardadas.</span></div>`;

  pairList.querySelectorAll("[data-remove-pair]").forEach((button) => {
    button.addEventListener("click", () => {
      answer.pairs = answer.pairs.filter((pair) => pair.left !== button.dataset.removePair);
      board.closest("form").querySelector("input[name='pairsJson']").value = JSON.stringify(answer.pairs);
      drawLinksBoard(board, pairList, answer);
    });
  });

  const boardRect = board.getBoundingClientRect();
  svg.setAttribute("viewBox", `0 0 ${boardRect.width} ${boardRect.height}`);
  svg.innerHTML = answer.pairs.map((pair) => {
    const leftNode = board.querySelector(`[data-side='left'][data-node-id='${pair.left}']`);
    const rightNode = board.querySelector(`[data-side='right'][data-node-id='${pair.right}']`);
    if (!leftNode || !rightNode) { return ""; }
    const leftRect = leftNode.getBoundingClientRect();
    const rightRect = rightNode.getBoundingClientRect();
    const startX = leftRect.right - boardRect.left;
    const startY = leftRect.top - boardRect.top + leftRect.height / 2;
    const endX = rightRect.left - boardRect.left;
    const endY = rightRect.top - boardRect.top + rightRect.height / 2;
    const controlX = boardRect.width / 2;
    return `<path d="M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${endY}, ${endX} ${endY}" fill="none" stroke="rgba(204, 90, 46, 0.72)" stroke-width="3.2" stroke-linecap="round" />`;
  }).join("");
}

function bindDrawingCanvas() {
  const canvas = document.querySelector("[data-drawing-canvas='ideal_day_draw']");
  if (!canvas) { return; }
  const readOnly = canvas.dataset.readonly === "true";
  const form = canvas.closest("form");
  const colorInput = form.querySelector("input[name='drawColor']");
  const sizeInput = form.querySelector("input[name='drawSize']");
  const clearButton = form.querySelector("[data-canvas-action='clear']");
  const ctx = canvas.getContext("2d");
  let drawing = false;
  let lastPoint = null;

  resizeCanvas(canvas, ctx);
  loadCanvasImage(canvas, ctx, canvas.dataset.initialImage);

  const getPoint = (event) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const start = (event) => {
    if (readOnly) { return; }
    event.preventDefault();
    drawing = true;
    lastPoint = getPoint(event);
  };

  const move = (event) => {
    if (!drawing) { return; }
    event.preventDefault();
    const nextPoint = getPoint(event);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colorInput.value;
    ctx.lineWidth = Number(sizeInput.value);
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);
    ctx.stroke();
    lastPoint = nextPoint;
  };

  const end = () => {
    drawing = false;
    lastPoint = null;
  };

  canvas.addEventListener("pointerdown", start);
  canvas.addEventListener("pointermove", move);
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointerleave", end);

  clearButton?.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  window.addEventListener("resize", () => {
    const snapshot = canvas.toDataURL("image/png");
    resizeCanvas(canvas, ctx);
    loadCanvasImage(canvas, ctx, snapshot);
  }, { passive: true });
}

async function saveActivity(activityKey, payload) {
  state.answers[activityKey] = payload;
  if (activityKey === "profile_intro") {
    state.profile = await state.service.saveProfile(state.session.user.id, { ...payload, role: state.profile.role || "student" });
  }
  await state.service.saveAnswer(state.session.user.id, activityKey, payload);
  const completion = computeCompletion(state.answers);
  state.progress = await state.service.saveProgress(state.session.user.id, {
    submitted: state.progress.submitted,
    completionPercent: completion.percent,
    currentModule: Math.min(findFirstIncompleteModule(state.answers), MODULES.length - 1),
    submittedAt: state.progress.submittedAt || null
  });
  state.selectedModule = Math.min(findFirstIncompleteModule(state.answers), MODULES.length - 1);
  state.flash = { type: "success", text: "Actividad guardada correctamente." };
  render();
  clearFlashLater();
}

async function handleSubmitJourney() {
  try {
    const finalAnswer = state.answers.final_commitment;
    if (!finalAnswer?.ready) {
      throw new Error("Marcá la confirmación final antes de enviar.");
    }
    const completion = computeCompletion(state.answers);
    if (completion.completeActivities !== Object.keys(ACTIVITIES).length) {
      throw new Error("Todavía faltan actividades por completar.");
    }
    state.progress = await state.service.saveProgress(state.session.user.id, {
      submitted: true,
      completionPercent: 100,
      currentModule: MODULES.length - 1,
      submittedAt: nowIso()
    });
    state.flash = { type: "success", text: "El legajo fue enviado a administración." };
    render();
    clearFlashLater();
  } catch (error) {
    state.flash = { type: "error", text: error.message || "No se pudo enviar el legajo." };
    render();
  }
}

function serializeActivityForm(activityKey, form) {
  const data = new FormData(form);
  switch (activityKey) {
    case "profile_intro":
      return {
        firstName: getString(data, "firstName"),
        lastName: getString(data, "lastName"),
        age: getString(data, "age"),
        yearLevel: getString(data, "yearLevel"),
        course: getString(data, "course"),
        division: getString(data, "division"),
        email: getString(data, "email"),
        favoriteSubjects: getString(data, "favoriteSubjects"),
        difficultSubjects: getString(data, "difficultSubjects"),
        extracurriculars: getString(data, "extracurriculars"),
        familyExpectations: getString(data, "familyExpectations"),
        initialIdea: getString(data, "initialIdea")
      };
    case "identity_story":
      return {
        capable: getString(data, "capable"),
        timeless: getString(data, "timeless"),
        admire: getString(data, "admire"),
        reject: getString(data, "reject")
      };
    case "interests_board":
      return INTEREST_CARDS.reduce((acc, card) => {
        acc[card.id] = Number(getString(data, `interest-${card.id}`) || "0");
        return acc;
      }, {});
    case "task_links":
      return { pairs: JSON.parse(getString(data, "pairsJson") || "[]") };
    case "values_rank":
      return { order: JSON.parse(getString(data, "rankOrder") || "[]") };
    case "strengths_radar":
      return {
        scores: SKILLS.reduce((acc, skill) => {
          acc[skill.id] = Number(getString(data, `skill-${skill.id}`) || "3");
          return acc;
        }, {}),
        evidence: getString(data, "evidence")
      };
    case "growth_reflection":
      return {
        growthAreas: getString(data, "growthAreas"),
        stressHandling: getString(data, "stressHandling"),
        helpNeeded: getString(data, "helpNeeded")
      };
    case "ideal_day_draw":
      return {
        drawingDataUrl: form.querySelector("canvas")?.toDataURL("image/png") || "",
        environment: getString(data, "environment"),
        people: getString(data, "people"),
        purpose: getString(data, "purpose")
      };
    case "decision_scenarios":
      return {
        scenario_a: getString(data, "scenario_a"),
        why_scenario_a: getString(data, "why_scenario_a"),
        scenario_b: getString(data, "scenario_b"),
        why_scenario_b: getString(data, "why_scenario_b"),
        scenario_c: getString(data, "scenario_c"),
        why_scenario_c: getString(data, "why_scenario_c")
      };
    case "future_options":
      return {
        formats: data.getAll("formats").map(String),
        concerns: data.getAll("concerns").map(String),
        experiences: data.getAll("experiences").map(String),
        tentativeOptions: getString(data, "tentativeOptions")
      };
    case "final_commitment":
      return {
        thirtyDays: getString(data, "thirtyDays"),
        sixtyDays: getString(data, "sixtyDays"),
        ninetyDays: getString(data, "ninetyDays"),
        ready: data.get("ready") === "on"
      };
    default:
      return {};
  }
}

function renderAdminView() {
  const filteredStudents = getFilteredStudents();
  const metrics = buildAdminMetrics(state.adminStudents);
  return `
    <section class="dashboard-shell admin-layout">
      ${renderFlash()}
      <div class="metrics-grid">
        <section class="metric-card"><h4>Total estudiantes</h4><p>${metrics.total}</p></section>
        <section class="metric-card"><h4>Enviados</h4><p>${metrics.submitted}</p></section>
        <section class="metric-card"><h4>En progreso</h4><p>${metrics.inProgress}</p></section>
        <section class="metric-card"><h4>Sin iniciar</h4><p>${metrics.notStarted}</p></section>
      </div>

      <section class="admin-filters">
        <div class="between-row">
          <div>
            <p class="eyebrow">Panel administrador</p>
            <h2>Lectura cohortal y seguimiento individual</h2>
          </div>
          <div class="actions-row">
            <button class="secondary-button" type="button" id="export-csv-button">Exportar CSV</button>
            <button class="ghost-button" type="button" id="refresh-admin-button">Actualizar</button>
          </div>
        </div>
        <div class="form-grid two" style="margin-top: 1rem;">
          <label>Filtrar por curso
            <select id="admin-course-filter">
              <option value="all">Todos</option>
              ${[...new Set(state.adminStudents.map((student) => student.course).filter(Boolean))].sort().map((course) => `<option value="${escapeAttr(course)}" ${state.adminFilters.course === course ? "selected" : ""}>${escapeHtml(course)}</option>`).join("")}
            </select>
          </label>
          <label>Estado
            <select id="admin-status-filter">
              <option value="all" ${state.adminFilters.status === "all" ? "selected" : ""}>Todos</option>
              <option value="submitted" ${state.adminFilters.status === "submitted" ? "selected" : ""}>Enviados</option>
              <option value="progress" ${state.adminFilters.status === "progress" ? "selected" : ""}>En progreso</option>
              <option value="empty" ${state.adminFilters.status === "empty" ? "selected" : ""}>Sin iniciar</option>
            </select>
          </label>
        </div>
      </section>

      <section class="admin-filters">
        <div class="between-row">
          <div>
            <p class="eyebrow">Carga masiva</p>
            <h3>Importar estudiantes desde Excel o CSV</h3>
            <p class="muted">
              Solo administración puede usar esta herramienta. Acepta `.xlsx`, `.xls` o `.csv`
              con columnas como `email`, `nombre`, `apellido`, `anio`, `curso`, `division`, `edad`, `password`.
            </p>
          </div>
          <div class="actions-row">
            <button class="ghost-button" type="button" id="download-template-button">Descargar plantilla</button>
          </div>
        </div>
        <form id="student-import-form" class="form-grid two" style="margin-top: 1rem;">
          <label>
            Archivo Excel o CSV
            <input type="file" id="student-import-file" accept=".xlsx,.xls,.csv" required>
          </label>
          <label>
            Contraseña por defecto si la planilla no la trae
            <input type="text" id="student-import-default-password" value="Alumno2026!" placeholder="Alumno2026!">
          </label>
          <div class="actions-row">
            <button class="primary-button" type="submit">Importar estudiantes</button>
          </div>
        </form>
      </section>

      <div class="dashboard-top">
        <section class="content-panel">
          <div class="students-grid">${filteredStudents.map((student) => renderStudentCard(student)).join("")}</div>
        </section>
        <aside class="admin-detail">
          ${state.adminBundle ? renderAdminDetail(state.adminBundle) : `<p class="muted">Seleccioná un estudiante para ver el detalle.</p>`}
        </aside>
      </div>
    </section>
  `;
}

function renderStudentCard(student) {
  const selected = state.adminBundle?.profile?.id === student.id;
  return `
    <button class="student-card ${selected ? "selected" : ""}" type="button" data-student-card="${student.id}">
      <div class="between-row">
        <div><h4>${escapeHtml(student.fullName || "Sin nombre")}</h4><p>${escapeHtml(student.email || "")}</p></div>
        <span class="mini-pill ${student.progress.submitted ? "success" : student.progress.completionPercent > 0 ? "warning" : ""}">
          ${student.progress.submitted ? "Enviado" : student.progress.completionPercent > 0 ? "En proceso" : "Sin iniciar"}
        </span>
      </div>
      <div class="student-meta">
        <span class="mini-pill">${escapeHtml(student.yearLevel || "s/d")}</span>
        <span class="mini-pill">${escapeHtml(student.course || "s/c")}</span>
        <span class="mini-pill">${student.progress.completionPercent || 0}% completo</span>
      </div>
    </button>
  `;
}

function renderAdminDetail(bundle) {
  const summary = buildSummaryFromAnswers(bundle.answers);
  return `
    <div class="between-row">
      <div><p class="eyebrow">Ficha individual</p><h3>${escapeHtml(displayName(bundle.profile))}</h3></div>
      <span class="mini-pill ${bundle.progress.submitted ? "success" : "warning"}">${bundle.progress.submitted ? "Legajo enviado" : "Borrador"}</span>
    </div>
    <div class="detail-meta">
      <span class="mini-pill">${escapeHtml(bundle.profile.yearLevel || "s/d")}</span>
      <span class="mini-pill">${escapeHtml(bundle.profile.course || "s/c")}</span>
      <span class="mini-pill">${escapeHtml(bundle.profile.email || "")}</span>
      <span class="mini-pill">${bundle.progress.completionPercent || 0}% completo</span>
    </div>
    <section class="summary-block"><h4>Lectura automática</h4><p>${escapeHtml(summary.shortSummary)}</p></section>
    <div class="summary-grid">
      <section class="summary-block"><h4>Fortalezas</h4><p>${escapeHtml(summary.strengths.join(", ") || "Sin evidencia suficiente")}</p></section>
      <section class="summary-block"><h4>Áreas a trabajar</h4><p>${escapeHtml(summary.growthAreas.join(", ") || "Sin evidencia suficiente")}</p></section>
      <section class="summary-block"><h4>Trayectorias sugeridas</h4><p>${escapeHtml(summary.topTracks.map((track) => track.title).join(", ") || "Sin evidencia suficiente")}</p></section>
    </div>
    <section class="summary-block">
      <h4>Opciones concretas</h4>
      ${summary.topTracks.length
        ? summary.topTracks.map((track) => `<p><strong>${escapeHtml(track.title)}:</strong> ${escapeHtml(track.careers.slice(0, 3).join(", "))}. Cursos: ${escapeHtml(track.shortPrograms.slice(0, 2).join(", "))}.</p>`).join("")
        : `<p>Completando más actividades aparecerán opciones orientativas.</p>`}
    </section>
    ${bundle.answers.ideal_day_draw?.drawingDataUrl
      ? `<section class="summary-block"><h4>Dibujo del día ideal</h4><img alt="Dibujo del estudiante" src="${bundle.answers.ideal_day_draw.drawingDataUrl}" style="width:100%; border-radius: 16px; border: 1px solid rgba(90,81,72,0.12); background:white;"></section>`
      : ""}
    <section class="summary-block">
      <h4>Notas administrativas</h4>
      ${(bundle.notes || []).length
        ? bundle.notes.map((note) => `<div class="raw-answer"><strong>${escapeHtml(note.author)}</strong> · ${escapeHtml(formatDate(note.createdAt))}<div>${escapeHtml(note.note)}</div></div>`).join("")
        : `<p>No hay notas cargadas todavía.</p>`}
      <form id="admin-note-form" class="form-grid" data-student-id="${bundle.profile.id}">
        <label>Agregar observación<textarea name="adminNote" required placeholder="Observaciones, alertas, sugerencias de entrevista o próximos pasos."></textarea></label>
        <div class="actions-row">
          <button class="primary-button" type="submit">Guardar nota</button>
          <button class="ghost-button" type="button" id="toggle-submission-button">${bundle.progress.submitted ? "Reabrir legajo" : "Marcar como enviado"}</button>
        </div>
      </form>
    </section>
    <section class="summary-block">
      <div class="between-row">
        <h4>Respuestas clave</h4>
        <button class="secondary-button" type="button" id="open-report-button">Abrir informe imprimible</button>
      </div>
      ${renderRawAnswer("Idea inicial", bundle.answers.profile_intro?.initialIdea)}
      ${renderRawAnswer("Autorretrato", bundle.answers.identity_story?.capable)}
      ${renderRawAnswer("Materias favoritas", bundle.answers.profile_intro?.favoriteSubjects)}
      ${renderRawAnswer("Opciones tentativas", bundle.answers.future_options?.tentativeOptions)}
      ${renderRawAnswer("Plan 30 días", bundle.answers.final_commitment?.thirtyDays)}
    </section>
  `;
}

function renderRawAnswer(title, value) {
  if (!value) { return ""; }
  return `<div class="raw-answer"><strong>${escapeHtml(title)}</strong><div>${escapeHtml(value)}</div></div>`;
}

function bindAdminView() {
  document.querySelectorAll("[data-student-card]").forEach((button) => {
    button.addEventListener("click", async () => {
      await openStudentBundle(button.dataset.studentCard);
      render();
    });
  });

  document.getElementById("admin-course-filter")?.addEventListener("change", (event) => {
    state.adminFilters.course = event.target.value;
    render();
  });
  document.getElementById("admin-status-filter")?.addEventListener("change", (event) => {
    state.adminFilters.status = event.target.value;
    render();
  });
  document.getElementById("refresh-admin-button")?.addEventListener("click", async () => {
    await refreshAdminData();
    render();
  });
  document.getElementById("export-csv-button")?.addEventListener("click", async () => {
    await exportCohortCsv(getFilteredStudents());
  });
  document.getElementById("download-template-button")?.addEventListener("click", () => {
    window.open("./plantilla-estudiantes.csv", "_blank");
  });

  const noteForm = document.getElementById("admin-note-form");
  if (noteForm) {
    noteForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const note = noteForm.adminNote.value.trim();
      if (!note) { return; }
      await state.service.saveAdminNote(state.adminBundle.profile.id, displayName(state.profile), note);
      await openStudentBundle(state.adminBundle.profile.id);
      state.flash = { type: "success", text: "Observación guardada." };
      render();
      clearFlashLater();
    });
  }

  document.getElementById("toggle-submission-button")?.addEventListener("click", async () => {
    const nextSubmitted = !state.adminBundle.progress.submitted;
    await state.service.saveProgress(state.adminBundle.profile.id, {
      submitted: nextSubmitted,
      completionPercent: nextSubmitted ? Math.max(100, state.adminBundle.progress.completionPercent || 0) : state.adminBundle.progress.completionPercent || 0,
      currentModule: state.adminBundle.progress.currentModule || 0,
      submittedAt: nextSubmitted ? nowIso() : null
    });
    await refreshAdminData();
    state.flash = { type: "success", text: nextSubmitted ? "Legajo marcado como enviado." : "Legajo reabierto para edición." };
    render();
    clearFlashLater();
  });

  document.getElementById("open-report-button")?.addEventListener("click", () => {
    openPrintableReport(state.adminBundle);
  });

  document.getElementById("student-import-form")?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("student-import-file");
    const defaultPassword = document.getElementById("student-import-default-password")?.value?.trim() || "Alumno2026!";
    const file = fileInput?.files?.[0];
    if (!file) {
      state.flash = { type: "error", text: "Seleccioná un archivo Excel o CSV para importar." };
      render();
      return;
    }

    try {
      const rows = await parseStudentSpreadsheet(file, defaultPassword);
      if (!rows.length) {
        throw new Error("No se encontraron filas válidas para importar.");
      }
      const result = await state.service.importStudents(rows);
      await refreshAdminData();
      state.flash = {
        type: "success",
        text: `Importación completada. Nuevos: ${result.created || 0}. Actualizados: ${result.updated || 0}. Omitidos: ${result.skipped || 0}.`
      };
      render();
      clearFlashLater();

      if (result.createdCredentials?.length) {
        exportCredentialsCsv(result.createdCredentials);
      }
    } catch (error) {
      state.flash = { type: "error", text: error.message || "No se pudo importar la planilla." };
      render();
    }
  });
}

function getFilteredStudents() {
  return state.adminStudents.filter((student) => {
    const courseOk = state.adminFilters.course === "all" || student.course === state.adminFilters.course;
    let statusOk = true;
    if (state.adminFilters.status === "submitted") { statusOk = student.progress.submitted; }
    if (state.adminFilters.status === "progress") { statusOk = !student.progress.submitted && student.progress.completionPercent > 0; }
    if (state.adminFilters.status === "empty") { statusOk = !student.progress.submitted && (student.progress.completionPercent || 0) === 0; }
    return courseOk && statusOk;
  });
}

function buildAdminMetrics(students) {
  return students.reduce((acc, student) => {
    acc.total += 1;
    if (student.progress.submitted) { acc.submitted += 1; }
    else if ((student.progress.completionPercent || 0) > 0) { acc.inProgress += 1; }
    else { acc.notStarted += 1; }
    return acc;
  }, { total: 0, submitted: 0, inProgress: 0, notStarted: 0 });
}

function buildSummaryFromAnswers(answers) {
  const trackScores = Object.keys(TRACKS).reduce((acc, key) => { acc[key] = 0; return acc; }, {});
  const interests = answers.interests_board || {};
  Object.entries(interests).forEach(([key, value]) => { if (trackScores[key] !== undefined) { trackScores[key] += Number(value) * 3; } });
  (answers.task_links?.pairs || []).forEach((pair) => { if (trackScores[pair.right] !== undefined) { trackScores[pair.right] += 5; } });

  const values = answers.values_rank?.order || [];
  values.slice(0, 3).forEach((value, index) => {
    const weight = 3 - index;
    if (value === "Impacto social") { trackScores.salud += weight; trackScores.social += weight; trackScores.educacion += weight; }
    if (value === "Autonomía") { trackScores.negocios += weight; trackScores.tecnologia += weight; trackScores.arte += weight; }
    if (value === "Creatividad") { trackScores.arte += weight * 2; trackScores.comunicacion += weight; }
    if (value === "Estabilidad") { trackScores.salud += weight; trackScores.negocios += weight; }
    if (value === "Innovación") { trackScores.tecnologia += weight * 2; trackScores.arte += weight; }
    if (value === "Trabajo con personas") { trackScores.salud += weight; trackScores.educacion += weight; trackScores.comunicacion += weight; }
    if (value === "Investigación") { trackScores.tecnologia += weight; trackScores.salud += weight; trackScores.social += weight; }
    if (value === "Ingresos") { trackScores.negocios += weight * 2; trackScores.tecnologia += weight; }
  });

  (answers.future_options?.formats || []).forEach((format) => {
    if (format === "Proyecto emprendedor") { trackScores.negocios += 4; }
    if (format === "Pasantía o práctica") { trackScores.tecnologia += 1; trackScores.salud += 1; trackScores.negocios += 1; }
  });

  const strengthsAnswer = answers.strengths_radar || {};
  const skills = strengthsAnswer.scores || {};
  const strengths = SKILLS.map((skill) => ({ label: skill.label, value: Number(skills[skill.id] || 0) }))
    .sort((a, b) => b.value - a.value)
    .filter((item) => item.value > 0);

  const growthAreas = [...strengths].sort((a, b) => a.value - b.value).slice(0, 3).map((item) => item.label);
  const topTracks = Object.entries(trackScores).sort((a, b) => b[1] - a[1]).slice(0, 3).filter(([, score]) => score > 0).map(([key]) => TRACKS[key]);
  const shortSummary = topTracks.length ? `Se observa afinidad preliminar con ${topTracks.map((track) => track.title).join(", ")}.` : "Todavía no hay suficiente evidencia para sugerir trayectorias.";
  return { topTracks, strengths: strengths.slice(0, 3).map((item) => item.label), growthAreas, shortSummary };
}

function computeCompletion(answers) {
  const allActivities = Object.keys(ACTIVITIES);
  const completeActivities = allActivities.filter((key) => isActivityCompleted(key, answers[key])).length;
  return { completeActivities, totalActivities: allActivities.length, percent: Math.round((completeActivities / allActivities.length) * 100) };
}

function isModuleCompleted(module, answers) {
  return module.activities.every((activityKey) => isActivityCompleted(activityKey, answers[activityKey]));
}

function isActivityCompleted(activityKey, answer) {
  if (!answer) { return false; }
  switch (activityKey) {
    case "profile_intro": return Boolean(answer.firstName && answer.lastName && answer.yearLevel && answer.course && answer.favoriteSubjects && answer.initialIdea);
    case "identity_story": return Boolean(answer.capable && answer.timeless && answer.admire && answer.reject);
    case "interests_board": return INTEREST_CARDS.filter((card) => Number(answer[card.id] || 0) > 0).length >= 5;
    case "task_links": return (answer.pairs || []).length >= 4;
    case "values_rank": return (answer.order || []).length === VALUE_ITEMS.length;
    case "strengths_radar": return SKILLS.every((skill) => Number(answer.scores?.[skill.id] || 0) >= 1) && Boolean(answer.evidence);
    case "growth_reflection": return Boolean(answer.growthAreas && answer.stressHandling && answer.helpNeeded);
    case "ideal_day_draw": return Boolean(answer.environment && answer.people && answer.purpose);
    case "decision_scenarios": return SCENARIOS.every((scenario) => answer[scenario.id] && answer[`why_${scenario.id}`]);
    case "future_options": return Boolean((answer.formats || []).length && (answer.experiences || []).length && answer.tentativeOptions);
    case "final_commitment": return Boolean(answer.thirtyDays && answer.sixtyDays && answer.ninetyDays);
    default: return false;
  }
}

function findFirstIncompleteModule(answers) {
  const index = MODULES.findIndex((module) => !isModuleCompleted(module, answers));
  return index === -1 ? MODULES.length - 1 : index;
}

function renderOptions(options, selectedValue) {
  return `<option value="">Seleccionar</option>${options.map((option) => `<option value="${escapeAttr(option)}" ${selectedValue === option ? "selected" : ""}>${escapeHtml(option)}</option>`).join("")}`;
}

function getString(formData, key) { return String(formData.get(key) || "").trim(); }
function getModuleTitle(moduleKey) { return MODULES.find((module) => module.key === moduleKey)?.title || ""; }
function findTaskTitle(taskId) { return TASK_LINKS.left.find((item) => item.id === taskId)?.title || taskId; }
function findTrackTitle(trackId) { return TASK_LINKS.right.find((item) => item.id === trackId)?.title || TRACKS[trackId]?.title || trackId; }

function displayName(profile) {
  if (!profile) { return ""; }
  return profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || profile.email || "";
}

function formatDate(dateValue) {
  if (!dateValue) { return "sin fecha"; }
  return new Date(dateValue).toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

async function parseStudentSpreadsheet(file, defaultPassword) {
  if (!window.XLSX) {
    throw new Error("No se pudo cargar el lector de Excel.");
  }

  const buffer = await file.arrayBuffer();
  const workbook = window.XLSX.read(buffer, { type: "array" });
  const firstSheetName = workbook.SheetNames[0];
  if (!firstSheetName) {
    throw new Error("La planilla no tiene hojas para leer.");
  }

  const sheet = workbook.Sheets[firstSheetName];
  const rawRows = window.XLSX.utils.sheet_to_json(sheet, { defval: "" });

  return rawRows
    .map((row) => normalizeImportedStudent(row, defaultPassword))
    .filter((row) => row.email);
}

function normalizeImportedStudent(row, defaultPassword) {
  const normalized = {};
  Object.entries(row).forEach(([key, value]) => {
    normalized[normalizeHeader(key)] = String(value ?? "").trim();
  });

  const email = pickFirst(normalized, ["email", "correo", "correoelectronico", "mail", "usuario"]);
  const firstName = pickFirst(normalized, ["nombre", "firstname", "nombres"]);
  const lastName = pickFirst(normalized, ["apellido", "lastname", "apellidos"]);
  const yearLevel = normalizeYearLevel(pickFirst(normalized, ["anio", "ano", "year", "yearlevel", "nivel"]));
  const course = pickFirst(normalized, ["curso", "class", "divisioncurso"]);
  const division = pickFirst(normalized, ["division", "div"]);
  const age = pickFirst(normalized, ["edad", "age"]);
  const password = pickFirst(normalized, ["password", "contrasena", "clave"]) || defaultPassword || generateTemporaryPassword();

  return {
    email: email.toLowerCase(),
    firstName,
    lastName,
    yearLevel,
    course,
    division,
    age,
    password
  };
}

function normalizeHeader(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function pickFirst(source, keys) {
  for (const key of keys) {
    if (source[key]) {
      return source[key];
    }
  }
  return "";
}

function normalizeYearLevel(value) {
  const clean = String(value || "").trim().toLowerCase();
  if (!clean) { return ""; }
  if (clean.startsWith("4")) { return "4to"; }
  if (clean.startsWith("5")) { return "5to"; }
  if (clean.startsWith("6")) { return "6to"; }
  return value;
}

async function exportCohortCsv(students) {
  const rows = [["Nombre", "Email", "Año", "Curso", "Estado", "Completitud", "Fortalezas", "Áreas a trabajar", "Trayectorias sugeridas"]];
  for (const student of students) {
    const bundle = state.adminBundle?.profile?.id === student.id
      ? state.adminBundle
      : await state.service.getStudentBundle(student.id);
    const answers = bundle.answers || {};
    const summary = buildSummaryFromAnswers(answers);
    rows.push([
      student.fullName || "",
      student.email || "",
      student.yearLevel || "",
      student.course || "",
      student.progress.submitted ? "Enviado" : student.progress.completionPercent > 0 ? "En progreso" : "Sin iniciar",
      String(student.progress.completionPercent || 0),
      summary.strengths.join(" / "),
      summary.growthAreas.join(" / "),
      summary.topTracks.map((track) => track.title).join(" / ")
    ]);
  }
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile("cohorte-orientacion-vocacional.csv", csv, "text/csv;charset=utf-8");
}

function exportCredentialsCsv(credentials) {
  const rows = [["email", "password"], ...credentials.map((item) => [item.email, item.password])];
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadFile("credenciales-estudiantes-importados.csv", csv, "text/csv;charset=utf-8");
}

function openPrintableReport(bundle) {
  const summary = buildSummaryFromAnswers(bundle.answers);
  const reportWindow = window.open("", "_blank", "width=960,height=1080");
  if (!reportWindow) { return; }
  reportWindow.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <title>Informe ${escapeHtml(displayName(bundle.profile))}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; color: #1f1a17; }
        h1, h2 { margin-bottom: 8px; }
        section { margin-bottom: 24px; }
        .muted { color: #5a5148; }
        .box { border: 1px solid #ddd; padding: 16px; border-radius: 12px; margin-top: 10px; }
        img { max-width: 100%; border-radius: 12px; margin-top: 12px; }
      </style>
    </head>
    <body>
      <h1>${escapeHtml(displayName(bundle.profile))}</h1>
      <p class="muted">${escapeHtml(bundle.profile.yearLevel || "")} ${escapeHtml(bundle.profile.course || "")} · ${escapeHtml(bundle.profile.email || "")}</p>
      <section><h2>Síntesis ejecutiva</h2><div class="box">${escapeHtml(summary.shortSummary)}</div></section>
      <section><h2>Fortalezas</h2><div class="box">${escapeHtml(summary.strengths.join(", ") || "Sin datos suficientes")}</div></section>
      <section><h2>Habilidades a trabajar</h2><div class="box">${escapeHtml(summary.growthAreas.join(", ") || "Sin datos suficientes")}</div></section>
      <section><h2>Trayectorias sugeridas</h2><div class="box">${escapeHtml(summary.topTracks.map((track) => track.title).join(", ") || "Sin datos suficientes")}</div></section>
      <section><h2>Opciones tentativas del estudiante</h2><div class="box">${escapeHtml(bundle.answers.future_options?.tentativeOptions || "Sin respuesta")}</div></section>
      <section>
        <h2>Plan de acción</h2>
        <div class="box">
          <p><strong>30 días:</strong> ${escapeHtml(bundle.answers.final_commitment?.thirtyDays || "Sin respuesta")}</p>
          <p><strong>60 días:</strong> ${escapeHtml(bundle.answers.final_commitment?.sixtyDays || "Sin respuesta")}</p>
          <p><strong>90 días:</strong> ${escapeHtml(bundle.answers.final_commitment?.ninetyDays || "Sin respuesta")}</p>
        </div>
      </section>
      ${(bundle.notes || []).length
        ? `<section><h2>Notas administrativas</h2>${(bundle.notes || []).map((note) => `<div class="box"><strong>${escapeHtml(note.author)}</strong> · ${escapeHtml(formatDate(note.createdAt))}<p>${escapeHtml(note.note)}</p></div>`).join("")}</section>`
        : ""}
      ${bundle.answers.ideal_day_draw?.drawingDataUrl ? `<section><h2>Dibujo</h2><img src="${bundle.answers.ideal_day_draw.drawingDataUrl}" alt="Dibujo del estudiante"></section>` : ""}
    </body></html>
  `);
  reportWindow.document.close();
}

function csvEscape(value) {
  return `"${String(value ?? "").replaceAll("\"", "\"\"")}"`;
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function resizeCanvas(canvas, ctx) {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.max(800, Math.floor(rect.width * ratio));
  canvas.height = Math.max(420, Math.floor(rect.height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function loadCanvasImage(canvas, ctx, imageUrl) {
  if (!imageUrl) { return; }
  const ratio = window.devicePixelRatio || 1;
  const image = new Image();
  image.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width / ratio, canvas.height / ratio);
  };
  image.src = imageUrl;
}

function nowIso() { return new Date().toISOString(); }

function generateTemporaryPassword() {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `Alumno${randomPart}!`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(value) { return escapeHtml(value); }

init();
