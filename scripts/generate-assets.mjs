/**
 * Genera los assets de marca del sitio:
 *   - public/favicon.ico (16, 32, 48 y 256 px)
 *   - public/favicon-16.png, favicon-32.png, favicon-256.png
 *   - public/apple-touch-icon.png (180×180)
 *   - public/og.png (1200×630) para compartir en redes
 *
 * Uso: npm run assets
 */
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, 'public');

/* ------------------------------------------------------------------ */
/* Favicon: isotipo blanco sobre cuadrado navy redondeado              */
/* ------------------------------------------------------------------ */

const isotipo = await sharp(path.join(publicDir, 'brand', 'isotipo.png'))
  .trim()
  .resize({ height: 340 })
  .png()
  .toBuffer();

const navySquare = Buffer.from(`
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#03345F"/>
</svg>
`);

const master = await sharp(navySquare)
  .composite([{ input: isotipo, gravity: 'center' }])
  .png()
  .toBuffer();

const sizes = [16, 32, 48, 180, 256];
const buffers = new Map();

for (const size of sizes) {
  const data = await sharp(master).resize(size, size, { fit: 'cover' }).png().toBuffer();
  buffers.set(size, data);

  if (size === 180) {
    await sharp(data).toFile(path.join(publicDir, 'apple-touch-icon.png'));
  }
  if ([16, 32, 256].includes(size)) {
    await sharp(data).toFile(path.join(publicDir, `favicon-${size}.png`));
  }
}

/** Arma un .ico con entradas PNG (soportado desde Windows Vista). */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((image) => image.data),
  ]);
}

const ico = buildIco(
  [16, 32, 48, 256].map((size) => ({ size, data: buffers.get(size) }))
);
await writeFile(path.join(publicDir, 'favicon.ico'), ico);

/* ------------------------------------------------------------------ */
/* Imagen para compartir: logotipo corporativo                         */
/* ------------------------------------------------------------------ */

const logo = await sharp(path.join(publicDir, 'brand', 'digitalmente.png'))
  .resize({ width: 620 })
  .png()
  .toBuffer();

const background = Buffer.from(`
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#14A9E8"/>
      <stop offset="100%" stop-color="#F59A4E"/>
    </linearGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="1"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#03345F" stroke-opacity="0.07" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="#F6F8FA"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="0" y="0" width="1200" height="630" fill="url(#fade)" opacity="0.55"/>

  <rect x="28" y="28" width="1144" height="574" rx="20" fill="#FFFFFF" stroke="#E2E8EF" stroke-width="2"/>
  <rect x="28" y="28" width="1144" height="574" rx="20" fill="none" stroke="#03345F" stroke-opacity="0.06" stroke-width="12"/>

  <circle cx="1044" cy="128" r="86" fill="none" stroke="#03345F" stroke-opacity="0.08" stroke-width="2"/>
  <circle cx="1112" cy="86" r="44" fill="none" stroke="#03345F" stroke-opacity="0.08" stroke-width="2"/>

  <rect x="28" y="586" width="1144" height="16" rx="8" fill="url(#accent)"/>
</svg>
`);

await sharp(background)
  .composite([
    {
      input: logo,
      left: Math.round((1200 - 620) / 2),
      top: Math.round((630 - 620 * (137 / 300)) / 2) - 10,
    },
  ])
  .png({ quality: 92 })
  .toFile(path.join(publicDir, 'og.png'));

console.log(
  'OK: favicon.ico (+ PNG 16/32/256), apple-touch-icon.png y og.png generados.'
);
