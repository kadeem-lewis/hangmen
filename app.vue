<template>
  <div class="container text-white min-h-screen m-auto">
    <NavBar />
    <main class="mt-16 max-w-md md:max-w-3xl m-auto">
      <NuxtPage />
    </main>
  </div>
</template>
<script setup lang="ts">
const { $io } = useNuxtApp();
import SocketIoService from "./services/SocketIoService";
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
