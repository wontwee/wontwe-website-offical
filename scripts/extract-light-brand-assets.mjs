import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'C:/Users/comra/.gemini/antigravity/brain/413e8a63-4cd6-4455-8cda-16000cc86dd7/.user_uploaded/media_1794293673821_5d318364.jpg';
const OUT_DIR = path.resolve('public/brand');

/**
 * Converts a light-background region into a clean transparent light-mode PNG:
 * - Background off-white becomes fully transparent
 * - Black ink pixels become crisp #0A0D14 deep obsidian ink
 * - Purple pixels preserve exact brand purple (#7D18E0)
 */
async function extractLightModeCutout(left, top, width, height, outBase, scale = 2) {
  const { data, info } = await sharp(SRC)
    .extract({ left, top, width, height })
    .resize(width * scale, height * scale, { kernel: sharp.kernel.lanczos3 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = Buffer.alloc(info.width * info.height * 4);
  const bgLuma = 238;

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    const luma = 0.299 * r + 0.587 * g + 0.114 * b;
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);

    let alpha = 0;
    if (luma < bgLuma) {
      alpha = Math.min(1, Math.max(0, (bgLuma - luma) / 115));
      alpha = Math.pow(alpha, 0.78);
    }

    const isPurple = chroma > 24 && b > g && r > g;

    if (isPurple) {
      // Signature brand purple #7D18E0 on light mode
      const purity = Math.min(1, chroma / 140);
      rgba[j] = Math.round(10 * (1 - purity) + 125 * purity);
      rgba[j + 1] = Math.round(13 * (1 - purity) + 24 * purity);
      rgba[j + 2] = Math.round(20 * (1 - purity) + 224 * purity);
    } else {
      // Deep obsidian black strokes
      rgba[j] = 10;
      rgba[j + 1] = 13;
      rgba[j + 2] = 20;
    }

    rgba[j + 3] = Math.round(alpha * 255);
  }

  const outPng = path.join(OUT_DIR, `${outBase}.png`);
  const outWebp = path.join(OUT_DIR, `${outBase}.webp`);

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toFile(outPng);

  await sharp(rgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 95, alphaQuality: 100 })
    .toFile(outWebp);

  console.log(`Generated light asset: ${outBase} (${info.width}x${info.height})`);
}

async function main() {
  await extractLightModeCutout(363, 103, 298, 222, 'wontwe-monogram-light', 2);
  await extractLightModeCutout(285, 340, 454, 68, 'wontwe-wordmark-light', 2);
  await extractLightModeCutout(285, 103, 454, 353, 'wontwe-lockup-full-light', 2);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
