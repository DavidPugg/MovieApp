<template>
    <NuxtLink class="actor" :to="{ path: `/actor/${actor.id}` }">
        <img
            width="200"
            height="300"
            class="actor__img"
            :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`"
            alt="Actor img"
        />
        <div class="names">
            <PrimaryText :title="actor.name" />
            <SecondaryText :title="actor.character" />
        </div>
    </NuxtLink>
</template>

<script lang="ts">
    import PrimaryText from '../atoms/PrimaryText.vue';
    import SecondaryText from '../atoms/SecondaryText.vue';
    import { Actor } from '~/interfaces/Actor';
    export default {
        components: { PrimaryText, SecondaryText },
        props: {
            actor: {
                type: Object as () => Actor,
                required: true,
            },
        },
    };
</script>

<style scoped lang="scss">
    .actor {
        display: grid;
        grid-template-rows: repeat(2, min-content);
        justify-items: center;
        grid-gap: 1rem;
        transition: all 0.2s ease-out;
        text-decoration: none;
        backface-visibility: hidden;

        &__img {
            border-radius: $border-radius-medium;
        }

        &__names {
            text-align: center;
        }

        &:hover {
            transform: translateY(-3px) scale(1.03);
        }
    }
</style>
