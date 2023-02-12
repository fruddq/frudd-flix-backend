import express from 'express'
import { router } from './routes/api.js'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
  }),
)

app.use('/', router)

const port = process.env['PORT'] || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
