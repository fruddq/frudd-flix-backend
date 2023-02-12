import axios from 'axios'
import type { IAPIResponse, IMovie } from './models/Models.js'
import { API_URL } from './services/config.js'
import dotenv from 'dotenv'

export class API {
  constructor() {
    dotenv.config()
  }

  async fetchData() {
    const API_CONFIG = { params: { api_key: process.env['API_KEY'] } }

    try {
      const response: IAPIResponse = await axios.get(API_URL, API_CONFIG)
      const results = response.data.results as IMovie[]
      return results
    } catch (err) {
      console.error(err)
      return []
    }
  }
}

// const API_URL2 =
//   'https://api.themoviedb.org/3/discover/movie?api_key=edfb4a11c2c5f2ff5f3e1ef08db80649&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&primary_release_date.gte=2021-01-01&primary_release_date.lte=2022-12-31&with_genres=35,18'
// // const API_URL =
// const api = new API()

// const test = await api.fetchData()
// console.log(test)

// const test = await axios.get(API_URL2)
// console.log(test.data.results)

// const API_URL = 'https://api.themoviedb.org/3/discover/movie'

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

// Then you can make the API request like this:

// const response: IAPIResponse = await axios.get(API_URL, API_CONFIG)
