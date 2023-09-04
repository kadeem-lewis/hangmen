<template>
  <div class="flex justify-between bg-dark-mode-500 px-2 py-1">
    <div class="flex flex-col items-center justify-center gap-1 lg:flex-row">
      <span> <Icon name="heroicons:clock" size="24" /></span>
      <span>{{ "30" }}s</span>
    </div>
    <div class="flex flex-col justify-center">
      <span class="text-xs">{{ "player" }} is guessing</span>
      <AppHangmanWord />
    </div>
    <button @click="leaveGame">
      <Icon name="heroicons:home" size="24" />
    </button>
  </div>
</template>

<script setup lang="ts">
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
