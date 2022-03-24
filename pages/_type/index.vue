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
                const { query, params } = $route;
                items.value = await fetchMovies({
                    type: params.type,
                    page: query.page as String,
                    query: query.q as String,
                });
            });
            fetch();

            return { dropdownItems, items, fetchState };
        },
    });
</script>
