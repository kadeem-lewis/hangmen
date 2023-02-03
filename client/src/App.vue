<template>
  <div class="container text-white min-h-screen m-auto">
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
  background-color: hsl(0, 0%, 7%);
}
</style>
