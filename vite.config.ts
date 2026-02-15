import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages では https://<user>.github.io/<repo>/ で公開される
export default defineConfig({
  plugins: [react()],
  base: '/Colony_architect/',
});
