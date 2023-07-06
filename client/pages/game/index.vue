<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <NuxtPage />
      <InputArea />
    </div>
    <ChatBox class="h-full grid-col-span-1" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import SocketIoService from "../../services/SocketIoService";
import { Socket } from "socket.io-client";

const socket = ref<Socket | null>(null);

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
});

// onBeforeRouteEnter((to, from, next) => {
//   if (from.name === "game-mode") {
//     next();
//   }
//   next({ name: "game-mode" });
// });

// onBeforeRouteLeave((to, from, next) => {
//   socket.value?.emit("leave-room");
//   next();
// });
</script>
