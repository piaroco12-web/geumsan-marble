// 배포용(dist) 그림만 화면 크기에 맞게 줄이고 압축한다. public/ 의 원본은 건드리지 않는다.
// 파일 이름과 형식(PNG)은 그대로라 board.json을 고칠 필요가 없다.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// 화면에서 가장 크게 보이는 크기의 약 2배(고해상도 화면 대비)
function maxSize(name) {
  if (/^(map-base|ui-title-bg|mg-ginseng-field)/.test(name)) return 1600;
  if (/^ui-paper/.test(name)) return 768;
  if (/^(ui-|char-|piece-)/.test(name)) return 384;
  return 512; // 건물, 미니게임 그림, 기준 이미지
}

async function* pngs(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* pngs(p);
    else if (/\.png$/i.test(entry.name)) yield p;
  }
}

export async function optimizeArt(outDir) {
  let before = 0;
  let after = 0;
  let count = 0;
  for await (const file of pngs(outDir)) {
    const input = await fs.readFile(file);
    const size = maxSize(path.basename(file));
    const output = await sharp(input)
      .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
      .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
      .toBuffer();
    before += input.length;
    if (output.length < input.length) {
      await fs.writeFile(file, output);
      after += output.length;
    } else {
      after += input.length;
    }
    count++;
  }
  const mb = (n) => (n / 1024 / 1024).toFixed(1);
  console.log(`\n[optimize-art] PNG ${count}장: ${mb(before)}MB → ${mb(after)}MB`);
}
