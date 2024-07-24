<template>
  <div class="flex items-center justify-between bg-dark-mode-500 px-2 py-1">
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
    <button
      @click="leaveClick = true"
      class="rounded-md p-1 hover:bg-dark-mode-600"
    >
      <Icon icon="heroicons:home" :inline="true" class="text-xl lg:text-2xl" />
    </button>
    <UiModal v-model="leaveClick">
      <p class="text-center text-2xl">Are you sure you want to leave?</p>
      <div class="flex gap-4">
        <button @click="leaveGame" class="btn text-base">Yes</button>
        <button @click="leaveClick = false" class="btn text-base">
          Cancel
        </button>
      </div>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { $io } = useNuxtApp();
const hasLeftRoom = useState("hasLeftRoom", () => false);

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
