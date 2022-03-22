<template>
  <div class="container" v-if="!fetchState.pending">
    <div class="content">
      <h1 class="title heading-1">Cast</h1>
      <div class="cast">
        <ActorItemBig v-for="actor in cast" :key="actor.id" :actor="actor" />
      </div>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import { ref, useFetch } from "@nuxtjs/composition-api";
export default {
  layout: "noNavbar",

  setup() {
    const cast = ref();
    const { fetch, fetchState } = useFetch(async ({ $axios, $route }) => {
      const credits = await $axios.$get(
        `https://api.themoviedb.org/3/${$route.params.type}/${$route.params.id}/credits?api_key=${process.env.apiKey}&language=en-US`
      );
      cast.value = credits.cast;
    });
    fetch();
    return { cast, fetchState };
  },
};
</script>

<style lang="scss" scoped>
.title {
  line-height: 1;
  border-bottom: 1px solid $color-primary-light;
  padding-bottom: 1rem;
}

.cast {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}
</style>
