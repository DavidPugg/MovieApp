<template>
    <NuxtLink class="movie" :to="`/${isMovie}/${movie.id}`">
        <img class="movie__img" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="Movie img" />
        <SecondaryText :title="name" />
    </NuxtLink>
</template>

<script lang="ts">
    import { computed, defineComponent } from '@nuxtjs/composition-api';
    import SecondaryText from '../atoms/SecondaryText.vue';
    import { ActorMovie } from '~/interfaces/Actor';
    export default defineComponent({
        components: { SecondaryText },
        props: {
            movie: {
                type: Object as () => ActorMovie,
                required: true,
            },
        },
        setup({ movie }) {
            const name = computed((): String => {
                return (movie.title ? movie.title : movie.name) as String;
            });
            const isMovie = computed((): String => {
                return movie.title ? 'movie' : 'tv';
            });
            return { name, isMovie };
        },
    });
</script>

<style scoped lang="scss">
    .movie {
        display: flex;
        flex-direction: column;
        text-align: center;
        text-decoration: none;
        backface-visibility: hidden;
        transition: all 0.2s ease-out;

        &__img {
            height: 20rem;
            width: auto;
            border-radius: $border-radius-medium;
            margin-bottom: 1rem;
        }

        &:hover {
            transform: translateY(-3px) scale(1.03);
        }
    }
</style>
