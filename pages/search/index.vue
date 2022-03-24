<template>
    <main v-if="!fetchState.pending" class="container">
        <div>
            <DropDown :items="dropdownItems" />
        </div>
        <MovieList :items="items" />
    </main>
</template>

<script lang="ts">
    import { defineComponent, ref, useFetch, useRoute, watch } from '@nuxtjs/composition-api';
    import { fetchSearchResults } from '~/utils/MoviesAPI';
    import { Movie, Tv } from '~/interfaces/Movie';
    import { ApiResponse } from '~/interfaces/Response';

    const dropdownItems = ['Movie', 'Tv'];

    export default defineComponent({
        setup() {
            const route = useRoute();
            const items = ref<ApiResponse<Movie | Tv>>({} as ApiResponse<Movie | Tv>);

            watch(
                () => route.value,
                () => fetch(),
            );

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { q, page, s } = $route.query;
                items.value = await fetchSearchResults(page as String, s as String, q as String);
            });

            fetch();

            return { fetchState, items, dropdownItems };
        },
    });
</script>
