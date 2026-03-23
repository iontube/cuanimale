/**
 * Generates all favicon/icon/OG assets from SVG source.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '../public');

// Icon SVG (paw print)
const iconSvg = `
<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="50%" stop-color="#14b8a6"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="110" fill="url(#bg)"/>
  <circle cx="178" cy="170" r="44" fill="white" opacity="0.9"/>
  <circle cx="334" cy="170" r="44" fill="white" opacity="0.9"/>
  <circle cx="130" cy="282" r="36" fill="white" opacity="0.9"/>
  <circle cx="382" cy="282" r="36" fill="white" opacity="0.9"/>
  <ellipse cx="256" cy="370" rx="88" ry="70" fill="white" opacity="0.95"/>
</svg>`;

// OG Image SVG (1200x630)
const ogSvg = `
<svg viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="obg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#042f2e"/>
      <stop offset="50%" stop-color="#134e4a"/>
      <stop offset="100%" stop-color="#0d9488"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#obg)"/>
  <!-- Paw icon -->
  <circle cx="160" cy="240" r="22" fill="white" opacity="0.3"/>
  <circle cx="230" cy="240" r="22" fill="white" opacity="0.3"/>
  <circle cx="138" cy="290" r="18" fill="white" opacity="0.3"/>
  <circle cx="252" cy="290" r="18" fill="white" opacity="0.3"/>
  <ellipse cx="195" cy="330" rx="42" ry="34" fill="white" opacity="0.35"/>
  <!-- Text -->
  <text x="120" y="460" font-family="system-ui, sans-serif" font-size="72" font-weight="800" fill="white">
    <tspan fill="#5eead4">cu</tspan>animale<tspan fill="#5eead4">.ro</tspan>
  </text>
  <text x="120" y="520" font-family="system-ui, sans-serif" font-size="28" fill="#99f6e4" opacity="0.8">
    Îngrijire, hrană și sănătate pentru animale de companie
  </text>
</svg>`;

async function generate() {
  const iconBuffer = Buffer.from(iconSvg);
  const ogBuffer = Buffer.from(ogSvg);

  // Favicon 32x32 PNG
  await sharp(iconBuffer).resize(32, 32).png().toFile(resolve(publicDir, 'favicon-32.png'));
  console.log('favicon-32.png');

  // Apple touch icon 180x180
  await sharp(iconBuffer).resize(180, 180).png().toFile(resolve(publicDir, 'apple-touch-icon.png'));
  console.log('apple-touch-icon.png');

  // Icon 192x192 (PWA)
  await sharp(iconBuffer).resize(192, 192).png().toFile(resolve(publicDir, 'icon-192.png'));
  console.log('icon-192.png');

  // Icon 512x512 (PWA)
  await sharp(iconBuffer).resize(512, 512).png().toFile(resolve(publicDir, 'icon-512.png'));
  console.log('icon-512.png');

  // OG image 1200x630
  await sharp(ogBuffer).resize(1200, 630).png().toFile(resolve(publicDir, 'og-default.png'));
  console.log('og-default.png');

  // Logo wide PNG (light)
  const logoSvg = readFileSync(resolve(publicDir, 'logo-wide.svg'));
  await sharp(logoSvg).resize(600, null).png().toFile(resolve(publicDir, 'logo-wide.png'));
  console.log('logo-wide.png');

  // Logo wide PNG (dark)
  const logoDarkSvg = readFileSync(resolve(publicDir, 'logo-wide-dark.svg'));
  await sharp(logoDarkSvg).resize(600, null).png().toFile(resolve(publicDir, 'logo-wide-dark.png'));
  console.log('logo-wide-dark.png');

  console.log('\nDone!');
}

generate().catch(console.error);
