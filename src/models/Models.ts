export interface IMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IAPIResponse {
  data: {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
  }
}

interface IAPIConfigParams {
  api_key: string
  language?: string
  sort_by?: string
  include_adult?: boolean
  include_video?: boolean
  page?: number
  'primary_release_date.gte'?: string
  'primary_release_date.lte'?: string
  with_genres?: string
  query?: string
}

export interface IAPIConfig {
  params: IAPIConfigParams
  url: string
  method: string
}

export interface IFetchDataParams {
  from?: number | undefined
  to?: number | undefined
  genres?: number[] | undefined
  page?: number | undefined
}

export interface IMovieFromID extends IMovie {
  belongs_to_collection?: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget?: number
  genres?: { id: number; name: string }[]
  homepage?: string
  imdb_id?: string
  production_companies?: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries?: { iso_3166_1: string; name: string }[]
  revenue?: number
  runtime?: number
  spoken_languages?: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status?: string
  tagline?: string
}

export interface APIResponseFromID {
  data: IMovieFromID
}

export interface Itrailer {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface APIResponseTrailer {
  data: {
    results: Itrailer[]
  }
}
