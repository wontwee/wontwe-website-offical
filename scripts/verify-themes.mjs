import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const PORT = 4173;
const DIST_DIR = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const fallback = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(fallback).pipe(res);
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

async function runChromeScreenshot({ url, output, width = 1440, height = 900 }) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const outPath = path.resolve(output);

  return new Promise((resolve, reject) => {
    const proc = spawn(chromePath, [
      '--headless=new',
      '--hide-scrollbars',
      '--disable-gpu',
      '--virtual-time-budget=2000',
      '--run-all-compositor-stages-before-draw',
      `--window-size=${width},${height}`,
      `--screenshot=${outPath}`,
      url,
    ]);

    proc.on('close', (code) => {
      if (code === 0 && fs.existsSync(outPath)) {
        console.log(`Saved screenshot: ${output} (${fs.statSync(outPath).size} bytes)`);
        resolve(outPath);
      } else {
        reject(new Error(`Chrome exited with code ${code} for ${output}`));
      }
    });

    proc.on('error', reject);
  });
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
  try {
    fs.mkdirSync('scratch', { recursive: true });

    // 1. Light Desktop Hero (Wordmark + Headline + Tagline)
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=light`,
      output: 'scratch/shot-light-hero.png',
      width: 1440,
      height: 900,
    });

    // 2. Dark Desktop Hero
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=dark`,
      output: 'scratch/shot-dark-hero.png',
      width: 1440,
      height: 900,
    });

    // 3. Coming Soon Divisions (#future-divisions) in Light Mode
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=light#future-divisions`,
      output: 'scratch/shot-coming-soon.png',
      width: 1440,
      height: 900,
    });

    // 4. Services Index (#services) in Light Mode
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=light#services`,
      output: 'scratch/shot-services.png',
      width: 1440,
      height: 1000,
    });

    // 5. Services Index (#services) in Dark Mode
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=dark#services`,
      output: 'scratch/shot-services-dark.png',
      width: 1440,
      height: 1000,
    });

    // 6. Light Mobile Viewport (390x844)
    await runChromeScreenshot({
      url: `http://127.0.0.1:${PORT}/?theme=light`,
      output: 'scratch/shot-mobile.png',
      width: 390,
      height: 844,
    });

    console.log('All screenshots captured successfully!');
  } catch (err) {
    console.error('Screenshot error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
});
