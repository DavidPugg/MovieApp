<template>
  <div
    class="backdrop container"
    :style="{
      'background-image': `linear-gradient(to right bottom, rgba(0,0,0, .85), rgba(0,0,0, .85)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
    }"
  >
    <div class="content">
      <div class="head">
        <h2 class="head__title heading-1">
          <span class="head__title-main">{{ movie.original_title }}</span>
          <span class="genre" v-for="genre in movie.genres" :key="genre.id">{{
            genre.name
          }}</span>
        </h2>
        <div class="head__ratings">
          <div class="head__rating-box">
            <p><b>Rating</b></p>
            <p class="head__rating">{{ movie.vote_average }}</p>
          </div>
          <div class="head__popularity-box">
            <p><b>Popularity</b></p>
            <p class="head__popularity">#{{ Math.round(movie.popularity) }}</p>
          </div>
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
          <p class="details__budget"><b>Budget: </b> ${{ movie.budget }}</p>
          <p class="details__revenue"><b>Revenue: </b> ${{ movie.revenue }}</p>
          <p class="details__runtime">
            <b>Runtime: </b> {{ movie.runtime }}min
          </p>
        </div>
        <!-- <div class="details__logos" v-if="companies.length">
          <img
            v-for="company in companies"
            :key="company.id"
            :src="`https://image.tmdb.org/t/p/w200${company.logo_path}`"
            :alt="company.name"
          />
        </div> -->
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
export default {
  layout: "noNavbar",
  computed: {
    companies() {
      return this.movie.production_companies.filter((e) => e.logo_path);
    },
  },
  async asyncData({ $axios, params }) {
    const movie = await $axios.$get(
      `https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.apiKey}&language=en-US`
    );
    const videos = await $axios.$get(
      `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.apiKey}&language=en-US`
    );
    const credits = await $axios.$get(
      `https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.apiKey}&language=en-US`
    );
    const trailer = videos.results.find((t) => t.type == "Trailer");
    return { movie, trailer, cast: credits.cast };
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

  &__title {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media only screen and (max-width: $size-medium) {
      justify-content: center;
    }

    &-main {
      margin-right: 1rem;
      @media only screen and (max-width: $size-medium) {
        margin-right: 0;
        margin-bottom: 2rem;
        flex: 0 0 100%;

        text-align: center;
      }
    }
  }

  &__ratings {
    flex: 0 0 20%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media only screen and (max-width: $size-medium) {
      display: none;
    }
  }

  &__rating-box,
  &__popularity-box {
    text-align: center;

    p:first-child {
      text-transform: uppercase;
      color: white;
      font-size: 1.4rem;
    }
  }

  &__rating,
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

.genre {
  font-size: 1.3rem;
  border: 2px solid $color-primary-dark;
  padding: 0.5rem 1rem;
  border-radius: 10rem;

  &:first-child {
    margin-left: 2rem;
  }

  &:not(:last-child) {
    margin-right: 1rem;
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
