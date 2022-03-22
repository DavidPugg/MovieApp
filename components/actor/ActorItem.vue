<template>
  <NuxtLink :to="{ path: `/actor/${actor.id}` }" class="actor">
    <img
      class="actor__img"
      :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`"
      alt="Actor img"
    >
    <div class="actor__names">
      <h4 class="actor__name">
        {{ actor.name }}
      </h4>
      <h5 class="actor__character-name">
        {{ actor.character }}
      </h5>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
export default {
  props: {
    actor: Object
  }
}
</script>

<style scoped lang="scss">
.actor {
  display: flex;
  gap: 1.5rem;
  text-decoration: none;
  backface-visibility: hidden;
  transition: all 0.2s ease-out;

  &__img {
    width: auto;
    height: 10rem;
    border-radius: $border-radius-small;
  }

  &__names {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.6rem;
  }

  &__name {
    color: $color-primary-dark;
  }

  &__character-name {
    display: flex;
    flex-wrap: wrap;
    color: white;
    margin-left: 0.5rem;
  }

  &:hover {
    transform: translateY(-3px) scale(1.03);
  }
}
</style>
