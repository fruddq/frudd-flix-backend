import axios from 'axios'
import type { IAPIConfig, IAPIResponse, IFetchDataParams } from './models/Models.js'
import { API_URL, genreList } from './services/config.js'
import dotenv from 'dotenv'

export class API {
  apiKey: string

  constructor() {
    dotenv.config()
    this.apiKey = process.env['API_KEY'] || ''

    if (this.apiKey === '') {
      throw new Error('Create .env in root folder and set valid API key')
    }
  }

  async fetchData({ from, to, genres, page, movieID }: IFetchDataParams = {}) {
    if (movieID) {
      const API_CONFIG = {
        url: `https://api.themoviedb.org/3/movie/${movieID}`,
        method: 'get',
        params: {
          api_key: this.apiKey,
        },
      }

      try {
        const response: IAPIResponse = await axios(API_CONFIG)
        return response.data
      } catch (err) {
        console.error(err)
        return []
      }
    }

    if ((from && from > 2023) || (from && from < 1950)) {
      throw new Error('From can only be a number between 1950 to 2023')
    }

    if ((to && to > 2023) || (to && to < 1950)) {
      throw new Error('From can only be a number between 1950 to 2023')
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

    try {
      const response: IAPIResponse = await axios(API_CONFIG)
      return response.data
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

// const api = new API()

// const request = { movieID: 505642 }
// const test = await api.fetchData(request)
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

// const API_URL3 = 'https://api.themoviedb.org/3/movie/'
// const config3 = {
//   url: https://api.themoviedb.org/3/movie/ + 505642,
//   method: 'get',
//   params: {
//     api_key: 'edfb4a11c2c5f2ff5f3e1ef08db80649',
//   },
// }

// const test3 = await axios(config3)
// console.log(test3.data)
