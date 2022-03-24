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
        color: white;
        font-size: 1.4rem;
        z-index: 1000000;
    }
</style>
