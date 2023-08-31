<template>
  <form class="relative flex" @submit.prevent="sendMessage">
    <UInput
      type="text"
      class="grow rounded-sm bg-dark-mode-400 px-4 py-2 outline-none"
      placeholder="Enter Message..."
      v-model="chatInput"
    />
    <UButton
      @click="sendMessage"
      variant="ghost"
      icon="i-heroicons-paper-airplane-solid"
      class="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 hover:bg-dark-mode-600"
    >
    </UButton>
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
