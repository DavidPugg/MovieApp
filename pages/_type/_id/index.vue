<template>
    <div
        v-if="!fetchState.pending"
        class="backdrop"
        :style="{
            'background-image': `linear-gradient(to right bottom, rgba(0,0,0, .85), rgba(0,0,0, .85)), url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`,
        }"
    >
        <div class="container">
            <div class="content">
                <div class="head">
                    <h2 class="head__title heading-1">
                        <span class="head__title-main">{{ title }}</span>
                        <span v-for="genre in movie.genres" :key="genre.id" class="head__title-genre">{{
                            genre.name
                        }}</span>
                    </h2>
                    <div class="head__rating-box">
                        <p><b>Rating</b></p>
                        <p class="head__rating">
                            {{ movie.vote_average }}
                        </p>
                    </div>
                </div>
                <div class="details">
                    <p v-if="movie.overview" class="details__overview">
                        {{ movie.overview }}
                    </p>
                    <p v-else class="details__overview">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus at fugiat blanditiis
                        dignissimos inventore doloremque harum hic magnam quod tempore, laboriosam, similique repellat?
                        Illo voluptatem animi obcaecati quidem blanditiis! Autem.
                    </p>
                    <div class="details__stats">
                        <p class="details__budget">
                            <b>{{ statOneText }}</b>
                            {{ statOne }}
                        </p>
                        <p class="details__revenue">
                            <b>{{ statTwoText }}</b> {{ statTwo }}
                        </p>
                        <p class="details__runtime"><b>Runtime: </b> {{ statThree }}min</p>
                    </div>
                </div>
                <div v-if="trailer" class="gallery">
                    <iframe class="gallery__video" :src="`https://www.youtube.com/embed/${trailer.key}`" />
                    <NuxtLink class="gallery__button" :to="`${$route.path}/gallery`"> Videos </NuxtLink>
                </div>
                <div v-else class="poster">
                    <img class="img" :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" alt="Poster" />
                </div>
                <Cast type="cast" title="Cast" :items="cast.slice(0, 4)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { useFetch, useRoute, computed, ref } from '@nuxtjs/composition-api';
    import Cast from '~/components/organisms/Cast.vue';
    import { Movie, Tv, Video } from '~/interfaces/Movie';
    import { Actor } from '~/interfaces/Actor';
    import { fetchMovie, fetchMovieCredits, fetchMovieVideos } from '~/utils/MoviesAPI';
    export default {
        components: {
            Cast,
        },
        layout: 'noNavbar',
        setup() {
            const movie = ref<Movie | Tv>({} as Tv);
            const trailer = ref<{ key: string }>();
            const cast = ref<Actor[]>();
            const route = useRoute();
            const { params } = route.value;

            const title = computed(() => {
                return params.type === 'tv' ? (movie.value as Tv).name : (movie.value as Movie).original_title;
            });

            const statOne = computed(() => {
                return params.type === 'tv' ? (movie.value as Tv).number_of_seasons : (movie.value as Movie).budget;
            });

            const statTwo = computed(() => {
                return params.type === 'tv' ? (movie.value as Tv).number_of_episodes : (movie.value as Movie).revenue;
            });

            const statThree = computed(() => {
                return params.type === 'tv' ? (movie.value as Tv).episode_run_time[0] : (movie.value as Movie).runtime;
            });

            const statOneText = computed(() => {
                return params.type === 'tv' ? 'Seasons: ' : 'Budget: $';
            });

            const statTwoText = computed(() => {
                return params.type === 'tv' ? 'Episodes: ' : 'Revenue: $';
            });

            const { fetch, fetchState } = useFetch(async ({ $route }) => {
                const { type, id } = $route.params;

                movie.value = await fetchMovie({ type, id });
                const videos = await fetchMovieVideos({ type, id });
                const credits = await fetchMovieCredits({ type, id });

                cast.value = credits.cast;
                trailer.value = videos.results.find((t: Video) => t.type === 'Trailer');
            });

            fetch();

            return {
                fetchState,
                movie,
                trailer,
                cast,
                title,
                statOne,
                statTwo,
                statThree,
                statOneText,
                statTwoText,
            };
        },
    };
