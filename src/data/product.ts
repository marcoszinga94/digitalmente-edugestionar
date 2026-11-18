export const product = {
  name: 'EduGestionAR',
  tagline: 'Toda la gestión académica, en un solo sistema',
  version: '1.0.0',
  year: 2026,
  platform: 'Windows 10 y 11 (x64)',
  installer: {
    file: '/descargas/EduGestionAR-Demo-Setup-1.0.0.exe',
    fileName: 'EduGestionAR-Demo-Setup-1.0.0.exe',
    size: '39 MB',
    sizeBytes: 41268928,
  },
  manuals: [
    {
      language: 'Español',
      file: '/documentos/Manual-EduGestionAR-ES.pdf',
      label: 'Manual de usuario (ES)',
      size: '1,2 MB',
    },
    {
      language: 'English',
      file: '/documentos/Manual-EduGestionAR-EN.pdf',
      label: 'User manual (EN)',
      size: '1,4 MB',
    },
  ],
  termsFile: '/documentos/Terminos-y-condiciones.txt',
  dataModel: '/diagramas/modelo-bd-simple.png',
  demoCredentials: { user: 'admin', password: 'admin123' },
} as const;

export type HomeFeature = {
  title: string;
  description: string;
  icon: 'users' | 'bar-chart' | 'clipboard-check' | 'layers' | 'calendar' | 'database';
};

export const homeFeatures: HomeFeature[] = [
  {
    title: 'Alumnos y legajos',
    description:
      'Alta, edición y baja con legajo, DNI, carrera y estado. El legajo se sincroniza con el DNI y la inscripción a materias es automática.',
    icon: 'users',
  },
  {
    title: 'Notas y regularidad',
    description:
      'Parciales, recuperatorios y nota final en una grilla. El estado se calcula solo: aprobado desde 4, promocionado desde 7.',
    icon: 'bar-chart',
  },
  {
    title: 'Asistencia',
    description:
      'Registro por materia y clase, con porcentaje acumulado por alumno para detectar ausentismo a tiempo.',
    icon: 'clipboard-check',
  },
  {
    title: 'Planes de estudio',
    description:
      'Carreras, materias y correlatividades con validación de ciclos. Carga inicial desde el plan de estudios.',
    icon: 'layers',
  },
  {
    title: 'Exámenes',
    description:
      'Calendario mensual con parciales, recuperatorios, finales y trabajos prácticos. Alta, edición y baja.',
    icon: 'calendar',
  },
  {
    title: 'Datos y respaldos',
    description:
      'Exportación e importación de las doce tablas en CSV, con vista previa, mapeo de columnas e importación transaccional.',
    icon: 'database',
  },
];

export const highlights = [
  {
    icon: 'shield' as const,
    title: 'Dos roles, permisos claros',
    description:
      'Administrador con acceso total; profesor limitado a sus materias y carreras asignadas. Protecciones para no borrar el usuario conectado ni el último administrador.',
  },
  {
    icon: 'file-text' as const,
    title: 'Documentos listos para firmar',
    description:
      'Certificado de alumno regular y constancia de regularidad en PDF, con las correlativas pendientes incluidas.',
  },
  {
    icon: 'hard-drive' as const,
    title: 'Funciona sin internet',
    description:
      'Base SQLite local, sin servidor ni conexión. Los datos viven en el perfil de Windows de cada usuario.',
  },
  {
    icon: 'download' as const,
    title: 'Instalación en un paso',
    description:
      'Instalador autocontenido de 39 MB: no requiere .NET ni dependencias adicionales en el equipo destino.',
  },
];

export type CaseModule = {
  id: string;
  tab: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  bullets: string[];
};

