<template>
  <div class="flex justify-between bg-dark-mode-500 px-2 py-1">
    <div class="flex flex-col items-center justify-center gap-px lg:flex-row">
      <Icon icon="heroicons:clock" :inline="true" class="text-xl lg:text-2xl" />
      <span>{{ "30" }}s</span>
    </div>
    <div
      v-if="route.path === `/game/${roomCode}/play`"
      class="flex flex-col justify-center"
    >
      <span class="text-xs">{{ "player" }} is guessing</span>
      <AppHangmanWord />
    </div>
    <div v-else>Waiting...</div>
    <button @click="leaveGame">
      <Icon icon="heroicons:home" :inline="true" class="text-xl lg:text-2xl" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { $io } = useNuxtApp();

const route = useRoute();
const roomCode = ref(route.params.id);

const leaveGame = () => {
  $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value as string, (response) => {
    if (response.status === "ok") {
      navigateTo({ path: "/mode" });
    } else {
      console.error("An error has occurred");
    }
  });
};
</script>