</script>

<style scoped lang="scss">
    .backdrop {
        min-height: 100vh;
        background-position: center;
        background-size: cover;
    }

    .content {
        grid-column: main-start / main-end;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-auto-rows: min-content;
        grid-column-gap: 3rem;
        grid-row-gap: 5rem;
    }

    .head {
        grid-column: 1 / -1;
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: $size-medium) {
            flex-direction: column;
        }

        &__title {
            display: flex;
            align-items: center;
            flex-wrap: wrap;

            @media only screen and (max-width: $size-medium) {
                justify-content: center;
            }

            &-main {
                margin-bottom: 1rem;
                flex: 0 0 100%;
                @media only screen and (max-width: $size-medium) {
                    text-align: center;
                }
            }

            &-genre {
                font-size: 1.3rem;
                border: 2px solid $color-primary-dark;
                padding: 0.5rem 1rem;
                border-radius: $border-radius-medium;

                &:first-child {
                    margin-left: 2rem;
                }

                &:not(:last-child) {
                    margin-right: 1rem;
                }
            }
        }

        &__rating-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            @media only screen and (max-width: $size-medium) {
                margin-top: 2rem;
            }

            p:first-child {
                text-transform: uppercase;
                color: white;
                font-size: 1.4rem;
            }
        }

        &__rating {
            border: none;
            color: transparent;
            line-height: 1;

            font-weight: 600;
            font-size: 3rem;
            background-image: linear-gradient(to right bottom, $color-primary-light, $color-primary-dark);
            background-clip: text;
        }
    }

    .gallery {
        grid-column: 3 / 5;
        grid-row: span 2;

        display: flex;
        flex-direction: column;

        @media only screen and (max-width: $size-medium) {
            grid-column: 1 / -1;
        }

        &__video {
            width: 100%;
            height: 40rem;
            border: none;
        }

        &__button {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $color-secondary-light;
            font-size: 1.6rem;
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 3rem 0;
            transition: all 0.2s ease;
            border-bottom-left-radius: $border-radius-medium;
            border-bottom-right-radius: $border-radius-medium;

            &:hover {
                background-color: $color-primary-dark;
                box-shadow: 0 1rem 2rem rgba($color: #000000, $alpha: 0.5);
            }
        }
    }

    .poster {
        grid-column: 3 / 5;
        grid-row: span 2;

        display: flex;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: $size-medium) {
            grid-column: 1 / -1;
        }
    }

    .details {
        grid-column: 1 / 3;
        grid-row: span 2;
        color: white;
        display: flex;
        flex-direction: column;
        font-size: 1.6rem;

        @media only screen and (max-width: $size-medium) {
            text-align: center;
            grid-column: 1 / -1;
        }

        & > *:not(:last-child) {
            padding-bottom: 2rem;
        }

        & > *:not(:first-child) {
            padding-top: 2rem;
        }

        &__overview {
            flex: 1;
            grid-column: 1 / -1;
            border-bottom: 1px solid $color-primary-light;
        }

        &__stats {
            display: flex;
            justify-content: space-around;
        }

        &__logos {
            grid-column: 1 / -1;
            margin-top: auto;
            background-color: $color-secondary-light;
            padding: 3rem;
            border-radius: $border-radius-medium;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-around;
            color: $color-primary-dark;
            font-size: 1.3rem;

            img {
                width: 7rem;
            }
        }
    }

    .cast {
        grid-column: 1 / -1;

        margin-top: 5rem;

        display: grid;
        grid-template-rows: repeat(3, min-content);
        grid-row-gap: 2rem;

        &__title {
            line-height: 1;
            border-bottom: 1px solid $color-primary-light;
            padding-bottom: 1rem;
        }
    }

    .actors {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(26rem, 1fr));
        justify-items: flex-start;
        gap: 2rem;
    }

    .actor {
        display: flex;
        gap: 1.5rem;

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

        &__name {
            color: $color-primary-dark;
        }

        &__character-name {
            display: flex;
            flex-wrap: wrap;
            color: white;
            margin-left: 0.5rem;
        }
    }
</style>
