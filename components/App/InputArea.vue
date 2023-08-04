<template>
  <form class="flex relative" @submit.prevent="sendMessage">
    <input
      type="text"
      class="grow rounded-sm px-4 py-2 outline-none bg-dark-mode-400"
      placeholder="Enter Message..."
      v-model="chatInput"
    />
    <button
      class="absolute right-2 p-1 rounded-md hover:bg-dark-mode-600 top-1/2 -translate-y-1/2"
    >
      <PaperAirplaneIcon class="h-6 w-6" />
    </button>
  </form>
</template>
<script setup lang="ts">
import SocketIoService from "../../services/SocketIoService";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
import { Socket } from "socket.io-client";

const socket = ref<Socket | null>(null);
const chatInput = ref("");

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
});

const getId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9) + 1;
  return `${timestamp}-${random}`;
};

const sendMessage = () => {
  socket.value?.emit("send-message", getId(), chatInput.value);
  chatInput.value = "";
};
</script>
