<template>
    <div class="items">
        <h2 class="heading-2">{{ title }}</h2>
        <div v-if="type == 'movies'" class="items-list">
            <ActorMovieItem v-for="item in items" :key="item.id" :movie="item" />
        </div>
        <div v-else class="items-list">
            <ActorItem v-for="actor in items" :key="actor.id" :actor="actor" />
        </div>
        <ShowMoreButton :go-to="{ path: `${$route.path}/${type}`, query: { t: type === 'movies' ? 'movies' : undefined } }" />
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api';
    import { Actor, ActorMovie } from '~/interfaces/Actor';

    export default defineComponent({
        props: {
            type: {
                type: String,
                enum: ['cast', 'movies'],
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            items: {
                type: Array as () => Actor[] | ActorMovie[],
                required: true,
            },
        },
    });
</script>

<style lang="scss" scoped>
    .items {
        grid-column: 1 / -1;
        display: grid;
        grid-template-rows: repeat(3, min-content);
        grid-row-gap: 2rem;

        margin-top: 3rem;

        &__title {
            line-height: 1;
            border-bottom: 1px solid $color-primary-light;
            padding-bottom: 1rem;
        }

        &-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
            justify-items: center;
        }
    }
</style>
