<template>
    <main v-if="!fetchState.pending" class="container">
        <div class="dropdown">
            <DropDown :items="dropdownItems" />
        </div>
        <MovieList :items="items" />
    </main>
</template>

<script lang="ts">
    import { defineComponent, ref, useFetch, useRoute, watch } from '@nuxtjs/composition-api';
    import { Movie, Tv } from '~/interfaces/Movie';
    import { ApiResponse } from '~/interfaces/Response';
    import { fetchMovies } from '~/utils/MoviesAPI';

    const dropdownItems = ['Popular', 'Top rated', 'Now playing', 'Upcoming'];

    export default defineComponent({
        setup() {
            const route = useRoute();
            const items = ref<ApiResponse<Movie | Tv>>();

            watch(
                () => route.value,
                () => fetch(),
            );

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { page, q } = $route.query;
                items.value = await fetchMovies({
                    type: 'movie',
                    page: page as String,
                    query: q as String,
                });
            });
            fetch();

            return { dropdownItems, items, fetchState };
        },
    });
</script>
