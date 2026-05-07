import { defineConfig } from 'vitest/config'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),

  ], 
  test: {      
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}']}
})
