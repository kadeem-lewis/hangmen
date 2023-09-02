<template>
  <div class="relative">
    <UInput
      type="text"
      :ui="{ rounded: 'rounded-none' }"
      class="py-2 pl-4 pr-8 outline-none"
      placeholder="Enter Message..."
      v-model="chatInput"
    />
    <UButton
      @click="sendMessage"
      variant="ghost"
      icon="i-heroicons-paper-airplane-solid"
      class="absolute right-1 top-1/2 -translate-y-1/2 p-1"
    />
  </div>
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
