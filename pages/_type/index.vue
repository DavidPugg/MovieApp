<template>
    <main v-if="!fetchState.pending" class="container">
        <div class="dropdown">
            <DropDown :items="dropdownItems" />
        </div>
        <MovieList :items="items" />
    </main>
</template>

<script lang="ts">
    import { defineComponent, ref, useContext, useFetch, useRoute, watch } from '@nuxtjs/composition-api';
    import { Movie, Tv } from '~/interfaces/Movie';
    import { ApiResponse } from '~/interfaces/Response';

    const dropdownItems = ['Popular', 'Top rated', 'Now playing', 'Upcoming'];

    export default defineComponent({
        setup() {
            const { $axios } = useContext();
            const route = useRoute();
            const items = ref<ApiResponse<Movie | Tv>>();

            watch(
                () => route.value,
                () => fetch(),
            );

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { query, params } = $route;
                items.value = await $axios.$get(
                    `https://api.themoviedb.org/3/${params.type}/${query.q || 'popular'}?api_key=${
                        process.env.apiKey
                    }&language=en-US&page=${query.page || 1}`,
                );
            });
            fetch();

            return { dropdownItems, items, fetchState };
        },
    });
</script>
