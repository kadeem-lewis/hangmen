<template>
  <div class="container text-white min-h-screen">
    <NavBar></NavBar>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
export default {
  components: {
    NavBar,
  },
};
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  background-color: black;
}
</style>
