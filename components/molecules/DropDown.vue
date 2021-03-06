<template>
    <div class="sort" @click.stop="showDropdown">
        <p class="sort-current">
            {{ mainName }}
            <svg class="sort-current-arrow" :class="{ rotateArrow: dropdown }">
                <use xlink:href="~/assets/svgs.svg#icon-chevron-left" />
            </svg>
        </p>
        <transition name="dropdown">
            <div v-if="dropdown" v-click-outside="showDropdown" class="sort-dropdown" @click="showDropdown">
                <NuxtLink
                    v-for="item in items"
                    :key="item"
                    class="sort-dropdown__item"
                    :class="{ hidden: mainName == item }"
                    :to="{ name: $route.name, query: { ...$route.query, q: getValue(item), page: 1 } }"
                    @click.native="showDropdown"
                >
                    {{ item }}
                </NuxtLink>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref, useRoute } from '@nuxtjs/composition-api';

    export default defineComponent({
        props: {
            items: {
                type: Array as () => String[],
                required: true,
            },
        },
        setup({ items }) {
            const route = useRoute();
            const dropdown = ref<Boolean>(false);
            const mainName = computed((): String => {
                return !route.value.query.q
                    ? items[0]
                    : (items.find((e: String) => getValue(e) === route.value.query.q) as String);
            });
            const getValue = (item: String) => {
                return item.toLowerCase().replace(' ', '_');
            };

            const showDropdown = () => {
                dropdown.value = !dropdown.value;
            };
            return { dropdown, mainName, showDropdown, getValue };
        },
    });
</script>

<style lang="scss" scoped>
    %item-data {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1.5rem 2.5rem;
        color: white;
        transition: all 0.2s ease;
        background-color: $color-secondary-light;
    }

    .sort {
        position: relative;
        font-size: 1.8rem;
        user-select: none;
        z-index: 2000;
        backface-visibility: hidden;

        border-top-left-radius: $border-radius-medium;
        border-top-right-radius: $border-radius-medium;

        @extend %item-data;

        @media only screen and (max-width: $size-small) {
            width: 100%;
        }

        &:hover {
            background-color: $color-primary-dark;
        }

        &-current {
            cursor: pointer;

            display: flex;
            justify-content: center;
            align-items: center;

            &-arrow {
                fill: white;
                width: 2.5rem;
                height: 2.5rem;
                transform: rotate(180deg);
                transition: all 0.2s ease;
            }
        }

        &-dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            overflow: hidden;

            display: flex;
            flex-direction: column;
            border-bottom-left-radius: $border-radius-medium;
            border-bottom-right-radius: $border-radius-medium;

            &__item {
                text-decoration: none;

                @extend %item-data;

                &:hover {
                    background-color: $color-primary-dark;
                }
            }
        }
    }

    .hidden {
        display: none;
    }

    .rotateArrow {
        transform: rotate(270deg);
    }

    .dropdown-enter-active,
    .dropdown-leave-active {
        transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
    }

    .dropdown-enter,
    .dropdown-leave-to {
        opacity: 0;
    }
</style>
