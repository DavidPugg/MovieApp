<template>
  <div class="container">

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
export default {
    layout: 'noNavbar',
  async asyncData({ $axios, params }) {
    const { results } = await $axios.$get(
      `https://api.themoviedb.org/3/tv/${params.id}/videos?api_key=${process.env.apiKey}&language=en-US`
    );
    return { videos: results };
  },

  methods: {
    openVideo(id) {
      this.$router.push(`${this.$route.path}/${id}`);
    },
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
    transition: all .1s;

    &:hover {
      outline: 1px solid $color-primary-dark;
    }

  }
}
</style>
