import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SRC = 'C:/Users/comra/.gemini/antigravity/brain/413e8a63-4cd6-4455-8cda-16000cc86dd7/.user_uploaded/media_1794293673821_5d318364.jpg';
const OUT_DIR = path.resolve('public/brand');

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Converts a light-background region into a clean transparent dark-mode PNG:
 * - Background off-white becomes fully transparent
 * - Black ink pixels become crisp #F5F7FA cool white
 * - Purple pixels preserve exact purple hue (slightly lifted for dark-surface contrast)
 */
async function extractDarkModeCutout(left, top, width, height, outBase, scale = 2) {
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

    // Compute smooth anti-aliased opacity from background threshold
    let alpha = 0;
    if (luma < bgLuma) {
      alpha = Math.min(1, Math.max(0, (bgLuma - luma) / 115));
      // Strengthen solid ink interior while keeping edges smooth
      alpha = Math.pow(alpha, 0.78);
    }

    const isPurple = chroma > 24 && b > g && r > g;

    if (isPurple) {
      // Preserve brand purple hue (#7D18E0 -> lifted slightly for crisp dark-mode visibility #9B4DFF)
      // Blend proportionally based on chroma purity
      const purity = Math.min(1, chroma / 140);
      rgba[j] = Math.round(245 * (1 - purity) + 148 * purity);
      rgba[j + 1] = Math.round(247 * (1 - purity) + 56 * purity);
      rgba[j + 2] = Math.round(250 * (1 - purity) + 245 * purity);
    } else {
      // Pure cool white strokes on dark background
      rgba[j] = 245;
      rgba[j + 1] = 247;
      rgba[j + 2] = 250;
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

  console.log(`Generated ${outBase} (${info.width}x${info.height})`);
  return { width: info.width, height: info.height, outPng };
}

async function main() {
  // 1. Standalone W Monogram (298x222 -> 596x444)
  const mono = await extractDarkModeCutout(363, 103, 298, 222, 'wontwe-monogram', 2);

  // 2. Complete WONTWE Wordmark with Purple W (454x68 -> 908x136)
  await extractDarkModeCutout(285, 340, 454, 68, 'wontwe-wordmark', 2);

  // 3. Complete Full Stacked Lockup (Monogram + WONTWE + YES WE DO.)
  await extractDarkModeCutout(285, 103, 454, 353, 'wontwe-lockup-full', 2);

  // 4. Standalone Favicon (256x256 square dark badge with centered original W monogram)
  const faviconMonogram = await sharp(mono.outPng)
    .resize(196, 146, { fit: 'contain' })
    .toBuffer();

  const roundedMask = Buffer.from(
    `<svg width="256" height="256"><rect x="0" y="0" width="256" height="256" rx="48" ry="48" fill="#050608"/></svg>`
  );

  await sharp({
    create: {
      width: 256,
      height: 256,
      channels: 4,
      background: { r: 8, g: 10, b: 14, alpha: 255 },
    },
  })
    .composite([
      { input: roundedMask, blend: 'dest-in' },
      { input: faviconMonogram, gravity: 'center' },
    ])
    .png()
    .toFile(path.resolve('public/favicon.png'));

  console.log('Generated public/favicon.png (256x256)');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

