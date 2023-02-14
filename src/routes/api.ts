// import axios from 'axios'
import express from 'express'
import { API } from '../API.js'

export const router = express.Router()

const api = new API()

// router.get('/home', async (_req, res) => {
//   const results = await api.fetchData()
//   res.send(results)
// })

router.get('/', async (req, res) => {
  const from = req.query['from'] ? Number(req.query['from']) : undefined
  const to = req.query['to'] ? Number(req.query['to']) : undefined
  const page = req.query['page'] ? Number(req.query['page']) : undefined
  let genres: number[] | undefined

  const stringGenres = req.query['genres']
    ? Array.isArray(req.query['genres'])
      ? req.query['genres']
      : [req.query['genres']]
    : undefined

  if (Array.isArray(stringGenres)) {
    genres = stringGenres.map(Number)
  }

  const results = await api.fetchData({ from, to, genres, page })
  res.send(results)
})

// export const fetchFrontEnd = async ({
//   from,
//   to,
//   genres,
//   page,
// }: {
//   readonly from?: number
//   readonly to?: number
//   readonly genres?: number[]
//   readonly page?: number
// }) => {
//   try {
//     const response = await axios.get('http://localhost:3000/', {
//       params: {
//         from,
//         to,
//         genres,
//         page,
//       },
//     })
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }
// ;(async () => {
//   const request = {
//     from: 2023,
//     to: 2023,
//     // genres: [37],
//   }
//   console.log(await fetchFrontEnd(request))
// })()
