<template>
  <div class="container">
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
export default {
  layout: "noNavbar",

  async asyncData({ $axios, params }) {
    const credits = await $axios.$get(
      `https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=${process.env.apiKey}&language=en-US`
    );
    return { cast: credits.cast };
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
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  margin-top: 2rem;
}

</style>
