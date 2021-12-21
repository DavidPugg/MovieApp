<template>
  <div class="container">
    <div class="content">
      <h1 class="title heading-1">{{ name }}</h1>
      <div class="movies">
        <ActorMovieItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: "noNavbar",

  computed: {
    name() {
      return this.$route.query.t === "tv" ? "Tv shows" : "Movies";
    },
  },

  async asyncData({ $axios, params, query }) {
    let movies;
    if (query.t == "movies") {
      movies = await $axios.$get(
        `https://api.themoviedb.org/3/person/${params.actorId}/movie_credits?api_key=${process.env.apiKey}&language=en-US`
      );
    } else {
      movies = await $axios.$get(
        `https://api.themoviedb.org/3/person/${params.actorId}/tv_credits?api_key=${process.env.apiKey}&language=en-US`
      );
    }
    return { movies: movies.cast };
  },

  methods: {
    openVideo(id) {
      this.$router.push(`${this.$route.path}/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10rem 0;
  grid-column: main-start / main-end;
}

.title {
  line-height: 1;
  border-bottom: 1px solid $color-primary-light;
  padding-bottom: 1rem;
}

.movies {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  justify-items: center;
  grid-column-gap: 0.5rem;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}
</style>
