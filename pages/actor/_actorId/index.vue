<template>
  <div v-if="!fetchState.pending" class="container">
    <div class="content">
      <div class="head">
        <h2 class="heading-1 head__title">
          {{ actor.name }}
        </h2>
        <div class="head__popularity-box">
          <p><b>Popularity</b></p>
          <p class="head__popularity">
            #{{ Math.round(actor.popularity) }}
          </p>
        </div>
      </div>
      <div class="gallery">
        <img
          class="gallery__img"
          :src="`https://image.tmdb.org/t/p/w400${actor.profile_path}`"
          alt="Actor profile"
        >
      </div>
      <div class="details">
        <p
          v-if="actor.biography"
          class="details__biography"
          v-html="actor.biography"
        />
        <p v-else class="details__biography">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem repellat
          numquam autem ullam repudiandae velit, nobis animi quaerat pariatur
          fugiat dolor laborum in eum. Esse labore asperiores harum neque
          laboriosam. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Dicta labore, sed, ab suscipit in corrupti corporis earum distinctio
          quibusdam minus repellendus veritatis velit. Ullam molestias totam,
          beatae et deserunt eos.
        </p>
        <div class="details__birth">
          <p><b>Birthday: </b>{{ actor.birthday }}</p>
          <p>
            <b>Death: </b><span :style="{ color: actor.deathday ? 'red' : 'lime' }">{{
              actor.deathday ? actor.deathday : "Alive"
            }}</span>
          </p>
        </div>
      </div>
      <div v-if="movies.cast.length > 0" class="movies">
        <h2 class="heading-2 movies__title">
          Movies
        </h2>
        <div class="movies-list">
          <ActorMovieItem
            v-for="movie in movies.cast.slice(0, 5)"
            :key="movie.id"
            :movie="movie"
          />
        </div>
        <ShowMoreButton
          :go-to="{ path: `${$route.path}/movies`, query: { t: 'movies' } }"
        />
      </div>
      <div v-if="tv.cast.length > 0" class="tv">
        <h2 class="heading-2 tv__title">
          Tv shows
        </h2>
        <div class="tv-list">
          <ActorMovieItem
            v-for="show in tv.cast.slice(0, 5)"
            :key="show.id"
            :movie="show"
          />
        </div>
        <ShowMoreButton
          :go-to="{ path: `${$route.path}/movies`, query: { t: 'tv' } }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useContext, useFetch, ref } from '@nuxtjs/composition-api'
export default {
  layout: 'noNavbar',

  setup () {
    const { $axios } = useContext()
    const actor = ref({})
    const movies = ref({})
    const tv = ref({})

    const { fetch, fetchState } = useFetch(async ({ $route }) => {
      actor.value = await $axios.$get(
        `https://api.themoviedb.org/3/person/${$route.params.actorId}?api_key=${process.env.apiKey}&language=en-US`
      )

      movies.value = await $axios.$get(
        `https://api.themoviedb.org/3/person/${$route.params.actorId}/movie_credits?api_key=${process.env.apiKey}&language=en-US`
      )

      tv.value = await $axios.$get(
        `https://api.themoviedb.org/3/person/${$route.params.actorId}/tv_credits?api_key=${process.env.apiKey}&language=en-US`
      )
    })

    fetch()
    return { actor, movies, tv, fetchState }
  }
}
</script>

<style lang="scss" scoped>
.content {
  grid-column: main-start / main-end;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content;
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
}

.head {
  grid-column: span 4;
  display: flex;
  justify-content: space-between;

  &__title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  &__popularity-box {
    flex: 0 0 10%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p:first-child {
      text-transform: uppercase;
      color: white;
      font-size: 1.4rem;
    }
  }

  &__popularity {
    border: none;
    color: transparent;
    line-height: 1;

    font-weight: 600;
    font-size: 3rem;
    background-image: linear-gradient(
      to right bottom,
      $color-primary-light,
      $color-primary-dark
    );
    background-clip: text;
  }
}

.gallery {
  grid-column: span 1;
  grid-row: span 2;

  display: flex;
  flex-direction: column;

  &__img {
    width: 100%;
    border-radius: $border-radius-medium;
    max-width: 30rem;

    @media only screen and (max-width: $size-medium) {
      margin: 0 auto;
    }
  }

  @media only screen and (max-width: $size-medium) {
    grid-column: 1 / -1;
  }
}

.details {
  grid-column: span 3;
  grid-row: span 2;
  color: white;
  font-size: 1.6rem;

  display: flex;
  flex-direction: column;

  &__biography {
    padding-bottom: 2rem;
    flex: 1;
  }

  &__birth {
    border-top: 1px solid $color-primary-light;
    display: flex;
    padding: 2rem;

    p {
      flex: 0 0 50%;
      text-align: center;
    }
  }

  @media only screen and (max-width: $size-medium) {
    grid-column: 1 / -1;
    text-align: center;
  }
}

.movies,
.tv {
  grid-column: 1 / -1;

  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-row-gap: 2rem;

  margin-top: 3rem;

  &__title {
    line-height: 1;
    border-bottom: 1px solid $color-primary-light;
    padding-bottom: 1rem;
  }

  &-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    justify-items: center;
  }
}
</style>
