<template>
    <div v-if="!fetchState.pending" class="container">
        <div class="content">
            <h1 class="title heading-1">
                {{ name }}
            </h1>
            <div class="movies">
                <ActorMovieItem v-for="item in items.cast" :key="item.id" :movie="item" />
            </div>
        </div>
        <NuxtChild />
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref, useFetch, useRoute, useRouter } from '@nuxtjs/composition-api';
    import { fetchPersonMovieCredits, fetchPersonTvCredits } from '~/utils/PersonAPI';
    import { Movie, Tv } from '~/interfaces/Movie';
    export default defineComponent({
        layout: 'noNavbar',

        setup() {
            const router = useRouter();
            const route = useRoute();
            const { query } = route.value;
            const items = ref<Movie[] | Tv[]>([]);

            const name = computed(() => {
                return query.t === 'tv' ? 'Tv shows' : 'Movies';
            });

            const openVideo = (id: Number) => {
                router.push(`${route.value.path}/${id}`);
            };

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { actorId } = $route.params;
                if (query.t === 'movies') {
                    items.value = await fetchPersonMovieCredits(actorId);
                } else {
                    items.value = await fetchPersonTvCredits(actorId);
                }
            });
            fetch();
            return { items, name, openVideo, fetchState };
        },
    });
</script>

<style lang="scss" scoped>
    .content {
        padding: 10rem 0;
        grid-column: main-start / main-end;
    }

    .title {
        line-height: 1;
        border-bottom: 1px solid $color-primary-light;
        padding-bottom: 1rem;
    }

    .movies {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
        justify-items: center;
        grid-column-gap: 0.5rem;
        grid-row-gap: 2rem;
        margin-top: 2rem;
    }
</style>
