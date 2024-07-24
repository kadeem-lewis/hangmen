<template>
  <div class="flex items-center justify-between bg-dark-mode-500 px-2 py-1">
    <div class="flex flex-col items-center justify-center gap-px lg:flex-row">
      <Icon name="heroicons:clock" class="text-xl lg:text-2xl" />
      <span>{{ count }}s</span>
    </div>
    <div
      v-if="route.path === `/game/${roomCode}/play`"
      class="flex flex-col justify-center"
    >
      <span class="text-xs">{{ "player" }} is guessing</span>
      <AppHangmanWord />
    </div>
    <div v-else>Waiting...</div>
    <button
      class="rounded-md p-1 hover:bg-dark-mode-600"
      @click="leaveClick = true"
    >
      <Icon name="heroicons:home" class="text-xl lg:text-2xl" />
    </button>
    <UiDialog v-model:open="leaveClick">
      <UiDialogContent>
        <template #title>
          <p class="text-center text-2xl">Are you sure you want to leave?</p>
        </template>
        <div class="flex gap-4">
          <button class="btn text-base" @click="leaveGame">Yes</button>
          <button class="btn text-base" @click="leaveClick = false">
            Cancel
          </button>
        </div>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();
const hasLeftRoom = useState("hasLeftRoom", () => false);

const { count, reset, dec } = useCounter(30, { min: 0, max: 30 });

const { isActive } = useIntervalFn(() => {
  dec();
  if (count.value === 0) {
    reset();
  }
}, 1000);

const route = useRoute("game-id");
const roomCode = ref(route.params.id);

const leaveClick = ref(false);

const leaveGame = () => {
  $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value as string, (response) => {
    if (response.status === "ok") {
      hasLeftRoom.value = true;
      navigateTo({ path: "/mode" });
    } else {
      console.error("An error has occurred");
    }
  });
};
</script>
