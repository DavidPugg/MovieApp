<template>
  <nav class="navigation">
    <div class="container">
      <div class="nav">
        <NuxtLink
          :to="{ name: 'tvshows', query: { q: 'popular' } }"
          class="select"
          :class="{ selected: $route.name === 'tvshows' }"
          >Tv Shows</NuxtLink
        >
        <NuxtLink
          :to="{ name: 'movies', query: { q: 'popular' } }"
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
