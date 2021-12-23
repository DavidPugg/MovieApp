<template>
  <nav class="nav">
    <svg class="nav__back-arrow" @click="goBack">
      <use xlink:href="~/assets/svgs.svg#icon-chevron-left"></use>
    </svg>
    <svg class="nav__icon-house" @click="goHome">
      <use xlink:href="~/assets/svgs.svg#icon-home"></use>
    </svg>
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
  padding-top: 2rem;
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: space-around;

  @media only screen and (max-width: $size-small) {
    width: 100%;
  }

  &__back-arrow,
  &__icon-house {
    fill: white;
    width: 4rem;
    height: 4rem;
    cursor: pointer;

    &:hover {
      fill: $color-primary-dark;
    }
  }
}
</style>
