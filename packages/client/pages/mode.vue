<template>
  <div>
    <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
    <div class="grid gap-8 lg:grid-cols-2">
      <UCard>
        <UButton @click="createGame"> Create Game </UButton>
      </UCard>
      <UCard>
        <UInput v-model="gameCode" type="text" placeholder="Enter Room Code" />
        <UButton @click="joinGame"> Join Game </UButton>
      </UCard>
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
