import type { Itrailer } from '../models/Models'

export const getYouTubeKeys = (videos: Itrailer[]) =>
  videos.filter((video) => video.site === 'YouTube').map((video) => video.key)
