<template>
  <NuxtLink class="link" :to="goTo">
    <div class="item">
      <div class="head">
        <img class="head__img" :src="fullPoster" alt="" />
        <p class="head__rating">{{ rating }}</p>
      </div>
      <div class="details">
        <h4 class="title">{{ shortTitle }}</h4>
        <p class="released">
          {{ released }}
        </p>
        <p class="rating">{{ rating }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: ["poster", "title", "genre", "rating", "released", "id"],

  data() {
    return {
      fullPoster: `https://image.tmdb.org/t/p/w200${this.poster}`,
    };
  },

  computed: {
    genres() {
      if (this.$route.name === "tvshows") {
        return this.$store.getters["getTvGenres"].filter((g) =>
          this.genre.includes(g.id)
        );
      } else {
        return this.$store.getters["getMovieGenres"].filter((g) =>
          this.genre.includes(g.id)
        );
      }
    },
    goTo() {
      if (this.$route.name === "tvshows") {
        return `show/${this.id}`;
      } else {
        return `movie/${this.id}`;
      }
    },
    shortTitle() {
      if (this.title.length <= 30) return this.title;
      return this.title.substring(0, 29) + "...";
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin rating {
  color: transparent;

  font-size: 5rem;
  background-image: linear-gradient(
    to right bottom,
    $color-primary-light,
    $color-primary-dark
  );
  background-clip: text;
}

.link {
  text-decoration: none;
}

.item {
  background-color: $color-secondary-light;
  border-radius: $border-radius-medium;
  color: #fff;
  text-align: center;
  overflow: hidden;
  backface-visibility: hidden;
  font-size: 1.6rem;
  display: grid;
  grid-template-columns: min-content 1fr;

  transition: all 0.1s ease;

  &:hover {
    // transform: scale(1.05);
    background-color: darken($color-secondary-light, 5%);
    box-shadow: 0 0 2rem rgba($color: #000000, $alpha: 0.25);
  }
}

.head {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    @media only screen and (max-width: $size-medium) {
      background-color: rgba($color: #000000, $alpha: 0.6);
    }
  }

  &__img {
    width: 14rem;
    display: block;
    object-fit: cover;
    object-position: center;

    @media only screen and (max-width: $size-medium) {
      width: 10rem;
    }
  }

  &__rating {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    z-index: 1;
    @include rating;

    @media only screen and (max-width: $size-medium) {
      opacity: 1;
    }
  }
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  & > *:not(:last-child) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid $color-primary-light;
  }

  @media only screen and (max-width: $size-medium) {
    padding: 1rem;
  }
}

.title {
  line-height: 1.2;
  font-size: 1.6rem;
  letter-spacing: 0.3rem;
}

.released {
  @media only screen and (max-width: $size-medium) {
    margin-top: auto;
  }
}

.rating {
  margin-top: auto;
  @include rating;

  @media only screen and (max-width: $size-medium) {
    display: none;
  }
}
</style>
