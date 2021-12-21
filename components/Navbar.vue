<template>
  <nav class="navigation">
    <div class="container">
      <div class="nav">
        <NuxtLink
          :to="{ name: 'tvshows' }"
          class="select"
          :class="{ selected: $route.name === 'tvshows' }"
          >Tv Shows</NuxtLink
        >
        <NuxtLink
          :to="{ name: 'movies' }"
          class="select"
          :class="{ selected: $route.name === 'movies' }"
          >Movies</NuxtLink
        >
        <form class="nav__form" @submit.prevent="search">
          <input
            class="nav__input"
            type="text"
            placeholder="Search"
            v-model="userInput"
          />
          <svg class="nav__icon">
            <use xlink:href="~/assets/svgs.svg#icon-magnifying-glass"></use>
          </svg>
        </form>
        <div v-if="$route.name == 'tvshows'" class="sort">
          <NuxtLink
            class="nav__path"
            :to="{ name: 'tvshows', query: { q: 'latest' } }"
            :class="{ selected: $route.query.q == 'latest' }"
            >Latest</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'tvshows', query: { q: 'airing_today' } }"
            :class="{ selected: $route.query.q == 'airing_today' }"
            >Airing today</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'tvshows', query: { q: 'popular' } }"
            :class="{ selected: $route.query.q == 'popular' }"
            >Popular</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'tvshows', query: { q: 'on_the_air' } }"
            :class="{ selected: $route.query.q == 'on_the_air' }"
            >On the air</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'tvshows', query: { q: 'top_rated' } }"
            :class="{ selected: $route.query.q == 'top_rated' }"
            >Top rated</NuxtLink
          >
        </div>
        <div v-else class="sort">
          <NuxtLink
            class="nav__path"
            :to="{ name: 'movies', query: { q: 'latest' } }"
            :class="{ selected: $route.query.q == 'latest' }"
            >Latest</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'movies', query: { q: 'top_rated' } }"
            :class="{ selected: $route.query.q == 'top_rated' }"
            >Top rated</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'movies', query: { q: 'popular' } }"
            :class="{ selected: $route.query.q == 'popular' }"
            >Popular</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'movies', query: { q: 'now_playing' } }"
            :class="{ selected: $route.query.q == 'now_playing' }"
            >Now playing</NuxtLink
          >
          <NuxtLink
            class="nav__path"
            :to="{ name: 'movies', query: { q: 'upcoming' } }"
            :class="{ selected: $route.query.q == 'upcoming' }"
            >Upcoming</NuxtLink
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
    };
  },

  methods: {
    search() {
      this.$router.push({
        name: this.$route.name,
        query: { s: this.userInput },
      });
      this.userInput = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
  background-color: $color-secondary-light;
  margin-bottom: 10rem;
  border-bottom: 1px solid $color-primary-light;
  border-bottom-left-radius: $border-radius-small;
  border-bottom-right-radius: $border-radius-small;
}

.nav {
  grid-column: main-start / main-end;
  text-align: center;
  padding: 2rem 0;

  display: grid;
  grid-template-columns: repeat(8, minmax(min-content, 15rem));
  grid-gap: 2rem;
  justify-content: center;

  &__form {
    grid-column: 5 / -1;
    display: flex;
    align-items: center;

    @media only screen and (max-width: $size-medium) {
      grid-column: 1 / -1;
    }
  }

  &__icon {
    width: 3rem;
    height: 3rem;
    margin-left: -5rem;
    fill: $color-secondary-dark;
    z-index: 1000;
    backface-visibility: hidden;
    transition: all 0.2s;
  }

  &__input {
    border: none;
    border-radius: $border-radius-medium;
    font-weight: 600;
    background-color: #fff;
    font-family: $font-primary;
    font-size: 1.5rem;
    padding: 1rem 3rem;
    width: 100%;
    outline: none;
    transition: all 0.2s;

    &::placeholder {
      color: $color-secondary-dark;
    }

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.2);
    }
  }

  &__input:hover ~ &__icon {
    transform: scale(1.05);
  }

  &__path {
    text-decoration: none;
    color: #fff;
    font-size: 1.6rem;
    align-self: center;
    justify-self: center;
    padding: 1rem 2rem;
    border-radius: $border-radius-medium;
    transition: all 0.2s ease-out;
    overflow: hidden;

    &:hover {
      transform: translateY(-3px);
      background-color: $color-secondary-dark;
      box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.2);
    }

    &:active,
    &:focus {
      transform: translateY(0);
    }
  }
}

.sort {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid $color-primary-light;
  padding-top: 2rem;
}

.select {
  padding: 2rem 0;
  grid-column: span 2;
  font-size: 2rem;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-decoration: none;
  border-radius: $border-radius-medium;
  transition: all 0.2s ease-out;

  @media only screen and (max-width: $size-medium) {
    grid-column: span 4;
  }

  &:hover {
    transform: translateY(-3px);
    background-color: $color-secondary-dark;
    box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.2);
  }

  &:active,
  &:focus {
    transform: translateY(0);
  }
}
.selected {
  color: $color-primary-light;
  background-color: $color-secondary-dark;
  font-weight: 600;
}
</style>
