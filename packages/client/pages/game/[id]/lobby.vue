<template>
  <div class="flex h-full flex-col justify-between">
    <AppGameSettings>
      <div>
        <p class="text-lg font-bold">Room Code:</p>
        <div class="py-2 text-2xl">
          <span class="mr-2 rounded-lg bg-gray-800 p-2 font-bold">{{
            roomCode
          }}</span>
          <UButton
            @click="copyCode()"
            class="rounded-lg p-2"
            :icon="!isCopied ? 'i-mdi-clipboard' : 'i-mdi-clipboard-check'"
            :color="!isCopied ? 'blue' : 'green'"
          >
          </UButton>
        </div>
      </div>
    </AppGameSettings>

    <UButton
      v-if="false"
      :color="isReady ? 'green' : 'red'"
      @click="readyUp"
      class="m-2 text-xl font-semibold transition-colors"
    >
      {{ isReady ? "Ready" : "Not Ready" }}
    </UButton>
    <UButton
      v-else
      :disabled="false"
      @click="startGame"
      class="m-2 py-2 text-xl font-semibold"
    >
      Start
    </UButton>
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
