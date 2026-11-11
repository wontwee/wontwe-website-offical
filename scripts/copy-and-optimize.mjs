import fs from 'node:fs';
import path from 'node:path';

const ARTIFACT_DIR = 'C:\\Users\\comra\\.gemini\\antigravity\\brain\\413e8a63-4cd6-4455-8cda-16000cc86dd7';
const TARGET_DIR = path.resolve('public/images');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const IMAGE_MAP = [
  { src: 'hero_tech_architecture_1794292629799.jpg', base: 'hero-tech-architecture' },
  { src: 'hero_universe_1794290253643.jpg', base: 'hero-universe' },
  { src: 'world_tech_lab_1794290259096.jpg', base: 'world-tech-lab' },
  { src: 'world_digital_command_1794290256639.jpg', base: 'world-digital-command' },
  { src: 'world_studios_stage_1794290274912.jpg', base: 'world-studios-stage' },
  { src: 'world_events_dark_1794290272505.jpg', base: 'world-events-dark' },
  { src: 'world_events_lit_1794290301854.jpg', base: 'world-events-lit' },
  { src: 'about_monolith_1794290295860.jpg', base: 'about-monolith' },
  { src: 'studios_lens_1794290322622.jpg', base: 'studios-lens' },
  { src: 'exp_tech_1794290290691.jpg', base: 'exp-tech' },
  { src: 'exp_digital_1794290327499.jpg', base: 'exp-digital' },
  { src: 'exp_studios_png_1794290304838.jpg', base: 'exp-studios' },
  { src: 'exp_events_png_1794290333892.jpg', base: 'exp-events' },
];

async function main() {
  let sharpModule = null;
  try {
    const imported = await import('sharp');
    sharpModule = imported.default || imported;
  } catch {
    console.log('Sharp not installed yet; copying files directly.');
  }

  for (const item of IMAGE_MAP) {
    const srcPath = path.join(ARTIFACT_DIR, item.src);
    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${srcPath}`);
      continue;
    }

    const dstJpg = path.join(TARGET_DIR, `${item.base}.jpg`);
    fs.copyFileSync(srcPath, dstJpg);
    console.log(`Copied ${item.src} -> ${item.base}.jpg`);

    if (sharpModule) {
      try {
        const dstWebp = path.join(TARGET_DIR, `${item.base}.webp`);
        await sharpModule(dstJpg)
          .webp({ quality: 86, effort: 4 })
          .toFile(dstWebp);
        console.log(`Converted -> ${item.base}.webp`);
      } catch (err) {
        console.error(`Error converting ${item.base}:`, err.message);
      }
    }
  }
}

main().catch(console.error);

