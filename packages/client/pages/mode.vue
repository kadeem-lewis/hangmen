<template>
  <div class="m-auto max-w-4xl">
    <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="flex items-end justify-center rounded-lg border p-8">
        <button
          class="btn rounded-lg py-2 text-xl font-semibold"
          @click="createGame"
        >
          Create Game
        </button>
      </div>
      <div class="flex flex-col justify-center gap-4 rounded-lg border p-8">
        <input
          v-model="gameCode"
          type="text"
          placeholder="Enter Room Code"
          class="mx-2 rounded-md bg-dark-mode-400 px-4 py-2 outline-none"
        >
        <button
          class="btn mx-auto py-2 text-xl font-semibold"
          @click="joinGame"
        >
          Join Game
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User, Message } from "@hangmen/shared";
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();

const gameCode = ref("");
const players = useState<{ [id: string]: User } | null>("players", () => null);
const messages = useState<Message[]>("messages", () => []);

// Set up event listener on component mount
onMounted(() => {
  $io.on(ServerEvents.CREATE_ROOM, (roomCode) => {
    $io.emit(ClientEvents.JOIN_ROOM, roomCode, (response) => {
      const date = useDateFormat(useNow(), "HH:mm");

      if (response.data) {
        players.value = response.data.playerList;

        const message = {
          id: nanoid(),
          sender: response.data.player.username,
          text: `has joined the game.`,
          time: date.value,
        };
        messages.value.push(message);
      }
    });
    navigateTo({
      path: `/game/${roomCode}/lobby`,
    });
  });
});

// Remove event listener on component unmount
onUnmounted(() => {
  $io.off(ServerEvents.CREATE_ROOM);
});
const createGame = () => {
  $io.emit(ClientEvents.REQUEST_ROOM_CODE);
};

const joinGame = () => {
  const room = gameCode.value.toString().toUpperCase();
  $io.emit(ClientEvents.JOIN_ROOM, room, (response) => {
    if (response.status === "ok") {
      const date = useDateFormat(useNow(), "HH:mm");

      if (response.data) {
        players.value = response.data.playerList;

        const message = {
          id: nanoid(),
          sender: response.data.player.username,
          text: `has joined the game.`,
          time: date.value,
        };
        messages.value.push(message);
      }

      navigateTo({
        path: `/game/${room}/lobby`,
      });
    } else {
      alert(response.message);
    }
  });
};
</script>
