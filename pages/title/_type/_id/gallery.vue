<template>
  <div class="container" v-if="!fetchState.pending">
    <div class="content">
      <h1 class="title heading-1">Videos</h1>
      <div class="videos">
        <img
          v-for="video in videos"
          :key="video.id"
          class="videos__img"
          @click="openVideo(video.key)"
          :src="`http://img.youtube.com/vi/${video.key}/0.jpg`"
          alt=""
        />
      </div>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
import { ref, useFetch, useRoute, useRouter } from "@nuxtjs/composition-api";
export default {
  layout: "noNavbar",

  setup() {
    const router = useRouter();
    const route = useRoute();
    const videos = ref([]);
    const { fetch, fetchState } = useFetch(async ({ $axios, $route }) => {
      const { results } = await $axios.$get(
        `https://api.themoviedb.org/3/${$route.params.type}/${$route.params.id}/videos?api_key=${process.env.apiKey}&language=en-US`
      );
      videos.value = results;
    });

    const openVideo = (id) => {
      router.push(`${route.value.path}/${id}`);
    };

    fetch();

    return { videos, openVideo, fetchState };
  },
};
</script>

<style lang="scss" scoped>
.title {
  line-height: 1;
  border-bottom: 1px solid $color-primary-light;
  padding-bottom: 1rem;
}

.videos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  grid-column-gap: 0.5rem;
  grid-row-gap: 2rem;
  margin-top: 2rem;

  &__img {
    width: 100%;
    height: auto;
    border-radius: $border-radius-small;
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
      outline: 1px solid $color-primary-dark;
    }
  }
}
</style>
