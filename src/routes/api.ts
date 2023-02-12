import axios from 'axios'
import express from 'express'
import { API } from '../API.js'

export const router = express.Router()

const api = new API()

router.get('/home', async (_req, res) => {
  const results = await api.fetchData()
  res.send(results)
})

router.get('/browse', (req, res) => {
  const from = Number(req.query['from'])
  const to = Number(req.query['to'])
  const genres = req.query['genres']
  console.log(genres)
  res.send(`${from}, ${to}, and ${genres} `)
})

export const fetchFrontEnd = async (from: number, to: number, genres: string) => {
  try {
    const response = await axios.get('http://localhost:3000/browse', {
      params: {
        from,
        to,
        genres,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
;(async () => {
  console.log(await fetchFrontEnd(2022, 2023, '1,2,3'))
})()
