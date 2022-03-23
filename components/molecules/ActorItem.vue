<template>
    <NuxtLink :to="{ path: `/actor/${actor.id}` }" class="actor">
        <img class="actor__img" :src="`https://image.tmdb.org/t/p/w200${actor.profile_path}`" alt="Actor img" />
        <div class="actor__names">
            <PrimaryText :title="actor.name" />
            <SecondaryText :title="actor.character" />
        </div>
    </NuxtLink>
</template>

<script lang="ts">
    import PrimaryText from '~/components/atoms/PrimaryText.vue';
    import SecondaryText from '~/components/atoms/SecondaryText.vue';
    import { Actor } from '~/interfaces/Actor';
    export default {
        components: {
            PrimaryText,
            SecondaryText,
        },
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
        display: flex;
        gap: 1.5rem;
        text-decoration: none;
        backface-visibility: hidden;
        transition: all 0.2s ease-out;

        &__img {
            width: auto;
            height: 10rem;
            border-radius: $border-radius-small;
        }

        &__names {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 1.6rem;
        }

        &:hover {
            transform: translateY(-3px) scale(1.03);
        }
    }
</style>
