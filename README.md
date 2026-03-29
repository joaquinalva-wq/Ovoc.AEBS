# Mapa Vocacional Austin

Sistema HTML/CSS/JS para orientación vocacional y personal de estudiantes de 4to, 5to y 6to año.

## Qué incluye

- login con dos roles: `student` y `admin`;
- recorrido común para todos los estudiantes;
- módulos con formularios, ranking, unir con flechas, dibujo libre y escenarios;
- guardado del legajo;
- síntesis automática de fortalezas, habilidades a trabajar y trayectorias sugeridas;
- panel administrador con filtros, notas y exportación cohortal.

## Guía más directa

Si lo que necesitás ahora es dejarlo público y empezar a usarlo con alumnos, seguí:

- [PUESTA-EN-MARCHA-PUBLICA.md](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\PUESTA-EN-MARCHA-PUBLICA.md)

## Archivos principales

- `index.html`: interfaz principal.
- `styles.css`: diseño visual.
- `app.js`: lógica de login, recorrido, panel administrador y exportaciones.
- `config.js`: configuración del modo demo o producción.
- `plantilla-estudiantes.csv`: plantilla para carga masiva desde Excel.
- `start-local.ps1`: servidor local simple para Windows.
- `iniciar-demo.bat`: arranque rápido por doble clic.
- `supabase-schema.sql`: estructura de base de datos y políticas de acceso.
- `supabase/functions/import-students/index.ts`: función segura para importar estudiantes en producción.
- `.nojekyll`: evita problemas de publicación en GitHub Pages.

## Cómo ejecutarlo ahora

### Opción más simple en Windows

1. Abrí [iniciar-demo.bat](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\iniciar-demo.bat).
2. Se abrirá el sistema en `http://localhost:8080`.
3. Dejá esa ventana abierta mientras lo uses.

### Opción PowerShell

1. Abrí PowerShell dentro de la carpeta [app-html](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html).
2. Ejecutá:

```powershell
.\start-local.ps1
```

3. Si querés otro puerto:

```powershell
.\start-local.ps1 -Port 8090
```

### Opción directa

También podés abrir directamente [index.html](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\index.html).

Si al abrirlo no ves el login y el recorrido, usá `iniciar-demo.bat`, que es la forma más estable para probarlo.

## Modo demo y cuentas iniciales

Este proyecto ya viene configurado en `modo demo`.

Ingresá con alguna cuenta demo:

- Administrador: `admin@austin-demo.edu` / `Admin2026!`
- Estudiante: `lucia@austin-demo.edu` / `Alumno2026!`
- Estudiante: `tomas@austin-demo.edu` / `Alumno2026!`
- Estudiante: `malena@austin-demo.edu` / `Alumno2026!`

Además, en la pantalla de inicio quedaron botones para entrar directo en modo demo como estudiante o admin.

Importante:

- el modo demo guarda datos en el navegador con `localStorage`;
- sirve para revisión interna, presentación y validación del flujo;
- no debe usarse como entorno productivo porque no protege datos institucionales.

## Carga de estudiantes desde Excel

La carga masiva aparece solo cuando entrás con el usuario administrador.

### Archivo aceptado

Podés usar:

- `.xlsx`
- `.xls`
- `.csv`

### Plantilla recomendada

Usá [plantilla-estudiantes.csv](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\plantilla-estudiantes.csv).

Columnas sugeridas:

- `email`
- `nombre`
- `apellido`
- `anio`
- `curso`
- `division`
- `edad`
- `password`

Si `password` queda vacía:

- en demo se usa la contraseña por defecto que indique el administrador;
- en producción la función genera una contraseña temporal si hace falta.

### Qué hace la importación

- crea estudiantes nuevos;
- actualiza fichas existentes si el email ya estaba cargado;
- deja el progreso en 0 para estudiantes nuevos;
- descarga un CSV con credenciales creadas en el momento.

## Acceso administrador

El panel general solo aparece si el usuario tiene `role = 'admin'`.

El administrador puede:

- ver todos los estudiantes;
- importar usuarios desde Excel;
- leer respuestas;
- agregar notas;
- reabrir legajos;
- exportar la cohorte.

El estudiante:

- solo ve su propio recorrido;
- no puede ver la base general;
- no puede abrir el panel cohortal.

Si querés que exista una sola administradora:

- creá un único usuario con `role = 'admin'`;
- no otorgues ese rol a otras cuentas.

## Arquitectura recomendada para uso real

Frontend:

- GitHub Pages o Netlify para servir los archivos estáticos.

Backend:

- Supabase para autenticación, base de datos y control de acceso.

Razón:

- el estudiante puede ingresar con su usuario;
- el administrador puede ver todos los legajos;
- la información no queda pública ni expuesta en GitHub;
- el rol administrador puede restringirse con Row Level Security.

## Pasar a producción con Supabase

### 1. Crear proyecto

1. Crear un proyecto en Supabase.
2. Copiar la `Project URL`.
3. Copiar la `anon public key`.

### 2. Crear la base

1. Ir al `SQL Editor`.
2. Ejecutar el contenido de [supabase-schema.sql](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\supabase-schema.sql).

