<template>
    <NuxtLink class="modal" :to="{ path: `/${$route.params.type}/${$route.params.id}/gallery` }">
        <iframe
            class="video"
            :src="`https://www.youtube.com/embed/${$route.params.videoId}?autoplay=1&cc_load_policy=1`"
            allow="autoplay"
            allowfullscreen
            frameborder="0"
        />
    </NuxtLink>
</template>

<style scoped lang="scss">
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba($color: #000000, $alpha: 0.3);

        display: flex;
        justify-content: center;
    }

    .video {
        margin: 15vh;
        height: 70vh;
        width: 70%;
    }
</style>
