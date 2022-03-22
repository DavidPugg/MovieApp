<template>
  <NuxtLink class="movie" :to="{ path: `/title/${isMovie}/${movie.id}` }">
    <img
      class="movie__img"
      :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
      alt="Movie img"
    >
    <h3 class="movie__title">
      {{ name }}
    </h3>
  </NuxtLink>
</template>

<script>
import { computed } from '@nuxtjs/composition-api'
export default {
  props: ['movie'],
  setup ({ movie }) {
    const name = computed(() => {
      return movie.title ? movie.title : movie.name
    })
    const isMovie = computed(() => {
      return movie.title ? 'movie' : 'tv'
    })
    return { name, isMovie }
  }
}
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
