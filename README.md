# EduGestionAR — Sitio del producto

Sitio de presentación de **EduGestionAR**, el sistema de gestión escolar desarrollado por
**DigitalMente — Tech Solutions**. Construido con **Astro 7 + React + Tailwind CSS 4**.

El contenido está centrado en el producto: qué resuelve, funciones, capturas, documentación,
descarga de la demo y contacto. La marca de la empresa (DigitalMente) se usa en el header y el
footer, con EduGestionAR como protagonista del contenido.

## Requisitos

- Node.js **22.23.4** o superior (ver `engines` en `package.json`).
- npm 10 o superior.

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
```

Otros comandos:

```bash
npm run build      # genera el sitio estático en dist/
npm run preview    # sirve dist/ para revisar la versión de producción
npm run check      # chequeo de tipos (Astro + React)
npm run assets     # regenera public/og.png y public/apple-touch-icon.png
```

## Estructura

```
web-empresa/
├─ public/
│  ├─ brand/              Logo de DigitalMente e ícono de EduGestionAR
│  ├─ capturas/           Capturas reales: 8 pantallas + login y diálogos
│  ├─ descargas/          Instalador demo (39 MB)
│  ├─ diagramas/          Modelo de datos simplificado
│  ├─ documentos/         Manuales ES/EN y términos y condiciones
│  ├─ og.png              Imagen para compartir en redes (1200×630)
│  └─ favicon.svg         Ícono del sitio
├─ scripts/
│  └─ generate-assets.mjs Genera la imagen OG y el ícono de iOS
└─ src/
   ├─ config/site.ts      ⚠️ Contacto, navegación y dominio
   ├─ data/product.ts     Todo el contenido del producto
   ├─ components/
   │  ├─ react/           Islas interactivas (menú, tabs, galería, formulario)
   │  └─ *.astro          Header, footer, botones, íconos y secciones
   ├─ layouts/BaseLayout.astro   <head>, SEO y datos estructurados del software
   ├─ pages/              Inicio, funciones, capturas, documentación, contacto
   └─ styles/global.css   Tema de Tailwind (colores y tipografías)
```

### Páginas

| Ruta | Contenido |
| --- | --- |
| `/` | Presentación del sistema, funciones, módulos, descarga, FAQ y contacto |
| `/funciones` | Los ocho módulos en detalle, roles y reglas de negocio |
| `/capturas` | Galería completa con lightbox (pantallas y diálogos) |
| `/documentacion` | Requisitos, instalación, primer acceso, datos, modelo y limitaciones |
| `/contacto` | Canales y formulario orientado a demo/soporte |
| `/privacidad` | Política de privacidad (texto base, revisar antes de publicar) |

## Qué tenés que cambiar antes de publicar

1. **Contacto y dominio** en `src/config/site.ts`: correo, teléfono, WhatsApp, ciudad y redes.
2. **Dominio** también en `astro.config.mjs` (`site`) y en `public/robots.txt`, para que el
   canonical, el sitemap y las imágenes OG usen la URL correcta.
3. **Descarga**: el instalador está en `public/descargas/`. Si publicás otra versión:
   - reemplazá el archivo y actualizá `product.installer` en `src/data/product.ts`;
   - revisá los textos que mencionan versión y tamaño.
4. **Formulario**: por defecto abre el cliente de correo con el mensaje redactado. Para recibirlo
   por un servicio (Formspree, Netlify Forms, API propia), cargá la URL en `site.formEndpoint`.
5. **Privacidad**: completar razón social, CUIT y domicilio legal, y hacer revisar el texto.
6. **Redes sociales**: cargá las URLs en `site.social` (hoy no se muestran).

## Contenido y assets

- Las capturas, manuales y el modelo de datos se copiaron desde el repositorio de la aplicación
  (`docs/capturas`, `docs/diagramas` y `App1/Resources`). Si actualizás la app, reemplazá los
  archivos manteniendo los nombres.
- El instalador demo se toma de `Instalador/output/`.
- El header y el footer usan el logo de **DigitalMente**; el ícono de **EduGestionAR** aparece en
  el hero, la sección de descarga y como imagen de marca del producto.
- Después de cambiar el logotipo o el favicon, corré `npm run assets` para regenerar OG e ícono iOS.

## Publicación

Sitio 100 % estático:

- **Netlify / Vercel / Cloudflare Pages**: comando `npm run build`, salida `dist`.
- **Hosting tradicional**: subir el contenido de `dist/` por FTP.

Ojo: el instalador de 39 MB se sirve desde `public/descargas/`. Verificá el límite de tamaño y
ancho de banda del hosting si esperás muchas descargas.

## Notas técnicas

- Tailwind 4 se configura desde `src/styles/global.css` con `@theme` (no hay
  `tailwind.config.js`). Los colores `navy`, `azure` y `amber` salen del logotipo.
- Islas React con `client:load` (menú, formulario) y `client:idle` (tabs, galería). Se evitó
  `client:visible` porque los `astro-island` con `display: contents` no intersectan en Astro 7.
- El JSON-LD describe `SoftwareApplication` + `Organization` (desarrollador).
- No usa cookies ni analítica. Si agregás analítica, actualizá la política de privacidad.
- Las animaciones respetan `prefers-reduced-motion` y hay fallback con `<noscript>`.
