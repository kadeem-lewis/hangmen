<template>
  <div class="overflow-y-auto bg-dark-mode-500">
    <div class="p-4 h-64">
      <button @click="leaveGame()">Leave Game</button>
      <div>
        <AppChatBubble
          v-for="message in messages"
          :key="message.id"
          :sender="message.sender"
          :message="message.text"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();

type Message = {
  id: string;
  sender: string;
  text: string;
};
const route = useRoute();
const messages = ref<Message[]>([]);
const roomCode = ref(route.params.id[0]);

onMounted(() => {
  $io.on(ServerEvents.RECEIVE_MESSAGE, (message) => {
    messages.value.push(message);
  });
  $io.on(ServerEvents.NEW_PLAYER, (player, _) => {
    const message = {
      id: nanoid(),
      sender: player.username,
      text: `has joined the game.`,
    };
    messages.value.push(message);
  });
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ username }) => {
    const message = {
      id: nanoid(),
      sender: username,
      text: "has left the room",
    };
    messages.value.push(message);
  });
});
const leaveGame = () => {
  $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value as string, (response) => {
    if (response.status === "ok") {
      navigateTo({ path: "/mode" });
    } else {
      console.error("An error has occurred");
    }
  });
};

//find some way to listen for when a player joins a new room and clear out messages
onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.RECEIVE_MESSAGE);
  messages.value = [];
});
</script>
