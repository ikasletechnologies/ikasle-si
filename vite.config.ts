import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { agentApi } from './server/agent.ts'
import { contactApi } from './server/contact.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // OPENAI_API_KEY stays server-side and is never exposed in the browser bundle.
    agentApi(loadEnv(mode, process.cwd(), '')),
    contactApi(loadEnv(mode, process.cwd(), '')),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3051,
  },
  preview: {
    host: true,
    port: 3051,
  },
}))

