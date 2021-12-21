<template>
  <div class="main" @click="goBack">
    <iframe
      class="video"
      :src="`https://www.youtube.com/embed/${$route.params.videoId}?autoplay=1`" allow='autoplay'
    >
    </iframe>
  </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.back();
        }
    }

};
</script>

<style lang="scss" scoped>
.main {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba($color: #000000, $alpha: 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
    width: 70%;
    height: 70%;
    outline: none;
    border: none;
}
</style>
