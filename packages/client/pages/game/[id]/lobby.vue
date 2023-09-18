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
    <button
      :disabled="!isHost"
      @click="startGame"
      class="btn disabled:border-gray-400"
    >
      Start
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { User } from "@hangmen/shared";
const { $io } = useNuxtApp();

const route = useRoute();
const roomCode = ref(route.params.id as string);
const isCopied = ref(false);
const isHost = ref(false);

const players = useState<{ [id: string]: User } | null>("players", () => null);
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
  $io.emit(ClientEvents.START_GAME, gameSettings.value, (response) => {});
  navigateTo({ path: `/game/${roomCode.value}/play` });
};
const copyCode = () => {
  navigator.clipboard.writeText(roomCode.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};

onBeforeUnmount(() => {
  $io.off(ServerEvents.NEW_PLAYER);
});
</script>
