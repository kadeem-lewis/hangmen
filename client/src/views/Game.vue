<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <RouterView />
      <InputArea />
    </div>
    <ChatBox class="h-full grid-col-span-1" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeRouteEnter, onBeforeRouteLeave } from "vue-router";
import SocketIoService from "../services/SocketIoService";
import ChatBox from "../components/App/ChatBox.vue";
import InputArea from "../components/App/InputArea.vue";

const socket = ref(null);

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
});

// onBeforeRouteEnter((to, from, next) => {
//   if (from.name === "game-mode") {
//     next();
//   }
//   next({ name: "game-mode" });
// });

onBeforeRouteLeave((to, from, next) => {
  socket.value.emit("leave-room");
  next();
});
</script>
