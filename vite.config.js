import { resolve } from 'path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        uploadEventImages: resolve(__dirname, 'upload-event-images.html'),
        upload: resolve(__dirname, 'upload.html'),
      },
    },
  },
})
