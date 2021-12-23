<template>
  <section class="movies">
    <div v-if="$fetchState.pending" class="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p v-if="checkItems && !$fetchState.pending" class="text">
      No movies found!
    </p>
    <div class="list" v-else-if="!$fetchState.pending">
      <SortDropdown/>
      <MovieItem
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :poster="item.poster_path"
        :title="item.title"
        :genre="item.genre_ids"
        :rating="item.vote_average"
        :released="item.release_date"
      />
      <PageSelector
        v-if="!$fetchState.pending && !checkItems"
        :pages="totalPages"
      />
    </div>
  </section>
</template>

<script>
export default {
  watch: {
    "$route.query": "$fetch",
  },

  data() {
    return {
      items: [],
      totalPages: null,
    };
  },

  computed: {
    page() {
      return this.$route.query.page ? this.$route.query.page : 1;
    },
    checkItems() {
      return typeof this.items === "undefined" || this.items.length < 1
        ? true
        : false;
    },
  },

  async fetch() {
    try {
      let items;
      if (this.$route.name === "movies") {
        if (this.$route.query.q) {
          items = await this.$axios.$get(
            `https://api.themoviedb.org/3/movie/${this.$route.query.q}?api_key=${process.env.apiKey}&language=en-US&page=${this.page}`
          );
        } else if (this.$route.query.s) {
          items = await this.$axios.$get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&language=en-US&page=${this.$route.query.page}&query=${this.$route.query.s}`
          );
        } else {
          items = await this.$axios.$get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${this.$route.query.page}`
          );
        }
      } else if (this.$route.name === "tvshows") {
        let i;
        let results = [];
        if (this.$route.query.q) {
          i = await this.$axios.$get(
            `https://api.themoviedb.org/3/tv/${this.$route.query.q}?api_key=${process.env.apiKey}&language=en-US&page=${this.page}`
          );
        } else if (this.$route.query.s) {
          i = await this.$axios.$get(
            `https://api.themoviedb.org/3/search/tv?api_key=${process.env.apiKey}&language=en-US&page=${this.$route.query.page}&query=${this.$route.query.s}`
          );
        } else {
          i = await this.$axios.$get(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apiKey}&language=en-US&page=${this.$route.query.page}`
          );
        }
        i.results.forEach((item) => {
          results.push({
            ...item,
            title: item.name,
            release_date: item.first_air_date,
          });
        });
        items = { total_pages: i.total_pages, results };
      } else {
        items = await this.$axios.$get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${this.$route.query.page}`
        );
      }
      this.items = items.results;
      this.totalPages = items.total_pages;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.movies {
  grid-column: main-start / main-end;

  display: flex;
  justify-content: center;

  line-height: 1;
  margin-bottom: 10rem;

  &:hover > *:not(:hover) {
    z-index: 1000;
  }
}

.text {
  grid-column: 1 / -1;

  color: #fff;
  text-transform: uppercase;
  font-size: 5rem;
  align-self: flex-start;
  justify-self: center;
}

.list {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  justify-content: center;
  grid-gap: 2rem;
}
</style>
