import express from 'express'
import { router } from './routes/api.js'

const app = express()

app.use('/', router)

const port = process.env['PORT'] || 3000

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
