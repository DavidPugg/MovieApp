export interface Movie {
    id: Number,
    poster_path: String,
    title: String,
    genre_ids: Number[],
    vote_average: Number,
    release_date: String,
    budget: Number,
    revenue: Number,
    runtime: Number,
    original_title: String
}

export interface Tv {
    id: Number,
    poster_path: String,
    name: String,
    genre_ids: Number[],
    vote_average: Number,
    first_air_date: String,
    number_of_seasons: Number,
    number_of_episodes: Number,
    episode_run_time: Number[]
}

export interface Video {
    key: String,
    id: Number,
    type: String
  }
