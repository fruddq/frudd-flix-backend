import express from 'express'
import { router } from './routes/api.js'
import cors from 'cors'
import { FRONTEND_URL } from './services/config.js'

const app = express()

app.use(
  cors({
    origin: [FRONTEND_URL, 'https://www.youtube.com'],
  }),
)

app.use('/', router)

const port = process.env['PORT'] || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
