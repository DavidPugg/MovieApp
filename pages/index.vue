<template></template>

<script>
export default {
  asyncData({ redirect }) {
    redirect({ name: "movies" });
  },
};
</script>
