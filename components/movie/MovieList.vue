<template>
  <section class="movies">
    <div v-if="fetchState.pending" class="lds-ring loader">
      <div />
      <div />
      <div />
      <div />
    </div>
    <p v-if="checkItems && !fetchState.pending" class="text">
      No movies found!
    </p>
    <MovieItem
      v-for="item in items"
      v-else-if="!fetchState.pending"
      :id="item.id"
      :key="item.id"
      :poster="item.poster_path"
      :title="item.title"
      :genre="item.genre_ids"
      :rating="item.vote_average"
      :released="item.release_date"
    />
    <PageSelector
      v-if="!fetchState.pending && !checkItems"
      :pages="totalPages"
    />
  </section>
</template>

<script lang="ts">
import {
  ref,
  computed,
  watch,
  useRoute,
  useFetch,
  useContext,
  defineComponent
} from '@nuxtjs/composition-api'
import { Movie } from '~/interfaces/Movie'
export default defineComponent({
  setup () {
    const route = useRoute()
    const { $axios } = useContext()

    const items = ref<Movie[]>([])
    const totalPages = ref(null)

    const checkItems = computed(() => {
      return (typeof items === 'undefined' || items.value.length < 1)
    })

    watch(
      () => route.value,
      () => {
        fetch()
      }
    )

    const { fetch, fetchState } = useFetch(async ({ $route }) => {
      try {
        const { query } = $route
        let dummyItems
        if ($route.name === 'movies') {
          if (query.q) {
            dummyItems = await $axios.$get(
              `https://api.themoviedb.org/3/movie/${query.q}?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`
            )
          } else if (query.s) {
            dummyItems = await $axios.$get(
              `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&language=en-US&page=${query.page}&query=${query.s}`
            )
          } else {
            dummyItems = await $axios.$get(
              `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`
            )
          }
        } else if ($route.name === 'tvshows') {
          let i
          const results: Movie[] = []
          if (query.q) {
            i = await $axios.$get(
              `https://api.themoviedb.org/3/tv/${query.q}?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`
            )
          } else if (query.s) {
            i = await $axios.$get(
              `https://api.themoviedb.org/3/search/tv?api_key=${process.env.apiKey}&language=en-US&page=${query.page}&query=${query.s}`
            )
          } else {
            i = await $axios.$get(
              `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`
            )
          }
          i.results.forEach((item: any) => {
            results.push({
              ...item,
              title: item.name,
              release_date: item.first_air_date
            })
          })
          dummyItems = { total_pages: i.total_pages, results }
        } else {
          dummyItems = await $axios.$get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`
          )
        }
        items.value = dummyItems.results
        totalPages.value = dummyItems.total_pages
      } catch (err) {
        console.log(err)
      }
    })
    fetch()
    return { fetchState, checkItems, items, totalPages }
  }
})
</script>

<style lang="scss" scoped>
.movies {
  grid-column: main-start / main-end;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  justify-content: center;
  grid-gap: 2rem;

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
.loader,
.text {
  margin: 10rem auto;
}
</style>
