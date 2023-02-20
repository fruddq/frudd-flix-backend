import { API } from '../API.js'
import type { App } from '../main.js'
import httpErrors from 'http-errors'
import { createBrotliCompress } from 'zlib'

const api = new API()

const API_PREFIX = '/api/v1'

export const initiateRoutes = (app: App) => {
  app.route({
    method: 'GET',
    url: `${API_PREFIX}/id`,

    handler: async function (req, reply) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const query = req.query as any as {
        readonly movieID?: string
      }
      const movieID = query.movieID ? Number(query.movieID) : undefined

      if (!movieID) {
        throw new httpErrors.BadRequest('Must send in a valid movie ID')
      }

      reply.send(await api.fetchMovieFromID(movieID))
    },
  })

  app.route({
    method: 'GET',
    url: `${API_PREFIX}/trailers`,
    handler: async function (req, reply) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const query = req.query as any as {
        readonly movieID?: string
      }

      const movieID = query.movieID ? Number(query.movieID) : undefined

      if (!movieID) {
        throw new httpErrors.BadRequest('Must send in a valid movie ID')
      }

      reply.send(await api.fetchMovieTrailers(movieID))
    },
  })

  app.route({
    method: 'GET',
    url: `${API_PREFIX}/search`,
    handler: async function (req, reply) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const q = req.query as any as {
        readonly page?: string
        readonly query?: string
      }

      if (!q.query) {
        throw new httpErrors.BadRequest('Must send in a valid query')
      }

      const page = q.page ? Number(q.page) : 1
      reply.send(await api.fetchMoviesFromSearch({ query: q.query, page }))
    },
  })

  app.route({
    method: 'GET',
    url: `${API_PREFIX}/discover`,

    handler: async function (req, reply) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const query = req.query as any as {
        readonly page?: string
      }

      const page = query.page ? Number(query.page) : undefined

      reply.send(await api.fetchMovies({ page }))
    },
  })

  app.route({
    method: 'GET',
    url: `${API_PREFIX}/browse`,
    handler: async function (req, reply) {
      // rome-ignore lint/suspicious/noExplicitAny: <explanation>
      const query = req.query as any as {
        readonly from?: string
        readonly to?: string
        readonly page?: string
        readonly 'genres[]': string
      }

      const from = query.from ? Number(query.from) : undefined
      const to = query.to ? Number(query.to) : undefined
      const page = query.page ? Number(query.page) : undefined
      const stringGenres = query['genres[]']

      let genres: number[] | undefined

      if (stringGenres) {
        const arrGenres = Array.isArray(stringGenres) ? stringGenres : [stringGenres]
        genres = arrGenres.map((genre) => Number(genre))
      }

      reply.send(await api.fetchMovies({ from, to, genres, page }))
    },
  })

  app.route({
    method: 'GET',
    url: `${API_PREFIX}/test`,
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            subDomain: { type: 'string' },
          },
        },
      },
    },
    handler: function (__req, reply) {
      reply.send({
        subDomain: process.env['FLY_APP_NAME'] || 'unknown',
      })
    },
  })
}
