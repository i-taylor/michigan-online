import { defineConfig } from 'vite'
import { resolve } from 'path'
import { globSync } from 'glob'

export default defineConfig({
  root: 'cookbook',
  css: {
    preprocessorOptions: {
      less: {}
    }
  },
  server: {
    open: true
  },
  build: {
    outDir: '../build/cookbook',
    emptyOutDir: true,
    rolldownOptions: {
      input: Object.fromEntries(
        globSync('cookbook/**/*.html').map(file => [
          file.replace('cookbook/', '').replace('.html', ''),
          resolve(__dirname, file)
        ])
      )
    }
  }
})
