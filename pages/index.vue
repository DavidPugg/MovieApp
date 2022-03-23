<template>
    <main class="container">
        <div class="dropdown">
            <DropDown :items="SortLinks" />
        </div>
        <MovieList />
    </main>
</template>

<script>
    import { defineComponent } from '@nuxtjs/composition-api';
    export default defineComponent({
        setup() {
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