Eso crea:

- `profiles`
- `journey_answers`
- `journey_progress`
- `admin_notes`
- políticas RLS para que el estudiante vea solo lo suyo y el administrador vea todo.

### 3. Crear usuarios

1. Crear primero el usuario administrador en `Authentication`.
2. Crear o actualizar su fila en `profiles` con `role = 'admin'`.
3. Para estudiantes, usar la función segura de importación o cargarlos manualmente.

Ejemplo:

- `role = 'student'` para alumnos.
- `role = 'admin'` para la psicóloga o administración.

### 4. Configurar el frontend

Editar [config.js](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\config.js) y reemplazar:

```js
window.APP_CONFIG = {
  appName: "Mapa Vocacional Austin",
  mode: "production",
  supabaseUrl: "TU_SUPABASE_URL",
  supabaseAnonKey: "TU_SUPABASE_ANON_KEY",
  importFunctionName: "import-students",
  adminEmails: ["correo-admin@institucion.edu"]
};
```

### 5. Desplegar la función de importación

La carga real de estudiantes en producción requiere una función segura porque Supabase indica que `auth.admin` solo debe ejecutarse del lado servidor.

El archivo ya quedó preparado en:

- [supabase/functions/import-students/index.ts](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html\supabase\functions\import-students\index.ts)

Pasos:

1. Instalar Supabase CLI en una máquina de trabajo.
2. Loguearte con `supabase login`.
3. Vincular el proyecto con `supabase link`.
4. Subir la función:

```bash
supabase functions deploy import-students
```

5. Verificar que el secreto `SUPABASE_SERVICE_ROLE_KEY` esté disponible para la función.

### 6. Validar acceso

Comprobar:

- un estudiante solo puede ver y editar su propio legajo;
- administración puede ver todo, agregar notas, reabrir legajos y exportar;
- solo administración puede importar estudiantes;
- el envío final bloquea al estudiante hasta reapertura administrativa.

## Subirlo a GitHub sin usar terminal

### Opción A. Desde la web de GitHub

1. Crear un repositorio nuevo.
2. Subir el contenido completo de la carpeta [app-html](C:\Users\alvaj\OneDrive\Documents\Austin%20EBS\Orientacion%20Vocacional\app-html).
3. Ir a `Settings > Pages`.
4. En `Build and deployment`, elegir:
   - `Source: Deploy from a branch`
   - `Branch: main`
   - `Folder: /(root)`
5. Guardar.

GitHub Pages publicará el sitio.

## Subirlo a GitHub con git

Si luego trabajan desde una máquina con `git` instalado:

```bash
git init
git add .
git commit -m "Agregar sistema de orientación vocacional"
git branch -M main
git remote add origin https://github.com/USUARIO/REPO.git
git push -u origin main
```

## Qué publicar en GitHub Pages

Se publica:

- `index.html`
- `styles.css`
- `app.js`
- `config.js`
- `.nojekyll`

No hace falta publicar:

- documentos internos del colegio;
- credenciales privadas;
- planillas originales con datos sensibles.

## Recomendación institucional

Para este caso conviene:

- que cada estudiante tenga un usuario propio;
- que la psicóloga tenga usuario `admin`;
- que solo administración pueda abrir el panel cohortal y los informes;
- que el estudiante vea su recorrido, pero no la base general;
- que el informe descargable se genere desde la vista admin.

## Mapeo del flujo pedagógico implementado

### Módulo 1

- ficha inicial;
- autorretrato breve.

### Módulo 2

- tablero de intereses;
- unir con flechas;
- ranking de valores.

### Módulo 3

- radar de fortalezas;
- habilidades a trabajar.

### Módulo 4

- dibujo del día ideal;
- escenarios de decisión;
- formatos y experiencias a explorar.

### Módulo 5

- plan a 30, 60 y 90 días;
- envío del legajo.

## Próximas mejoras sugeridas

- exportación directa a PDF real desde backend;
- carga masiva de estudiantes desde CSV;
- adjuntar archivos o producciones;
- reportes por curso o cohorte;
- entrevistas agendadas desde administración;
- observaciones visibles o no visibles para el estudiante.

## Expansión metodológica recomendada

Además del flujo ya implementado, quedó definida una expansión del proceso en:

- [propuestas-complementarias-y-roadmap-v2.md](C:\Users\alvaj\OneDrive\Documents\Austin EBS\Orientacion Vocacional\propuestas-complementarias-y-roadmap-v2.md)

Las próximas capas sugeridas para este sistema son:

- swipe de gustos e incompatibilidades vocacionales;
- momentos de flow;
- proyección del yo futuro;
- feedback de contradicciones personales;
- tagline y arquetipo vocacional;
- Job DNA por drag and drop;
- simulaciones y micro misiones reales;
- plan de exploración por caminos posibles y no solo por carreras.

## Referencias útiles

- GitHub Pages docs: [docs.github.com/en/pages](https://docs.github.com/en/pages?source=post_page---------------------------)
- Supabase Auth docs: [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)
- Supabase Row Level Security docs: [supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)
