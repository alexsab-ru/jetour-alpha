import { defineConfig } from 'vite'
import path from "path";
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '',
  build: {
    outDir: path.resolve(__dirname, 'docs'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        cars: path.resolve(__dirname, 'cars/index.html'),
        error: path.resolve(__dirname, '404.html')
      }
    }
  },
  plugins: [vue()],
})
