/**
 * Datos editables del sitio.
 * Cambiá acá el contacto, las redes y la navegación: se usan en todas las páginas.
 */
export const site = {
  name: 'EduGestionAR',
  productName: 'EduGestionAR',
  companyName: 'DigitalMente',
  companySuffix: 'Tech Solutions',
  companyFullName: 'DigitalMente — Tech Solutions',
  shortDescription:
    'EduGestionAR: sistema de gestión escolar para Windows. Alumnos, carreras, notas, regularidad, asistencia, exámenes y respaldos en un solo lugar, sin servidor ni internet.',
  description:
    'EduGestionAR es el sistema de gestión escolar desarrollado por DigitalMente — Tech Solutions. Administra alumnos, carreras, materias, notas, regularidad, asistencia, exámenes y respaldos en una aplicación de escritorio para Windows, 100 % local y bilingüe.',
  url: 'https://edugestionar.com.ar',
  locale: 'es-AR',
  email: 'hola@digitalmente.com.ar',
  phoneDisplay: '+54 9 358 440-6950',
  phoneHref: '+5493584406950',
  whatsapp: '5493584406950',
  city: 'La Carlota, Córdoba, Argentina',
  addressNote: 'Soporte remoto en todo el país y reuniones coordinadas en La Carlota y la región.',
  hours: 'Lunes a viernes, de 9 a 18 h (ART)',
  /**
   * Si dejás el campo vacío, el formulario abre el cliente de correo con el
   * mensaje ya redactado. Si cargás un endpoint (Formspree, Netlify Forms,
   * una API propia), el formulario hace un POST JSON a esa URL.
   */
  formEndpoint: '',
  social: {
    linkedin: '',
    github: '',
    instagram: '',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Funciones', href: '/funciones' },
    { label: 'Capturas', href: '/capturas' },
    { label: 'Documentación', href: '/documentacion' },
    { label: 'Contacto', href: '/contacto' },
  ],
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}`;
export const mailtoHref = `mailto:${site.email}`;
