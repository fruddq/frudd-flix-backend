import axios from 'axios'
import lodash from 'lodash'
import type {
  APIResponseFromID,
  APIResponseTrailer,
  IAPIConfig,
  IAPIResponse,
  IFetchDataParams,
  IMovie,
} from './models/Models.js'
import { API_URL, genreList } from './services/config.js'
import dotenv from 'dotenv'
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

    let genreIdsStr: string | undefined
    if (genres) {
      const invalidGenres = genres.filter((genreId) => !genreList.find((genre) => genre.id === genreId))
      if (invalidGenres.length > 0) {
        throw new Error('Genres must be a valid genre ID from genreList')
      }
      genreIdsStr = genres.join(',')
    }

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

// const api = new API()

// const request = { from: 2023, to: 2023, page: 1, genres: [28] }
// const test = await api.fetchMovies(request)
// console.log(test)

// const API_URL2 =
//   'https://api.themoviedb.org/4/discover/movie?api_key=edfb4a11c2c5f2ff5f3e1ef08db80649&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31&with_genres=28,18'
// const test2 = await axios.get(API_URL2)
// console.log(test2.data.results[0])

// const API_URL3 = 'https://api.themoviedb.org/4/discover/movie'
// const year = 2023
// const config3 = {
//   url: API_URL3,
//   method: 'get',
//   // headers: {
//   //   Authorization: 'Bearer edfb4a11c2c5f2ff5f3e1ef08db80649',
//   // },
//   params: {
//     api_key: 'edfb4a11c2c5f2ff5f3e1ef08db80649',
//     language: 'en-US',
//     sort_by: 'popularity.desc',
//     include_adult: false,
//     include_video: true,
//     page: 1,
//     'primary_release_date.gte': `${year}-01-01`,
//     'primary_release_date.lte': `${year}-12-31`,
//     with_genres: '28,18',
//   },
// }

// console.log(config3)
// const test3 = await axios(config3)
// const responseURL =
//   'https://api.themoviedb.org/4/discover/movie?api_key=edfb4a11c2c5f2ff5f3e1ef08db80649&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&primary_release_date[gte]=2023-01-01&primary_release_date[lte]=2023-12-31&with_genres=35,18'
// // console.log(responseURL)
// // console.log(API_URL2)
// console.log(test3.data.results[0])

// const API_CONFIG = {
// params: {
// api_key: process.env['API_KEY'] ,
// language: 'en-US',
// sort_by: 'popularity.desc',
// include_adult: false,
// include_video: false,
// page: 1,
// primary_release_date: {
// gte: '2021-01-01',
// lte: '2022-12-31',
// },
// with_genres: '35,18',
// },
// }

// const response: IAPIResponse = await axios.get(API_URL, API_CONFIG)

// const API_URL3 = 'https://api.themoviedb.org/3/search/movie'
// const config3 = {
//   url: API_URL3,
//   method: 'get',
//   params: {
//     api_key: 'edfb4a11c2c5f2ff5f3e1ef08db80649',
//     include_adult: false,
//     query: 'spiderman',
//     page: 2,
//   },
// }

// const test3 = await axios(config3)
// console.log(test3.data.page)
