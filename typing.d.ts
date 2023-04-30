export interface Genre {
    id: number
    name: string
  }
  
  export interface Movie {
    adult:boolean
    video:boolean
    title: string
    backdrop_path: string
    media_type?: string
    release_date?: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    vote_average: number
    vote_count: number
  }

  export interface Url{
    page: number
    results: Movie[],
    total_pages :number
    total_results: number
  }