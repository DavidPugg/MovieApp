<template>
  <NuxtLink class="movie" :to="{ path: `/${isMovie}/${movie.id}` }">
    <img
      class="movie__img"
      :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
      alt="Movie img"
    />
    <h3 class="movie__title">{{ name }}</h3>
  </NuxtLink>
</template>

<script>
export default {
  props: ["movie"],

  computed: {
    name() {
      return this.movie.title ? this.movie.title : this.movie.name
    },
    isMovie() {
      return this.movie.title ? 'movie' : 'show'
    }
  }
};
</script>

<style scoped lang="scss">
.movie {
  display: flex;
  flex-direction: column;
  text-align: center;
  text-decoration: none;
  backface-visibility: hidden;
  transition: all 0.2s ease-out;

  &__img {
    height: 20rem;
    width: auto;
    border-radius: $border-radius-medium;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.6rem;
    color: white;
  }

  

  &:hover {
    transform: translateY(-3px) scale(1.03);
  }
}
</style>
