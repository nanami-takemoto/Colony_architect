import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages では https://<user>.github.io/<repo>/ で公開される
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/Colony_architect/',
});
