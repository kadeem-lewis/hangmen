<template>
  <div class="flex flex-row justify-between bg-dark-mode-500 p-2">
    <div>
      <span> <Icon name="heroicons:clock" size="24" /></span>
      <span>{{ "30" }}s</span>
    </div>
    <p class="text-center text-3xl">Waiting...</p>
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
