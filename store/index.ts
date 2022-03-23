import { Store } from "vuex";

const createStore = () => {
  return new Store({
    state: {
      movieGenres: [],
      tvGenres: [],
      totalPages: null,
    },
    mutations: {},
    actions: {
      async nuxtServerInit({ dispatch }) {
        await dispatch("setGenres");
      },
      async setGenres({ state }) {
        const movieGenres = await this.$axios.$get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.apiKey}&language=en-US`
        );
        const tvGenres = await this.$axios.$get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.apiKey}&language=en-US`
        );
        state.movieGenres = movieGenres.genres;
        state.tvGenres = tvGenres.genres;
      },
      setTotalPages({ state }, payload) {
        state.totalPages = payload;
      },
    },
    getters: {
      getMovieGenres(state) {
        return state.movieGenres;
      },
      getTvGenres(state) {
        return state.tvGenres;
      },
      totalPages(state) {
        return state.totalPages;
      },
    },
  });
};

export default createStore;
