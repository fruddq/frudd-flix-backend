import express from 'express'
import { API } from '../API.js'
import { requestDiscover } from '../services/config.js'

export const router = express.Router()

const api = new API()

router.get('/home', async (_req, res) => {
  const results = await api.fetchData(requestDiscover)
  res.send(results)
})

// router.get('/test', async (_req, res) => {
//   const results = await api.fetchData(requestDiscover)
//   res.send(results)
// })
