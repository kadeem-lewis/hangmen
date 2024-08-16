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
      <UButton
        :disabled="!players.get($io.id!)?.isHost"
        block
        padded
        @click="startGame"
      >
        Start
      </UButton>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();
const { startGame } = useGameStore();

const route = useRoute("game-id-lobby");
const roomCode = ref(route.params.id);
const { copy, copied, isSupported } = useClipboard();

const { players } = storeToRefs(useRoomStore());
</script>
