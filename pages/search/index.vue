<template>
    <main v-if="!fetchState.pending" class="container">
        <div>
            <DropDown :items="dropdownItems" />
        </div>
        <MovieList :items="items" />
    </main>
</template>

<script lang="ts">
    import { defineComponent, ref, useContext, useFetch, useRoute, watch } from '@nuxtjs/composition-api';
    import { Movie, Tv } from '~/interfaces/Movie';

    interface Items {
        results: Movie[] | Tv[];
        total_pages: Number;
    }

    const dropdownItems = ['Movie', 'Tv'];

    export default defineComponent({
        setup() {
            const { $axios } = useContext();
            const route = useRoute();
            const items = ref<Items>({} as Items);

            watch(
                () => route.value,
                () => fetch(),
            );

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { query } = $route;
                items.value = await $axios.$get(
                    `https://api.themoviedb.org/3/search/${query.q || 'movie'}?api_key=${
                        process.env.apiKey
                    }&language=en-US&page=${query.page}&query=${query.s}`,
                );
            });

            fetch();

            return { fetchState, items, dropdownItems };
        },
    });
</script>
