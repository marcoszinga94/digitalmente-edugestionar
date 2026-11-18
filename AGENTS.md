# Guía del proyecto

Sitio del producto **EduGestionAR** (sistema de gestión escolar), desarrollado por
**DigitalMente — Tech Solutions**. Astro 7 + React 19 + Tailwind 4. Contenido en español
rioplatense, tono claro e institucional.

## Comandos

```bash
npm install
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run check      # types de Astro + React
npm run build      # build estático en dist/
npm run preview    # sirve dist/
npm run assets     # regenera og.png y apple-touch-icon.png
```

Para levantar el servidor desde una sesión de agente: `npx astro dev --background`, y
administrarlo con `npx astro dev status|logs|stop`.

## Dónde se edita cada cosa

- **Contacto, navegación y dominio**: `src/config/site.ts`.
- **Contenido del producto** (funciones, módulos, galería, métricas, FAQ, descarga):
  `src/data/product.ts`.
- **SEO global, JSON-LD y OG**: `src/layouts/BaseLayout.astro`.
- **Tokens de diseño** (colores de marca, tipografías): `src/styles/global.css` en `@theme`.
- **Páginas**: `src/pages/` (`index`, `funciones`, `capturas`, `documentacion`, `contacto`).

## Convenciones

- Tailwind 4 sin `tailwind.config.js`: los tokens se declaran en `@theme`.
- Colores de marca: `navy` (principal), `azure` y `amber` (acentos del logotipo).
- Header y footer usan el logo de **DigitalMente**; el favicon y el ícono de iOS se generan
  desde `public/brand/isotipo.png` con `npm run assets`. El ícono de **EduGestionAR**
  (`public/brand/edugestionar.png`) se usa dentro del contenido del producto.
- Islas React solo para interacción real, con `client:load` (menú, formulario) o `client:idle`
  (tabs, galería). **No usar `client:visible`**: los `astro-island` tienen `display: contents`
  y no intersectan (quedan sin hidratar).
- Imágenes en `public/` con rutas absolutas (`/capturas/...`).
- Accesibilidad: `aria-*` explícitos, foco visible, `prefers-reduced-motion` y textos
  alternativos descriptivos.

## Contenido sensible

EduGestionAR se distribuye como **demo con fines académicos**: no debe presentarse como un
sistema listo para producción ni usarse con datos personales reales. Mantener ese aviso en el
hero de descarga, la documentación y los términos. Los datos de contacto son placeholders hasta
que se reemplacen en `src/config/site.ts`.
