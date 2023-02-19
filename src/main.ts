import Fastify from 'fastify'
import cors from '@fastify/cors'

import { fileURLToPath } from 'node:url'
import path from 'node:path'

import { FRONTEND_URL } from './services/config.js'
import { initiateRoutes } from './routes/api.js'

export type App = typeof app

const app = Fastify({
  logger: true,
})

// await app.register(import('@fastify/compress'), { global: true })

await app.register(cors, {
  origin: [FRONTEND_URL, 'https://www.youtube.com', `https://${process.env['FLY_APP_NAME']}.fly.dev`],
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root =
  process.env['NODE_ENV'] === 'production' ? path.join(__dirname, '../public') : path.join(__dirname, '../dist/public')

await app.register(import('@fastify/static'), {
  root,
})

initiateRoutes(app)

await app.listen({ port: parseInt(process.env['PORT'] || '', 10) || 3000 })
