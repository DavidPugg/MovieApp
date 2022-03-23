<template>
  <NuxtLink class="link" :to="goTo">
    <div class="item">
      <img class="img" :src="fullPoster" alt="" />
      <p class="rating">
        {{ rating }}
      </p>
      <h4 class="title">
        {{ shortTitle }}
      </h4>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  useRoute,
} from "@nuxtjs/composition-api";
export default defineComponent({
  props: {
    poster: { type: String as PropType<String | null>, default: null },
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    released: { type: String, required: true },
    id: { type: Number, required: true },
  },

  setup({ poster, title, id }) {
    const route = useRoute();
    const params = route.value;

    const fullPoster = computed((): String => {
      return poster != null ? `https://image.tmdb.org/t/p/w200${poster}` : "";
    });

    const goTo = computed((): String => {
      if (params.name === "tvshows") {
        return `title/tv/${id}`;
      } else {
        return `title/movie/${id}`;
      }
    });

    const shortTitle = computed((): String => {
      if (title.length <= 30) {
        return title;
      }
      return title.substring(0, 30) + "...";
    });

    return { fullPoster, goTo, shortTitle };
  },
});
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
}

.item {
  position: relative;
  height: 100%;
  background-color: $color-secondary-light;
  border-radius: $border-radius-medium;
  color: #fff;
  text-align: center;
  overflow: hidden;
  backface-visibility: hidden;
  font-size: 1.6rem;
  user-select: none;

  transition: all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.15);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
  }
}

.img {
  width: 100%;
  height: 100%;
}

.rating {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-weight: 600;
  z-index: 1;

  color: transparent;
  font-size: 5rem;
  background-image: linear-gradient(
    to right bottom,
    $color-primary-light,
    $color-primary-dark
  );
  background-clip: text;
}

.title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: white;
  font-size: 1.6rem;
  letter-spacing: 0.3rem;
  z-index: 1;
  height: 8rem;
  padding: 2rem 0.5rem;
  padding-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 20%);

  background-image: linear-gradient(
    to right bottom,
    rgba($color-primary-light, 0.8),
    rgba($color-primary-dark, 0.9)
  );
}

.details {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
}
.released {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid $color-primary-light;
}
</style>
