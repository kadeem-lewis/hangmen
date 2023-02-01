<template>
  <NavBar></NavBar>
  <main>
    <RouterView></RouterView>
  </main>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style scoped></style>
