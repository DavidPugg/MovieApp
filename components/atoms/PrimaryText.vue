<template>
    <div>
        <h2 class="title">{{ title }}</h2>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@nuxtjs/composition-api';

    export default defineComponent({
        props: {
            title: {
                type: String,
                required: true,
            },
        },
    });
</script>

<style lang="scss" scoped>
    .title {
        color: $color-primary-dark;
        font-size: 1.6rem;
    }
</style>
