<template>
  <main class="container">
    <Dropdown class="dropdown" :items="movieLinks" />
    <MovieList />
  </main>
</template>

<script>
export default {
  data() {
    return {
      movieLinks: [
        {
          name: "Popular",
          value: "popular",
        },
        {
          name: "Latest",
          value: "latest",
        },
        {
          name: "Top rated",
          value: "top_rated",
        },
        {
          name: "Now playing",
          value: "now_playing",
        },
        {
          name: "Upcoming",
          value: "upcoming",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  grid-row-gap: 2rem;
}

.dropdown {
  grid-column: main-start / main-end;
}
</style>
