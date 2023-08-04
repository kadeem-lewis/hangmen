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
const { $io } = useNuxtApp();
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

const chatInput = ref("");

const getId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 9) + 1;
  return `${timestamp}-${random}`;
};

const sendMessage = () => {
  $io?.emit("send-message", getId(), chatInput.value);
  chatInput.value = "";
};
</script>
