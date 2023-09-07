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
            <Icon
              v-if="!isCopied"
              icon="mdi:clipboard"
              :inline="true"
              class="text-2xl"
            />
            <Icon
              v-else
              icon="mdi:clipboard-check"
              :inline="true"
              class="text-2xl"
            />
          </button>
        </div>
      </div>
    </AppGameSettings>

    <div>
      <button v-if="true" :disabled="false" @click="startGame" class="btn">
        Start
      </button>
      <button
        v-else
        @click="readyUp"
        class="rounded-lg border text-xl font-semibold transition-colors hover:bg-white hover:text-black"
      >
        {{ isReady ? "Ready" : "Not Ready" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
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
