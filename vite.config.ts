import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from './src/plugins/svgBuilder'; 
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [vue(),svgBuilder('./src/icons/')],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    },
    extensions: ['.js', '.ts', '.json']
  },
})
