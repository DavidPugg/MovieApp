<template>
    <div v-if="!fetchState.pending" class="container">
        <div class="content">
            <h1 class="title heading-1">Cast</h1>
            <div class="cast">
                <ActorItemBig v-for="actor in cast" :key="actor.id" :actor="actor" />
            </div>
        </div>
        <NuxtChild />
    </div>
</template>

<script lang="ts">
    import { ref, useFetch } from '@nuxtjs/composition-api';
    import { Actor } from '~/interfaces/Actor';
    import { fetchMovieCredits } from '~/utils/MoviesAPI';
    export default {
        layout: 'noNavbar',

        setup() {
            const cast = ref<Actor[]>([] as Actor[]);
            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { type, id } = $route.params;
                const { cast: fetchedCast } = await fetchMovieCredits({ type, id });
                cast.value = fetchedCast;
            });
            fetch();
            return { cast, fetchState };
        },
    };
</script>

<style lang="scss" scoped>
    .title {
        line-height: 1;
        border-bottom: 1px solid $color-primary-light;
        padding-bottom: 1rem;
    }

    .cast {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        grid-column-gap: 2rem;
        grid-row-gap: 2rem;
        margin-top: 2rem;
    }
</style>