export const modules: CaseModule[] = [
  {
    id: 'panel',
    tab: 'Panel',
    title: 'Un tablero con el estado de la institución',
    description:
      'Al iniciar sesión, cada usuario ve el resumen que le corresponde: alumnos, carreras, materias, promedio general, notas aprobadas y desaprobadas, y asistencia promedio.',
    image: '/capturas/dashboard.png',
    alt: 'Panel principal de EduGestionAR con indicadores, calendario de exámenes y gráficos de notas',
    bullets: [
      'Indicadores calculados sobre la base real, no sobre planillas paralelas',
      'Calendario mensual de exámenes con alta, edición y baja',
      'El panel del profesor se limita a las carreras y materias asignadas',
    ],
  },
  {
    id: 'alumnos',
    tab: 'Alumnos',
    title: 'Legajos completos, sin duplicados',
    description:
      'Alta, edición y baja de alumnos con legajo, DNI, carrera, año y estado. El legajo se sincroniza con el DNI y la inscripción a materias se genera automáticamente según el plan de estudios.',
    image: '/capturas/alumnos.png',
    alt: 'Listado de alumnos de EduGestionAR con buscador, filtros y acciones',
    bullets: [
      'Buscador y filtros por carrera y estado',
      'Inscripción automática en todas las materias de la carrera',
      'Certificado de alumno regular en PDF',
      'Pestañas de notas, regularidad y asistencia dentro del legajo',
    ],
  },
  {
    id: 'notas',
    tab: 'Notas',
    title: 'Carga de notas con reglas explícitas',
    description:
      'Parciales, recuperatorios, nota final y recuperatorio de final en una sola grilla. El estado de cada materia se calcula solo: aprobado desde 4, promocionado desde 7.',
    image: '/capturas/notas.png',
    alt: 'Pantalla de carga de notas de EduGestionAR con columnas de parciales, recuperatorios y nota final',
    bullets: [
      'Promedio por alumno y por materia, siempre recalculado',
      'Condición Promocionado / Regular / Libre por materia',
      'Constancia de regularidad en PDF con correlativas pendientes',
      'Listado de materias libres exportable a CSV',
    ],
  },
  {
    id: 'asistencia',
    tab: 'Asistencia',
    title: 'Asistencia por clase, no por aproximación',
    description:
      'Registro de presentes por materia y fecha, con resumen acumulado por alumno y porcentaje de asistencia para detectar ausentismo a tiempo.',
    image: '/capturas/asistencia.png',
    alt: 'Módulo de asistencia de EduGestionAR con registro por clase y porcentajes por alumno',
    bullets: [
      'Carga rápida por materia y fecha',
      'Porcentaje de asistencia por alumno',
      'Acceso directo al legajo completo desde el resumen',
    ],
  },
  {
    id: 'estructura',
    tab: 'Estructura',
    title: 'Planes de estudio y correlatividades',
    description:
      'Carreras, materias y correlatividades administradas desde la aplicación, con validación de ciclos para que un plan no quede bloqueado por una regla imposible.',
    image: '/capturas/materias.png',
    alt: 'Gestión de materias y carreras de EduGestionAR con filtros por año y búsqueda',
    bullets: [
      'ABM de carreras y materias con horas y año',
      'Editor de correlatividades con detección de ciclos',
      'Carga inicial de planes de estudio desde un archivo Markdown',
    ],
  },
];

export const metrics = [
  { value: '12', label: 'tablas en la base', detail: 'Académico, alumnado, cursada, usuarios y agenda.' },
  { value: '8', label: 'módulos de trabajo', detail: 'Panel, alumnos, estructura, notas, regularidad, asistencia, usuarios y respaldos.' },
  { value: '2', label: 'idiomas', detail: 'Interfaz completa en español e inglés, con preferencia por usuario.' },
  { value: '100 %', label: 'local', detail: 'Sin servidor ni conexión: la base vive en el perfil de Windows.' },
];

