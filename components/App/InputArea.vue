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
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";
const route = useRoute();
const roomCode = ref(route.params.id);
const chatInput = ref("");

const sendMessage = () => {
  $io.emit(ClientEvents.SEND_MESSAGE, nanoid, chatInput.value, roomCode.value);
  chatInput.value = "";
};
</script>
