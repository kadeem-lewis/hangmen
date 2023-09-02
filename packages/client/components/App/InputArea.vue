<template>
  <form class="relative flex" @submit.prevent="sendMessage">
    <input
      type="text"
      class="grow rounded-sm bg-dark-mode-400 py-2 pl-4 pr-12 outline-none"
      placeholder="Enter Message..."
      v-model="chatInput"
    />
    <button
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-dark-mode-600"
    >
      <Icon name="heroicons:paper-airplane" size="24" />
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
