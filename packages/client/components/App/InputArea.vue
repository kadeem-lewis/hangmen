<template>
  <form class="relative flex" @submit.prevent="sendMessage">
    <UInput
      id="chat-input"
      v-model="chatInput"
      placeholder="Enter Message..."
      class="w-full"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          icon="i-heroicons-paper-airplane"
          variant="ghost"
          type="submit"
        />
      </template>
    </UInput>
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
