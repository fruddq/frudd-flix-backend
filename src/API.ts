import axios from 'axios'
import dotenv from 'dotenv'
import lodash from 'lodash'

import type {
  APIResponseFromID,
  APIResponseTrailer,
  IAPIConfig,
  IAPIResponse,
  IFetchDataParams,
  IMovie,
} from './models/Models.js'

import { API_URL } from './services/config.js'
import { getValidGenres } from './services/getValidGenres.js'
import { getYouTubeKeys } from './services/getYoutubeKeys.js'

export class API {
  apiKey: string

  constructor() {
    dotenv.config()
    this.apiKey = process.env['API_KEY'] || ''

    if (this.apiKey === '') {
      throw new Error('Create .env in root folder and set valid API key')
    }
  }

  async fetchMovies({ from, to, genres, page }: IFetchDataParams = {}) {
    const currentYear = new Date().getFullYear()

    if ((from && from > currentYear) || (from && from < 1950)) {
      throw new Error('From can only be a number between 1950 to current year')
    }

    if ((to && to > currentYear) || (to && to < 1950)) {
      throw new Error('From can only be a number between 1950 to curent year')
    }

    if (genres && getValidGenres(genres).length > 0) {
      throw new Error('Genres must be a valid genre ID from genreList')
    }

    const genreIdsStr = genres?.join(',')

    const API_CONFIG: IAPIConfig = {
      url: `${API_URL}discover/movie`,
      method: 'get',
      params: {
        api_key: this.apiKey,
        language: 'en-US',
        sort_by: 'popularity.desc',
        include_adult: false,
        include_video: false,
        page: page ?? 1,
      },
    }

    if (from && to) {
      API_CONFIG.params['primary_release_date.gte'] = `${from}-01-01`
      API_CONFIG.params['primary_release_date.lte'] = `${to}-12-31`
    } else if (from) {
      API_CONFIG.params['primary_release_date.gte'] = `${from}-01-01`
    } else if (to) {
      API_CONFIG.params['primary_release_date.lte'] = `${to}-12-31`
    }

    if (genreIdsStr) {
      API_CONFIG.params.with_genres = genreIdsStr
    }

    const response: IAPIResponse = await axios(API_CONFIG)
    return response.data
  }

  async fetchMovieFromID(movieID: number): Promise<IMovie> {
    const API_CONFIG = {
      url: `https://api.themoviedb.org/3/movie/${movieID}`,
      method: 'get',
      params: {
        api_key: this.apiKey,
        append_to_response: 'release_date,videos',
      },
    }

    const response: APIResponseFromID = await axios(API_CONFIG)

    const {
      adult,
      backdrop_path,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      title,
      vote_average,
      vote_count,
      release_date,
      genres,
      video,
    } = response.data

    const resultFromID: IMovie = {
      adult,
      backdrop_path,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      title,
      vote_average,
      vote_count,
      release_date,
      genre_ids: lodash.map(genres, 'id'),
      video,
    }

    return resultFromID
  }

  async fetchMoviesFromSearch({ query, page }: { query: string; page: number }) {
    const API_CONFIG: IAPIConfig = {
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'get',
      params: {
        api_key: this.apiKey,
        include_adult: false,
        query,
        page,
      },
    }

    const response: IAPIResponse = await axios(API_CONFIG)
    return response.data
  }

  async fetchMovieTrailers(movieId: number) {
    const API_CONFIG: IAPIConfig = {
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      method: 'get',
      params: {
        api_key: this.apiKey,
      },
    }

    const response: APIResponseTrailer = await axios(API_CONFIG)
    return getYouTubeKeys(response.data.results)
  }
}
