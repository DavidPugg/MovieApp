<template>
    <main class="container">
        <div class="dropdown">
            <DropDown :items="movieLinks" />
        </div>
        <MovieList />
    </main>
</template>

<script>
    import { defineComponent } from '@nuxtjs/composition-api';

    export default defineComponent({
        setup() {
            const movieLinks = [
                {
                    name: 'Popular',
                    value: 'popular',
                },
                {
                    name: 'Latest',
                    value: 'latest',
                },
                {
                    name: 'Top rated',
                    value: 'top_rated',
                },
                {
                    name: 'Now playing',
                    value: 'now_playing',
                },
                {
                    name: 'Upcoming',
                    value: 'upcoming',
                },
            ];
            return { movieLinks };
        },
    });
</script>

<style lang="scss" scoped>
    .container {
        grid-row-gap: 2rem;
    }

    .dropdown {
        grid-column: main-start / main-end;
    }
</style>
