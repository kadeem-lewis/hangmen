<template>
  <div class="container text-white min-h-screen m-auto">
    <NavBar />
    <main class="mt-16">
      <RouterView />
    </main>
  </div>
</template>
<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import SocketIoService from "./services/SocketIoService";
import { onMounted, ref } from "vue";
const socket = ref();

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();

  socket.value.on("connect", () => {
    console.log("user connected");
  });
});
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
