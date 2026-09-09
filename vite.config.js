import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react';

// Served from https://<short-domain>/quiz/, so every emitted asset URL needs
// that prefix. Overridable with BASE_PATH (must start and end with "/").
const base = process.env.BASE_PATH || '/quiz/';

// Output into build/quiz and publish build/ from Netlify, so the files sit on
// disk at the same paths they are served from. The Cloudflare worker in front
// then forwards requests without rewriting them, and quizton.netlify.app/quiz/
// serves the identical page — useful when something looks wrong and you need
// to tell "the app is broken" apart from "the proxy is broken".
const outDir = path.posix.join('build', base);

export default defineConfig(() => {
  return {
    base,
    build: {
      outDir,
      emptyOutDir: true,
    },
    plugins: [react()],
  };
});
