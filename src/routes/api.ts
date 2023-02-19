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
  const page = req.query['page'] ? Number(req.query['page']) : undefined
  const results = await api.fetchMovies({ page })

  res.send(results)
})

router.get('/browse', async (req, res) => {
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
