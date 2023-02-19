import { genreList } from './config.js'

export const getValidGenres = (genres: number[]) => {
  return genres.filter((genreId) => !genreList.find((genre) => genre.id === genreId))
}
