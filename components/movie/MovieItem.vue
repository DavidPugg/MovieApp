<template>
  <NuxtLink class="link" :to="goTo">
    <div class="item">
      <img class="img" :src="fullPoster" alt="" />
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
      return this.title.substring(0,29) + '...';
    }
  },
};
</script>

<style lang="scss" scoped>
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
  display: flex;

  transition: all 0.1s ease;

  &:hover {
    // transform: scale(1.05);
    background-color: darken($color-secondary-light, 5%);
    box-shadow: 0 0 2rem rgba($color: #000000, $alpha: 0.25);
  }
}

.img {
  max-width: 35%;
  max-height: 20rem;
  object-fit: cover;
  object-position: center;
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  & > *:not(:last-child, :first-child) {
    padding-bottom: 1rem;
  }
}

.title {
  border-bottom: 1px solid $color-primary-light;
  line-height: 1.2;
  font-size: 1.8rem;
  letter-spacing: 0.3rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.rating {
  margin-top: auto;
  border: none;
  color: transparent;

  font-size: 5rem;
  background-image: linear-gradient(
    to right bottom,
    $color-primary-light,
    $color-primary-dark
  );
  background-clip: text;
}

.released {
  border-bottom: 1px solid $color-primary-light;
}
</style>
