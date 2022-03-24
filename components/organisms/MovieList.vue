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
            :released="item.release_date || item.first_air_date"
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
                type: Object as () => Movie[] | Tv[],
                required: true,
            },
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
</style>
