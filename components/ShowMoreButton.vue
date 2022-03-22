<template>
  <NuxtLink class="button" :to="goTo"
    ><div class="button-box">
      <p>Show more</p>
      <svg class="button-icon">
        <use xlink:href="~/assets/svgs.svg#icon-chevron-small-right"></use>
      </svg></div
  ></NuxtLink>
</template>

<script>
export default {
    props: ['goTo']
};
</script>

<style scoped lang="scss">
.button {
  font-size: 1.6rem;
  font-weight: 600;
  padding: 0.5rem;
  color: $color-primary-dark;
  text-decoration: none;
  border-bottom: 1px solid $color-primary-dark;
  margin-left: auto;
  transition: all 0.2s ease;
  position: relative;

  &::before {
    content: "";
    display: inline-block;
    background-color: $color-primary-dark;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: all 0.2s;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-3px);
    color: white;
  }

  &:hover::before {
    width: 100%;
  }

  &-box {
    display: flex;
    align-items: center;
  }

  &-box:hover > &-icon {
    fill: white;
  }

  &-icon {
    fill: $color-primary-dark;
    width: 3rem;
    height: 3rem;
    transition: all 0.2s;
  }
}
</style>