export type FeatureGroup = {
  id: string;
  title: string;
  icon: 'shield' | 'bar-chart' | 'users' | 'layers' | 'file-text' | 'graduation-cap' | 'clipboard-check' | 'database';
  summary: string;
  bullets: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export const featureGroups: FeatureGroup[] = [
  {
    id: 'acceso',
    title: 'Acceso y usuarios',
    icon: 'shield',
    summary:
      'Inicio de sesión con usuario y contraseña, y dos roles con permisos distintos sobre los mismos datos.',
    bullets: [
      'Administrador: acceso total a alumnos, materias, usuarios y respaldos',
      'Profesor: panel y notas limitados a las materias que tiene asignadas',
      'ABM de usuarios y asignación de materias por docente',
      'No se puede eliminar el usuario conectado ni el último administrador',
      'Tema, idioma y tamaño de interfaz persistentes por usuario de Windows',
    ],
    image: '/capturas/usuarios.png',
    imageAlt: 'Administración de usuarios y roles de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'panel',
    title: 'Panel de inicio',
    icon: 'bar-chart',
    summary:
      'La foto del estado académico al abrir la aplicación, con los números que se recalculan sobre la base real.',
    bullets: [
      'Indicadores de alumnos, carreras, materias, promedio general y asistencia',
      'Notas aprobadas y desaprobadas, y materias promocionadas',
      'Calendario mensual de exámenes con navegación entre meses',
      'Saludo personalizado con rol y fecha',
      'Para profesores, el calendario se limita a sus carreras',
    ],
    image: '/capturas/dashboard.png',
    imageAlt: 'Panel principal de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'alumnos',
    title: 'Alumnos y legajos',
    icon: 'users',
    summary:
      'El expediente académico de cada alumno, con sus datos, notas, regularidad y asistencia en un mismo lugar.',
    bullets: [
      'Alta, edición y baja con legajo, DNI, carrera, año y estado',
      'Legajo = DNI, sincronizado automáticamente',
      'Inscripción automática en todas las materias de la carrera',
      'Buscador y filtros por carrera y estado',
      'Certificado de alumno regular en PDF',
      'Vistas de notas, regularidad y asistencia dentro del legajo',
    ],
    image: '/capturas/alumnos.png',
    imageAlt: 'Listado de alumnos de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'estructura',
    title: 'Carreras, materias y correlatividades',
    icon: 'layers',
    summary:
      'La oferta académica administrada desde la aplicación, con las reglas del plan de estudios.',
    bullets: [
      'ABM de carreras y de materias (carrera, año, horas y clases)',
      'Editor de correlatividades por materia con validación de ciclos',
      'Filtros por carrera, año y búsqueda',
      'Carga inicial de planes de estudio cuando la base está vacía',
    ],
    image: '/capturas/materias.png',
    imageAlt: 'Gestión de materias y carreras de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'notas',
    title: 'Notas',
    icon: 'file-text',
    summary:
      'Una grilla por alumno y materia con todas las instancias de evaluación y el estado calculado automáticamente.',
    bullets: [
      'Parcial 1 a 4, recuperatorios, nota final y recuperatorio de final',
      'Aprobado desde 4; desaprobado por debajo',
      'Promedio por alumno y vista de promedio por materia',
      'Búsqueda, filtro por carrera y paginación',
      'Listado restringido a sus materias para el rol profesor',
    ],
    image: '/capturas/notas.png',
    imageAlt: 'Carga de notas de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'regularidad',
    title: 'Regularidad',
    icon: 'graduation-cap',
    summary:
      'La condición de cada alumno por materia, con constancias listas para entregar y listados exportables.',
    bullets: [
      'Condición Promocionado, Regular o Libre por materia',
      'Promocionado: todas las notas 7 o más; Libre: alguna nota menor a 4',
      'Tarjetas de resumen y filtros por condición y carrera',
      'Constancia de regularidad en PDF con correlativas pendientes',
      'Listado de materias libres exportable a CSV',
    ],
    image: '/capturas/regularidad.png',
    imageAlt: 'Pantalla de regularidad de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'asistencia',
    title: 'Asistencia',
    icon: 'clipboard-check',
    summary:
      'El registro de clases y el porcentaje de asistencia de cada alumno, sin planillas paralelas.',
    bullets: [
      'Carga de asistencia por materia y clase con fecha y presentes',
      'Resumen por alumno con porcentaje acumulado',
      'Acceso directo al legajo completo desde el resumen',
    ],
    image: '/capturas/asistencia.png',
    imageAlt: 'Registro de asistencia de EduGestionAR',
    imageWidth: 1382,
    imageHeight: 736,
  },
  {
    id: 'datos',
    title: 'Datos y respaldos',
    icon: 'database',
    summary:
      'Exportación e importación de toda la información, con controles antes de aplicar cambios.',
    bullets: [
      'Exportación completa de las 12 tablas en CSV (UTF-8 con BOM, separadas por punto y coma)',
      'Importación por tabla o de una carpeta completa, con vista previa de las primeras 100 filas',
      'Mapeo de columnas y validación de campos obligatorios',
      'Importación transaccional: si una fila falla, no se aplica nada',
      'Actualización por identificador (upsert) o por clave natural',
    ],
    image: '/capturas/importar-datos.png',
    imageAlt: 'Diálogo de importación de datos de EduGestionAR',
    imageWidth: 996,
    imageHeight: 679,
  },
];

export type Shot = {
  src: string;
  title: string;
  caption: string;
  alt: string;
  width: number;
  height: number;
  group: 'principal' | 'dialogo';
};

export const galleryShots: Shot[] = [
  {
    src: '/capturas/dashboard.png',
    title: 'Panel principal',
    caption: 'Indicadores, calendario de exámenes y evolución de notas.',
    alt: 'Panel principal de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/alumnos.png',
    title: 'Alumnos',
    caption: 'Legajos, filtros por carrera y estado, y certificados en PDF.',
    alt: 'Listado de alumnos de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/notas.png',
    title: 'Notas',
    caption: 'Parciales, recuperatorios y nota final en una sola grilla.',
    alt: 'Carga de notas de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/regularidad.png',
    title: 'Regularidad',
    caption: 'Condición por materia, materias libres y constancias.',
    alt: 'Pantalla de regularidad de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/asistencia.png',
    title: 'Asistencia',
    caption: 'Registro por clase y porcentaje acumulado por alumno.',
    alt: 'Registro de asistencia de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/materias.png',
    title: 'Materias',
    caption: 'Oferta académica por carrera y año, con correlatividades.',
    alt: 'Materias de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/usuarios.png',
    title: 'Usuarios y roles',
    caption: 'Administradores y profesores con permisos distintos.',
    alt: 'Administración de usuarios de EduGestionAR',
    width: 1382,
    height: 736,
    group: 'principal',
  },
  {
    src: '/capturas/importar-datos.png',
    title: 'Importación de datos',
    caption: 'Vista previa, mapeo de columnas e importación transaccional.',
    alt: 'Diálogo de importación de datos de EduGestionAR',
    width: 996,
    height: 679,
    group: 'principal',
  },
  {
    src: '/capturas/login.png',
    title: 'Inicio de sesión',
    caption: 'Acceso con usuario y contraseña, y rol asignado.',
    alt: 'Pantalla de inicio de sesión de EduGestionAR',
    width: 426,
    height: 528,
    group: 'dialogo',
  },
  {
    src: '/capturas/dialogo-alumno.png',
    title: 'Alta de alumno',
    caption: 'Datos personales, carrera, año y estado.',
    alt: 'Diálogo de alta de alumno en EduGestionAR',
    width: 446,
    height: 307,
    group: 'dialogo',
  },
  {
    src: '/capturas/dialogo-notas.png',
    title: 'Edición de notas',
    caption: 'Carga de las instancias de evaluación del alumno.',
    alt: 'Diálogo de edición de notas en EduGestionAR',
    width: 916,
    height: 599,
    group: 'dialogo',
  },
  {
    src: '/capturas/dialogo-correlativas.png',
    title: 'Correlatividades',
    caption: 'Materias que deben aprobarse antes de cursar.',
    alt: 'Diálogo de correlatividades en EduGestionAR',
    width: 476,
    height: 439,
    group: 'dialogo',
  },
  {
    src: '/capturas/dialogo-asistencia.png',
    title: 'Registro de asistencia',
    caption: 'Presentes por clase con fecha y materia.',
    alt: 'Diálogo de registro de asistencia en EduGestionAR',
    width: 696,
    height: 579,
    group: 'dialogo',
  },
];

export const techSheet = [
  { label: 'Lenguaje', value: 'C# 14' },
  { label: 'Framework', value: '.NET 10 · WinForms' },
  { label: 'Base de datos', value: 'SQLite local · 12 tablas' },
  { label: 'Documentos', value: 'PDFsharp / MigraDoc' },
  { label: 'Instalador', value: 'Inno Setup 6 · autocontenido' },
  { label: 'Plataforma', value: 'Windows 10 y 11 (x64)' },
  { label: 'Idiomas', value: 'Español e inglés' },
  { label: 'Conexión', value: 'No requiere internet' },
];

export const faqs = [
  {
    question: '¿Qué incluye la versión de demostración?',
    answer:
      'El instalador incluye la aplicación completa con una base de ejemplo: alumnos, docentes, carreras, materias, notas, asistencia y usuarios. Es una demo con fines académicos, pensada para probar todos los módulos. No debe usarse como sistema oficial ni con datos personales reales.',
  },
  {
    question: '¿Necesita conexión a internet o un servidor?',
    answer:
      'No. EduGestionAR funciona de forma local: la base SQLite vive en el perfil de Windows de cada usuario y no hay servidor ni dependencia de internet.',
  },
  {
    question: '¿Dónde se guardan los datos?',
    answer:
      'La base se guarda en %LOCALAPPDATA%\\EduGestor\\edugestor.db y las preferencias de tema e idioma en la misma carpeta. Los respaldos CSV se exportan, por omisión, a Documentos\\EduGestionAR - Datos.',
  },
  {
    question: '¿Actualizar o reinstalar borra la información?',
    answer:
      'No. Reinstalar o actualizar la aplicación no modifica la carpeta de datos. La desinstalación tampoco elimina la base ni las preferencias.',
  },
  {
    question: '¿Puedo reiniciar la demo desde cero?',
    answer:
      'Sí. Con la aplicación cerrada, eliminá la carpeta %LOCALAPPDATA%\\EduGestor y volvé a abrir el programa: se restaura la base de demostración incluida en la aplicación. Si querés conservar los datos, hacé una copia antes.',
  },
  {
    question: '¿Funciona en red o desde varias computadoras a la vez?',
    answer:
      'No en esta versión. Cada usuario de Windows tiene su propia base local. Para mover información entre equipos hay que exportar los datos completos en un equipo e importarlos en el otro.',
  },
  {
    question: '¿Cómo accedo la primera vez?',
    answer:
      'La demo se instala con el usuario admin y la contraseña admin123. Recomendamos cambiarla desde Usuarios → Editar y crear un usuario por persona.',
  },
];

export const requirements = [
  { label: 'Sistema operativo', value: 'Windows 10 u 11 (x64)' },
  { label: 'Espacio libre', value: '~130 MB' },
  { label: 'Runtime de .NET', value: 'No requiere (incluido)' },
  { label: 'Conexión', value: 'Ninguna' },
];

export const installSteps = [
  {
    number: '01',
    title: 'Descargá el instalador',
    description:
      'EduGestionAR-Demo-Setup-1.0.0.exe (39 MB). Al ejecutarlo, Windows puede mostrar un aviso porque el instalador no está firmado digitalmente.',
  },
  {
    number: '02',
    title: 'Aceptá el aviso y los términos',
    description:
      'Elegí si la instalación es solo para tu usuario o para todos. Se crean accesos directos en el menú Inicio y, opcionalmente, en el escritorio.',
  },
  {
    number: '03',
    title: 'Ingresá con el usuario de demo',
    description:
      'Usuario admin, contraseña admin123. La base de ejemplo se copia automáticamente en el primer inicio.',
  },
];

export const businessRules = [
  'Legajo = DNI, sincronizado al iniciar la aplicación.',
  'Cada alumno queda inscripto en todas las materias de su carrera.',
  'Nota aprobada desde 4; desaprobada por debajo de 4.',
  'Regularidad: Libre si alguna nota es menor a 4; Promocionado si todas son 7 o más; Regular en el resto.',
  'Promedio, estado de notas, regularidad e inscripciones se recalculan al iniciar.',
  'Eliminar un alumno borra en cascada sus notas, asistencia, regularidad y prórrogas.',
];
