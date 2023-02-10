import dotenv from 'dotenv'
dotenv.config()

export const API_URL = 'https://api.themoviedb.org/3'
export const API_CONFIG = { params: { api_key: process.env['API_KEY'] } }
export const requestDiscover = 'discover/movie'
