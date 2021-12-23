<template>
  <main class="container">
    <Dropdown class="dropdown" :items="showLinks" />
    <MovieList />
  </main>
</template>

<script>
export default {
  data() {
    return {
      showLinks: [
        {
          name: "Popular",
          value: "popular",
        },
        {
          name: "Latest",
          value: "latest",
        },
        {
          name: "Airing Today",
          value: "airing_today",
        },
        {
          name: "On the air",
          value: "on_the_air",
        },
        {
          name: "Top rated",
          value: "top_rated",
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
