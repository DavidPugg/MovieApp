<template>
  <svg class="back-arrow" @click="goBack">
    <use xlink:href="~/assets/svgs.svg#icon-chevron-left"></use>
  </svg>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.back-arrow {
  fill: white;
  position: absolute;
  top: 3rem;
  left: 3rem;
  width: 8rem;
  height: 8rem;
  cursor: pointer;

  @media only screen and (max-width: $size-large) {
    top: 3rem;
    left: 3rem;
    width: 6rem;
    height: 6rem;
  }

  &:hover {
    fill: $color-primary-dark;
  }
}
</style>

