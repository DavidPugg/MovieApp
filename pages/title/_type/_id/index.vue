<template>
  <div
    v-if="!fetchState.pending"
    class="backdrop container"
    :style="{
      'background-image': `linear-gradient(to right bottom, rgba(0,0,0, .85), rgba(0,0,0, .85)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
    }"
  >
    <div class="content">
      <div class="head">
        <h2 class="head__title heading-1">
          <span class="head__title-main">{{ title }}</span>
          <span
            class="head__title-genre"
            v-for="genre in movie.genres"
            :key="genre.id"
            >{{ genre.name }}</span
          >
        </h2>
        <div class="head__rating-box">
          <p><b>Rating</b></p>
          <p class="head__rating">{{ movie.vote_average }}</p>
        </div>
      </div>
      <div class="details">
        <p class="details__overview" v-if="movie.overview">
          {{ movie.overview }}
        </p>
        <p class="details__overview" v-else>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          at fugiat blanditiis dignissimos inventore doloremque harum hic magnam
          quod tempore, laboriosam, similique repellat? Illo voluptatem animi
          obcaecati quidem blanditiis! Autem.
        </p>
        <div class="details__stats">
          <p class="details__budget">
            <b>{{ statOneText }}</b>
            {{ statOne }}
          </p>
          <p class="details__revenue">
            <b>{{ statTwoText }}</b> {{ statTwo }}
          </p>
          <p class="details__runtime"><b>Runtime: </b> {{ statThree }}min</p>
        </div>
      </div>
      <div class="gallery" v-if="trailer">
        <iframe
          class="gallery__video"
          :src="`https://www.youtube.com/embed/${trailer.key}`"
        >
        </iframe>
        <NuxtLink class="gallery__button" :to="`${$route.path}/gallery`"
          >Videos</NuxtLink
        >
      </div>
      <div class="poster" v-else>
        <img
          class="img"
          :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`"
          alt="Poster"
        />
      </div>
      <div class="cast">
        <h2 class="heading-2 cast__title">Cast</h2>
        <div class="actors">
          <ActorItem
            v-for="actor in cast.slice(0, 4)"
            :key="actor.id"
            :actor="actor"
          />
        </div>
        <ShowMoreButton :goTo="{ path: `${$route.path}/cast` }" />
      </div>
    </div>
  </div>
</template>

<script>
import { useFetch, useRoute, computed, ref } from "@nuxtjs/composition-api";
export default {
  layout: "noNavbar",

  setup() {
    const route = useRoute();
    const { params } = route.value;

    const title = computed(() => {
      return params.type == "tv" ? movie.name : movie.original_title;
    });

    const statOne = computed(() => {
      return params.type == "tv" ? movie.number_of_seasons : movie.budget;
    });

    const statTwo = computed(() => {
      return params.type == "tv" ? movie.number_of_episodes : movie.revenue;
    });

    const statThree = computed(() => {
      return params.type == "tv" ? movie.episode_run_time[0] : movie.runtime;
    });

    const statOneText = computed(() => {
      return params.type == "tv" ? "Seasons: " : "Budget: $";
    });

    const statTwoText = computed(() => {
      return params.type == "tv" ? "Episodes: " : "Revenue: $";
    });

    const movie = ref();
    const trailer = ref();
    const cast = ref();

    const { fetch, fetchState } = useFetch(async ({ $axios, $route }) => {
      movie.value = await $axios.$get(
        `https://api.themoviedb.org/3/${$route.params.type}/${$route.params.id}?api_key=${process.env.apiKey}&language=en-US`
      );
      const videos = await $axios.$get(
        `https://api.themoviedb.org/3/${$route.params.type}/${$route.params.id}/videos?api_key=${process.env.apiKey}&language=en-US`
      );
      const credits = await $axios.$get(
        `https://api.themoviedb.org/3/${$route.params.type}/${$route.params.id}/credits?api_key=${process.env.apiKey}&language=en-US`
      );
      cast.value = credits.cast;
      trailer.value = videos.results.find((t) => t.type == "Trailer");
    });

    fetch();

    return {
      fetchState,
      movie,
      trailer,
      cast,
      title,
      statOne,
      statTwo,
      statThree,
      statOneText,
      statTwoText,
    };
  },
};
</script>

<style scoped lang="scss">
.backdrop {
  min-height: 100vh;
  background-position: center;
  background-size: cover;
}

.content {
  grid-column: main-start / main-end;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: min-content;
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
}

.head {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: $size-medium) {
    flex-direction: column;
  }

  &__title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media only screen and (max-width: $size-medium) {
      justify-content: center;
    }

    &-main {
      margin-bottom: 1rem;
      flex: 0 0 100%;
      @media only screen and (max-width: $size-medium) {
        text-align: center;
      }
    }

    &-genre {
      font-size: 1.3rem;
      border: 2px solid $color-primary-dark;
      padding: 0.5rem 1rem;
      border-radius: $border-radius-medium;

      &:first-child {
        margin-left: 2rem;
      }

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }

  &__rating-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: $size-medium) {
      margin-top: 2rem;
    }

    p:first-child {
      text-transform: uppercase;
      color: white;
      font-size: 1.4rem;
    }
  }

  &__rating {
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
  grid-column: 3 / 5;
  grid-row: span 2;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: $size-medium) {
    grid-column: 1 / -1;
  }

  &__video {
    width: 100%;
    height: 40rem;
    border: none;
  }

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-secondary-light;
    font-size: 1.6rem;
    color: white;
    text-decoration: none;
    font-weight: 600;
    padding: 3rem 0;
    transition: all 0.2s ease;
    border-bottom-left-radius: $border-radius-medium;
    border-bottom-right-radius: $border-radius-medium;

    &:hover {
      background-color: $color-primary-dark;
      box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.5);
    }
  }
}

.poster {
  grid-column: 3 / 5;
  grid-row: span 2;

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: $size-medium) {
    grid-column: 1 / -1;
  }
}

.details {
  grid-column: 1 / 3;
  grid-row: span 2;
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;

  @media only screen and (max-width: $size-medium) {
    text-align: center;
    grid-column: 1 / -1;
  }

  & > *:not(:last-child) {
    padding-bottom: 2rem;
  }

  & > *:not(:first-child) {
    padding-top: 2rem;
  }

  &__overview {
    flex: 1;
    grid-column: 1 / -1;
    border-bottom: 1px solid $color-primary-light;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
  }

  &__logos {
    grid-column: 1 / -1;
    margin-top: auto;
    background-color: $color-secondary-light;
    padding: 3rem;
    border-radius: $border-radius-medium;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-around;
    color: $color-primary-dark;
    font-size: 1.3rem;

    img {
      width: 7rem;
    }
  }
}

.cast {
  grid-column: 1 / -1;

  margin-top: 5rem;

  display: grid;
  grid-template-rows: repeat(3, min-content);
  grid-row-gap: 2rem;

  &__title {
    line-height: 1;
    border-bottom: 1px solid $color-primary-light;
    padding-bottom: 1rem;
  }
}

.actors {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
  justify-items: flex-start;
  gap: 2rem;
}

.actor {
  display: flex;
  gap: 1.5rem;

  &__img {
    width: auto;
    height: 10rem;
    border-radius: $border-radius-small;
  }

  &__names {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.6rem;
  }

  &__name {
    color: $color-primary-dark;
  }

  &__character-name {
    display: flex;
    flex-wrap: wrap;
    color: white;
    margin-left: 0.5rem;
  }
}
</style>
