<template>
  <div class="flex h-full flex-col justify-between">
    <AppGameSettings>
      <div>
        <p class="text-lg font-bold">Room Code:</p>
        <div class="py-2 text-2xl">
          <span class="mr-2 rounded-lg bg-dark-mode-400 p-2 font-bold">{{
            roomCode
          }}</span>
          <button
            @click="copyCode()"
            class="rounded-lg p-2"
            :class="isCopied ? 'bg-green-600' : 'bg-sky-600  hover:bg-sky-500'"
          >
            <Icon v-if="!isCopied" name="mdi:clipboard" size="24" />
            <Icon v-else name="mdi:clipboard-check" size="24" />
          </button>
        </div>
      </div>
    </AppGameSettings>

    <div class="flex">
      <UButton
        :color="isReady ? 'green' : 'red'"
        @click="readyUp"
        class="m-2 w-1/2 rounded-full text-xl font-semibold transition-colors"
        :class="
          isReady
            ? 'bg-green-600 hover:bg-green-500'
            : 'bg-red-600 py-2 hover:bg-red-500'
        "
      >
        {{ isReady ? "Ready" : "Not Ready" }}
      </UButton>
      <UButton
        :disabled="false"
        @click="startGame"
        class="m-2 w-1/2 rounded-full py-2 text-xl font-semibold"
      >
        Start
      </UButton>
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
