<template>
    <main class="container">
        <div class="dropdown">
            <DropDown :items="dropdownItems" />
        </div>
        <MovieList />
    </main>
</template>

<script>
    import { defineComponent } from '@nuxtjs/composition-api';

    const dropdownItems = ['Popular', 'Latest', 'Top rated', 'Now playing', 'Upcoming'];

    export default defineComponent({
        setup() {
            return { dropdownItems };
        },
    });
</script>
