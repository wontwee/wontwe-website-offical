import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const LOCKUP_PATH = path.join(ROOT, 'public', 'brand', 'wontwe-lockup-full.png');
const OUT_PATH = path.join(ROOT, 'public', 'og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

async function main() {
  const lockupResized = await sharp(LOCKUP_PATH)
    .resize({ width: 280, withoutEnlargement: true })
    .toBuffer();

  const bgSvg = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="purpleGlow" cx="76%" cy="32%" r="55%">
          <stop offset="0%" stop-color="#7D18E0" stop-opacity="0.34" />
          <stop offset="55%" stop-color="#2D0C57" stop-opacity="0.14" />
          <stop offset="100%" stop-color="#050608" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7D18E0" />
          <stop offset="100%" stop-color="#A86BFF" />
        </linearGradient>
      </defs>

      <rect width="${WIDTH}" height="${HEIGHT}" fill="#050608" />
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#purpleGlow)" />
      <rect x="72" y="72" width="${WIDTH - 144}" height="${HEIGHT - 144}" rx="16" fill="rgba(10,11,18,0.72)" stroke="rgba(168,107,255,0.28)" stroke-width="1.5" />

      <rect x="120" y="132" width="44" height="3" fill="url(#accentLine)" />
      <text x="178" y="138" fill="#A86BFF" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="4">TECHNOLOGY FIRST</text>

      <text x="120" y="242" fill="#F5F7FA" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" letter-spacing="-1.5">ENGINEERING</text>
      <text x="120" y="316" fill="#F5F7FA" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="700" letter-spacing="-1.5">WHAT'S NEXT.</text>

      <text x="120" y="378" fill="#989DAB" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="400">Software Engineering · Business Systems · AI &amp; Cloud</text>
      <text x="120" y="414" fill="#646978" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="500">Supported by WONTWE Digital, WONTWE Studios &amp; WONTWE Events</text>

      <rect x="120" y="476" width="218" height="44" rx="22" fill="rgba(125,24,224,0.22)" stroke="rgba(168,107,255,0.5)" stroke-width="1.2" />
      <text x="148" y="504" fill="#F5F7FA" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="1.5">+91 8095770506</text>
    </svg>
  `);

  await sharp(bgSvg)
    .composite([{ input: lockupResized, left: 790, top: 206 }])
    .png({ compressionLevel: 9 })
    .toFile(OUT_PATH);

  console.log('Generated OG image:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
