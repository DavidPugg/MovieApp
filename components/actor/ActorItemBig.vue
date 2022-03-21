<template>
  <NuxtLink class="actor" :to="{ path: `/actor/${actor.id}` }">
    <img
      width="200"
      height="300"
      class="actor__img"
      :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`"
      alt="Actor img"
    />
    <div class="names">
      <h4 class="actor__name">{{ actor.name }}</h4>
      <h5 class="actor__character-name">{{ actor.character }}</h5>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    actor: Object,
  },
};
</script>

<style scoped lang="scss">
.actor {
  display: grid;
  grid-template-rows: repeat(2, min-content);
  justify-items: center;
  grid-gap: 1rem;
  transition: all 0.2s ease-out;
  text-decoration: none;
  backface-visibility: hidden;

  &__img {
    border-radius: $border-radius-medium;
  }

  &__names {
    text-align: center;
  }

  &__name,
  &__character-name {
    font-size: 1.6rem;
    text-align: center;
  }

  &__name {
    color: $color-primary-dark;
  }

  &__character-name {
    color: white;
  }

  &:hover {
    transform: translateY(-3px) scale(1.03);
  }
}
</style>
