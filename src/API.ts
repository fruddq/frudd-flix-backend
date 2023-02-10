import axios from 'axios'
import { API_URL, API_CONFIG, requestDiscover } from './services/config.js'

export class API {
  constructor() {
    // @TODO Change this information depending on test or production
  }

  // @TODO ensure ENV functions as expcted
  // const config = { params: { api_key: process.env["API_KEY"] } }

  async fetchData(request: string) {
    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${request}`, API_CONFIG)
      return results
    } catch (err) {
      console.error(err)
    }
  }
}

// const api = new API()

// const test = await api.fetchData(requestDiscover)
// console.log(test)
