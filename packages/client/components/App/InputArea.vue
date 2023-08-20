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
      <Icon name="material-symbols:send" size="1.5rem" />
    </button>
  </form>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();
const chatInput = ref("");

const sendMessage = () => {
  $io.emit(ClientEvents.SEND_MESSAGE, nanoid(), chatInput.value);
  chatInput.value = "";
};
</script>
