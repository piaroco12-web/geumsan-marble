import { defineConfig } from 'vite';
import { optimizeArt } from './scripts/optimize-art.js';

export default defineConfig({
  plugins: [
    {
      // npm run build 때만 dist/ 의 그림을 줄인다 (개발 서버는 원본 그대로)
      name: 'optimize-art',
      apply: 'build',
      closeBundle: () => optimizeArt('dist'),
    },
  ],
});
