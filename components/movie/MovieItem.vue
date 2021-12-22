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
.link {
  text-decoration: none;
}

.item {
  height: 100%;
  background-color: $color-secondary-light;
  border-radius: $border-radius-medium;
  color: #fff;
  text-align: center;
  overflow: hidden;
  backface-visibility: hidden;
  font-size: 1.6rem;

  display: grid;
  grid-template-rows: min-content 1fr;

  transition: all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);

  &:hover {
    // transform: scale(1.05);
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.15);
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
    background-color: rgba($color: #000000, $alpha: 0.5);
  }

  &__img {
    width: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
  }

  &__rating {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
    font-weight: 600;
    z-index: 1;

    color: transparent;
    font-size: 5rem;
    background-image: linear-gradient(
      to right bottom,
      $color-primary-light,
      $color-primary-dark
    );
    background-clip: text;
  }
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
}

.title {
  line-height: 1.2;
  font-size: 1.6rem;
  letter-spacing: 0.3rem;
}

.released {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid $color-primary-light;
}
</style>
