// import axios from 'axios'
import express from 'express'
import { API } from '../API.js'

export const router = express.Router()

const api = new API()

router.get('/id', async (req, res) => {
  const results = await api.fetchMovieFromID(Number(req.query['movieID']))
  res.send(results)
})

router.get('/trailers', async (req, res) => {
  const results = await api.fetchMovieTrailers(Number(req.query['movieID']))
  res.send(results)
})

router.get('/search', async (req, res) => {
  const query = req.query['query'] as string
  const page = Number(req.query['page'])
  const results = await api.fetchMoviesFromSearch({ query, page })

  res.send(results)
})

router.get('/discover', async (req, res) => {
  const from = req.query['from'] ? Number(req.query['from']) : undefined
  const to = req.query['to'] ? Number(req.query['to']) : undefined
  const page = req.query['page'] ? Number(req.query['page']) : undefined

  const stringGenres = req.query['genres']
  let genres: number[] | undefined

  if (stringGenres) {
    const arrGenres = Array.isArray(stringGenres) ? stringGenres : [stringGenres]
    genres = arrGenres.map((genre) => Number(genre))
  }

  const results = await api.fetchMovies({ from, to, genres, page })

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

// export const fetchFrontEnd1 = async (movieID: number) => {
//   try {
//     const response = await axios.get('http://localhost:3000/id', {
//       params: {
//         movieID,
//       },
//     })

//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }
// ;(async () => {
//   const request = 505642
//   const test = await fetchFrontEnd1(request)
//   console.log(test)
// })()

// export const fetchFrontEnd2 = async (movieID: number) => {
//   try {
//     const response = await axios.get('http://localhost:3000/trailers', {
//       params: {
//         movieID,
//       },
//     })

//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }
// ;(async () => {
//   const request = 77930
//   const test = await fetchFrontEnd2(request)
//   console.log(test)
// })()
