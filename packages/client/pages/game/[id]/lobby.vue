<template>
  <div>
    <AppGameSettings />

    <div>
      <p class="font-bold text-lg">Room Code:</p>
      <div class="py-2 text-2xl">
        <span class="p-2 rounded-lg bg-dark-mode-400 mr-2 font-bold">{{
          roomCode
        }}</span>
        <button
          @click="copyCode()"
          class="rounded-lg p-2 bg-sky-600 hover:bg-sky-500"
        >
          <Icon v-if="!isCopied" name="mdi:clipboard" size="1.5rem" />
          <Icon v-else name="mdi:clipboard-check" size="1.5rem" />
        </button>
      </div>
    </div>
    <div class="flex">
      <button
        @click="readyUp"
        class="rounded-full m-2 font-semibold text-xl w-1/2 transition-colors"
        :class="
          isReady
            ? 'bg-green-600 hover:bg-green-500'
            : 'bg-red-600 py-2 hover:bg-red-500'
        "
      >
        {{ isReady ? "Ready" : "Not Ready" }}
      </button>
      <button
        @click="startGame"
        class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/2"
      >
        Start
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const route = useRoute();
const roomCode = ref("");
const isCopied = ref(false);
const isReady = ref(false);
onMounted(() => {
  roomCode.value = route.params.id as string;
});

const startGame = () => {
  navigateTo({ path: `/game/${roomCode.value}/play` });
};
const readyUp = () => {
  isReady.value = !isReady.value;
  $io.emit(ClientEvents.PLAYER_READY, isReady.value);
};
const copyCode = () => {
  navigator.clipboard.writeText(roomCode.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};
</script>
