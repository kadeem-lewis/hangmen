<template>
  <UCard class="flex h-full flex-col justify-between">
    <AppGameSettings>
      <div>
        <p class="text-lg font-bold">Room Code:</p>
        <div class="py-2 text-2xl">
          <span class="mr-2 rounded-lg bg-dark-mode-400 p-2 font-bold">{{
            roomCode
          }}</span>
          <button
            v-if="isSupported"
            class="rounded-lg p-2"
            :class="copied ? 'bg-green-600' : 'bg-sky-600  hover:bg-sky-500'"
            @click="copy(roomCode)"
          >
            <UIcon v-if="!copied" name="i-mdi-clipboard" class="text-2xl" />
            <UIcon v-else name="i-mdi-clipboard-check" class="text-2xl" />
          </button>
        </div>
      </div>
    </AppGameSettings>
    <template #footer>
      <UButton :disabled="!isHost" block padded @click="startGame">
        Start
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const route = useRoute("game-id-lobby");
const roomCode = ref(route.params.id);
const { copy, copied, isSupported } = useClipboard();
const isHost = ref(false);

const { players } = storeToRefs(useRoomStore());
const wordToGuess = useState<string[]>("wordToGuess");

const gameSettings = useState<{
  wordsPerGame: number;
  minWordLength: number;
  isHardMode: boolean;
}>("settings");

onMounted(() => {
  for (const [key, player] of players.value) {
    if (player.isHost && key === $io.id) {
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
</script>
