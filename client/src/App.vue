<template>
  <NavBar></NavBar>
  <main>
    <router-view></router-view>
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
