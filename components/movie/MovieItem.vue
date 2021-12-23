<template>
  <NuxtLink class="link" :to="goTo">
    <div class="item">
      <img class="img" :src="fullPoster" alt="" />
      <p class="rating">{{ rating }}</p>
      <h4 class="title">{{ shortTitle }}</h4>
      <!-- <div class="details">
        <h4 class="title">{{ shortTitle }}</h4>
        <p class="released">
          {{ released }}
        </p>
      </div> -->
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
  position: relative;
  height: 100%;
  background-color: $color-secondary-light;
  border-radius: $border-radius-medium;
  color: #fff;
  text-align: center;
  overflow: hidden;
  backface-visibility: hidden;
  font-size: 1.6rem;
  user-select: none;

  transition: all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);

  &:hover {
    // transform: scale(1.05);
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
}

.img {
  width: 100%;
  height: 100%;
}

.rating {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  font-size: 1.6rem;
  letter-spacing: 0.3rem;
  z-index: 1;
  height: 8rem;
  padding: 2rem .5rem;
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 20%);

  background-image: linear-gradient(
    to right bottom,
    rgba($color-primary-light, 0.8),
    rgba($color-primary-dark, 0.9)
  );
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
}
.released {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid $color-primary-light;
}
</style>
