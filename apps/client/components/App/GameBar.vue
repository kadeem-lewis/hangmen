<template>
  <div
    class="flex items-center justify-between rounded-lg bg-gray-900 px-2 py-1 shadow ring-1 ring-gray-200 dark:ring-gray-800"
  >
    <div class="flex flex-col items-center justify-center gap-px lg:flex-row">
      <UIcon name="i-heroicons-clock" class="text-xl lg:text-2xl" />
      <span>{{ count }}s</span>
    </div>
    <div
      v-if="route.path === `/game/${roomCode}/play`"
      class="flex flex-col justify-center"
    >
      <span class="text-xs">{{ currentPlayer?.username }} is guessing</span>
      <AppHangmanWord />
    </div>
    <div v-else>Waiting...</div>
    <UButton
      class="rounded-md p-1 hover:bg-dark-mode-600"
      variant="ghost"
      @click="leaveClick = true"
    >
      <UIcon name="i-heroicons-home" class="text-xl lg:text-2xl" />
    </UButton>
    <UModal v-model="leaveClick">
      <p class="text-center text-2xl">Are you sure you want to leave?</p>
      <div class="flex gap-4">
        <UButton @click="leaveGame(roomCode)">Yes</UButton>
        <UButton @click="leaveClick = false"> Cancel </UButton>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const { leaveGame } = useRoomStore();
const { currentPlayer } = storeToRefs(useGameStore());

const { count, reset, dec } = useCounter(30, { min: 0, max: 30 });

useIntervalFn(() => {
  dec();
  if (count.value === 0) {
    reset();
  }
}, 1000);

const route = useRoute("game-id");
const roomCode = ref(route.params.id);

const leaveClick = ref(false);
</script>
