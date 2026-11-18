/**
 * Genera los assets derivados de la marca:
 *   - public/apple-touch-icon.png (180×180)
 *   - public/og.png (1200×630) para compartir en redes
 *
 * Uso: npm run assets
 */
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, 'public');

const favicon = await readFile(path.join(publicDir, 'favicon.svg'));

await sharp(favicon, { density: 600 })
  .resize(180, 180)
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'));

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

console.log('OK: public/apple-touch-icon.png y public/og.png generados.');
