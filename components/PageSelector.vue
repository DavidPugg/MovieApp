<template>
  <div class="page-selector">
    <NuxtLink
      :event="currentPage > 1 ? 'click' : ''"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage - 1 },
      }"
    >
      &#8592;
    </NuxtLink>

    <NuxtLink
      v-if="currentPage - 3 >= 1"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage - 3 },
      }"
    >
      {{ currentPage - 3 }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage - 2 >= 1"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage - 2 },
      }"
    >
      {{ currentPage - 2 }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage - 1 >= 1"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage - 1 },
      }"
    >
      {{ currentPage - 1 }}
    </NuxtLink>

    <div class="page-selector__btn selected">
      {{ currentPage }}
    </div>

    <NuxtLink
      v-if="currentPage + 1 <= pages"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage + 1 },
      }"
    >
      {{ currentPage + 1 }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage + 2 <= pages"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage + 2 },
      }"
    >
      {{ currentPage + 2 }}
    </NuxtLink>

    <NuxtLink
      v-if="currentPage + 3 <= pages"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage + 3 },
      }"
    >
      {{ currentPage + 3 }}
    </NuxtLink>

    <NuxtLink
      :event="currentPage < pages ? 'click' : ''"
      class="page-selector__btn"
      :to="{
        path: route.path,
        query: { ...route.query, page: currentPage + 1 },
      }"
    >
      &#8594;
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { useRoute, computed, defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  props: {
    pages: {
      type: Number,
      required: true
    }
  },
  setup () {
    const route = useRoute()
    const currentPage = computed((): Number => {
      return !route.value.query.page ? 1 : Number(route.value.query.page)
    })
    return { currentPage, route }
  }
})
</script>

<style lang="scss" scoped>
.page-selector {
  grid-column: 1 / -1;
  align-self: flex-start;
  border-radius: $border-radius-medium;
  z-index: 1000;
  padding: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  &__btn {
    cursor: pointer;
    border-radius: 1rem;
    text-decoration: none;
    font-size: 2.5rem;
    color: #fff;
    background-color: $color-secondary-dark;
    width: 5rem;
    height: 5rem;
    transition: all 0.2s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      color: $color-primary-light;
    }

    &:not(:last-child) {
      margin-right: 0.3rem;
    }
  }
}

.selected {
  color: $color-primary-light;
  font-weight: 600;
  transform: translateY(-3px) scale(1.1);
}
</style>
