<template>
  <div class="sort" @click.stop="showDropdown">
    <p class="sort-current">
      {{ dropdownText }}
      <svg class="sort-current-arrow" :class="{ rotateArrow: dropdown }">
        <use xlink:href="~/assets/svgs.svg#icon-chevron-left"></use>
      </svg>
    </p>
    <transition name="dropdown">
      <div
        class="sort-dropdown"
        v-if="dropdown"
        @click="showDropdown"
        v-click-outside="showDropdown"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          class="sort-dropdown__item"
          :to="{ name: $route.name, query: { q: link.to } }"
          >{{ link.name }}</NuxtLink
        >
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInput: "",
      dropdown: false,
      showLinks: [
        {
          name: "Latest",
          to: "latest",
        },
        {
          name: "Airing Today",
          to: "airing_today",
        },
        {
          name: "Popular",
          to: "popular",
        },
        {
          name: "On the air",
          to: "on_the_air",
        },
        {
          name: "Top rated",
          to: "top_rated",
        },
      ],
      movieLinks: [
        {
          name: "Latest",
          to: "latest",
        },
        {
          name: "Top rated",
          to: "top_rated",
        },
        {
          name: "Popular",
          to: "popular",
        },
        {
          name: "Now playing",
          to: "now_playing",
        },
        {
          name: "Upcoming",
          to: "upcoming",
        },
      ],
    };
  },
  computed: {
    dropdownText() {
      if (!this.$route.query.q) return "Popular";
      if (this.$route.name == "tvshows") {
        return this.showLinks.find((e) => e.to == this.$route.query.q).name;
      }
      return this.movieLinks.find((e) => e.to == this.$route.query.q).name;
    },
    links() {
      if (this.$route.name == "tvshows") {
        return this.showLinks.filter((e) => e.to != this.$route.query.q);
      }
      return this.movieLinks.filter((e) => e.to != this.$route.query.q);
    },
  },
  methods: {
    showDropdown() {
      this.dropdown = !this.dropdown;
    },
  },
};
</script>

<style lang="scss" scoped>
%item-data {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  color: white;
  transition: all 0.2s ease;
  background-color: $color-secondary-light;
}

.sort {
  grid-column: 1 / -1;
  position: relative;
  font-size: 1.8rem;
  user-select: none;
  z-index: 1000;
  margin-left: auto;
  backface-visibility: hidden;
  width: 20.8rem;

  border-top-left-radius: $border-radius-medium;
  border-top-right-radius: $border-radius-medium;

  @extend %item-data;

  @media only screen and (max-width: $size-small) {
    width: 100%;
  }

  &:hover {
    background-color: $color-primary-dark;
  }

  &-current {
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    &-arrow {
      fill: white;
      width: 2.5rem;
      height: 2.5rem;
      transform: rotate(180deg);
      transition: all 0.2s ease;
    }
  }

  &-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    border-bottom-left-radius: $border-radius-medium;
    border-bottom-right-radius: $border-radius-medium;

    &__item {
      text-decoration: none;

      @extend %item-data;

      &:hover {
        background-color: $color-primary-dark;
      }
    }
  }
}

.rotateArrow {
  transform: rotate(270deg);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
}

.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
}
</style>
