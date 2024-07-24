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
            v-if="isSupported"
            @click="copy(roomCode)"
            class="rounded-lg p-2"
            :class="copied ? 'bg-green-600' : 'bg-sky-600  hover:bg-sky-500'"
          >
            <Icon
              v-if="!copied"
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
    <button
      :disabled="!isHost"
      @click="startGame"
      class="btn disabled:border-gray-400 disabled:text-gray-400 disabled:hover:bg-inherit"
    >
      Start
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import type { User } from "@hangmen/shared";
const { $io } = useNuxtApp();

const route = useRoute("game-id-lobby");
const roomCode = ref(route.params.id);
const { copy, copied, isSupported } = useClipboard();
const isHost = ref(false);

const players = useState<{ [id: string]: User } | null>("players", () => null);
const wordToGuess = useState<string[]>("wordToGuess");

const gameSettings = useState<{
  wordsPerGame: number;
  minWordLength: number;
  isHardMode: boolean;
}>("settings");

onMounted(() => {
  for (let playerKey in players.value) {
    if (players.value[playerKey].isHost && playerKey === $io.id) {
      isHost.value = true;
    }
  }
});

const startGame = () => {
  $io.emit(ClientEvents.START_GAME, gameSettings.value, (response) => {
    if (response.status === "ok") {
      wordToGuess.value = response.word;
      navigateTo({ path: `/game/${roomCode.value}/play` });
    }
  });
};

onBeforeUnmount(() => {
  $io.off(ServerEvents.NEW_PLAYER);
});
</script>
