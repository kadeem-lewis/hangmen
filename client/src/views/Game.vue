<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <RouterView></RouterView>
      <InputArea></InputArea>
    </div>
    <ChatBox class="h-full grid-col-span-1"></ChatBox>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeRouteEnter, onBeforeRouteLeave } from "vue";
import SocketIoService from "../services/SocketIoService";
import ChatBox from "../components/App/ChatBox.vue";
import InputArea from "../components/App/InputArea.vue";

const socket = ref(null);

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
});

onBeforeRouteEnter((to, from, next) => {
  if (from.name === "game-mode") {
    next();
  }
  next({ name: "game-mode" });
});

onBeforeRouteLeave((to, from, next) => {
  socket.value.emit("leave-room");
  next();
});
</script>
