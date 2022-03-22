<template>
  <div v-if="!fetchState.pending" class="container">
    <div class="content">
      <h1 class="title heading-1">
        {{ name }}
      </h1>
      <div class="movies">
        <ActorMovieItem
          v-for="item in items.cast"
          :key="item.id"
          :movie="item"
        />
      </div>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import {
  computed,
  ref,
  useContext,
  useFetch,
  useRoute,
  useRouter
} from '@nuxtjs/composition-api'
export default {
  layout: 'noNavbar',

  setup () {
    const { $axios } = useContext()
    const router = useRouter()
    const route = useRoute()
    const { query, params } = route.value
    const items = ref([])

    const name = computed(() => {
      return query.t === 'tv' ? 'Tv shows' : 'Movies'
    })

    const openVideo = (id) => {
      router.push(`${route.value.path}/${id}`)
    }

    const { fetch, fetchState } = useFetch(async () => {
      if (query.t == 'movies') {
        items.value = await $axios.$get(
          `https://api.themoviedb.org/3/person/${params.actorId}/movie_credits?api_key=${process.env.apiKey}&language=en-US`
        )
      } else {
        items.value = await $axios.$get(
          `https://api.themoviedb.org/3/person/${params.actorId}/tv_credits?api_key=${process.env.apiKey}&language=en-US`
        )
      }
    })
    fetch()
    return { items, name, openVideo, fetchState }
  }
}
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
