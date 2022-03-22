<template></template>

<script>
import { useAsync, useRouter } from "@nuxtjs/composition-api";
export default {
  setup() {
    const router = useRouter();
    useAsync(() => {
      router.push({ name: "movies" });
    });
  },
};
</script>
