<template>
  <nav class="nav">
    <div class="nav__icons">
      <svg class="nav__back-arrow" @click="goBack">
        <use xlink:href="~/assets/svgs.svg#icon-chevron-left"></use>
      </svg>
      <svg class="nav__icon-house" @click="goHome">
        <use xlink:href="~/assets/svgs.svg#icon-home"></use>
      </svg>
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
      if (this.$route.name === "movies-id") {
        this.$router.push({
          name: "movies",
          query: { s: this.userInput },
        });
        this.userInput = "";
      } else {
        console.log(this.$route);
        this.$router.push({
          name: "tv",
          query: { s: this.userInput },
        });
        this.userInput = "";
      }
    },
    goBack() {
      this.$router.back();
    },
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  width: 20rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
  position: fixed;

  &__icons {
    display: flex;
    align-items: center;
    justify-content: space-around;
    grid-column: 1 / -1;

  }

  &__back-arrow {
    fill: white;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    &:hover {
      fill: $color-primary-dark;
    }
  }

  &__icon-house {
    grid-column: span 1;
    width: 4rem;
    height: 4rem;
    fill: white;

    &:hover {
      fill: $color-primary-dark;
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
</style>
