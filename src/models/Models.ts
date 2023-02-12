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
}

export interface IAPIConfig {
  params: IAPIConfigParams
  url: string
  method: string
}

export interface IFetchDataParams {
  from?: number
  to?: number
  genres?: number[]
  page?: number
}
