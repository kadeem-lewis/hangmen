<template>
  <div class="flex justify-between bg-gray-900 p-2">
    <div class="flex items-center justify-center gap-1">
      <UIcon name="i-heroicons-clock-solid" />
      <span>{{ "30" }}s</span>
    </div>
    <p class="text-center text-3xl">Waiting...</p>
    <UButton icon="i-heroicons-home-solid" variant="ghost" @click="leaveGame" />
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
