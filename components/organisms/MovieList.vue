<template>
    <section class="movies">
        <MovieItem
            v-for="item in items.results"
            :id="item.id"
            :key="item.id"
            :poster="item.poster_path"
            :title="item.title || item.name"
            :genre="item.genre_ids"
            :rating="item.vote_average"
            :released="item.release_date || items.first_air_date"
        />
        <PageSelector :pages="items.total_pages" />
    </section>
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api';
    import { Movie, Tv } from '~/interfaces/Movie';
    export default defineComponent({
        props: {
            items: {
                type: Object as () => Movie | Tv,
                required: true
            }
        },
        setup() {
            // const route = useRoute();
            // const { $axios } = useContext();

            // const items = ref<Movie[]>([] as Movie[]);
            // const totalPages = ref<Number>(0);

            // const checkItems = computed((): boolean => {
            //     return typeof items === 'undefined' || items.value.length < 1;
            // });

            // // const { fetch, fetchState } = useFetch(async ({ $route }) => {
            // //     try {
            // //         const { query } = $route;
            // //         let dummyItems;
            // //         if ($route.name === 'movies') {
            // //             if (query.q) {
            // //                 dummyItems = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/movie/${query.q}?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`,
            // //                 );
            // //             } else if (query.s) {
            // //                 dummyItems = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apiKey}&language=en-US&page=${query.page}&query=${query.s}`,
            // //                 );
            // //             } else {
            // //                 dummyItems = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`,
            // //                 );
            // //             }
            // //         } else if ($route.name === 'tvshows') {
            // //             let i;
            // //             const results: Movie[] = [];
            // //             if (query.q) {
            // //                 i = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/tv/${query.q}?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`,
            // //                 );
            // //             } else if (query.s) {
            // //                 i = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/search/tv?api_key=${process.env.apiKey}&language=en-US&page=${query.page}&query=${query.s}`,
            // //                 );
            // //             } else {
            // //                 i = await $axios.$get(
            // //                     `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`,
            // //                 );
            // //             }
            // //             i.results.forEach((item: any) => {
            // //                 results.push({
            // //                     ...item,
            // //                     title: item.name,
            // //                     release_date: item.first_air_date,
            // //                 });
            // //             });
            // //             dummyItems = { total_pages: i.total_pages, results };
            // //         } else {
            // //             dummyItems = await $axios.$get(
            // //                 `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apiKey}&language=en-US&page=${query.page}`,
            // //             );
            // //         }
            // //         items.value = dummyItems.results;
            // //         totalPages.value = dummyItems.total_pages;
            // //     } catch (err) {
            // //         console.log(err);
            // //     }
            // // });
            // // fetch();
            // return { fetchState, checkItems, items, totalPages };
        },
    });
</script>

<style lang="scss" scoped>
    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        justify-content: center;
        grid-gap: 2rem;

        line-height: 1;
        margin-bottom: 10rem;

        &:hover > *:not(:hover) {
            z-index: 1000;
        }
    }

    .text {
        grid-column: 1 / -1;

        color: #fff;
        text-transform: uppercase;
        font-size: 5rem;
        align-self: flex-start;
        justify-self: center;
    }
    .loader,
    .text {
        margin: 10rem auto;
    }
</style>
