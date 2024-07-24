<template>
  <div class="overflow-y-auto bg-dark-mode-500">
    <div class="h-64 p-4">
      <AppChatBubble
        v-for="message in messages"
        :key="message.id"
        v-bind="message"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
import type { Message } from "@hangmen/shared";
const { $io } = useNuxtApp();

const messages = useState<Message[]>("messages");

onMounted(() => {
  $io.on(ServerEvents.RECEIVE_MESSAGE, (message) => {
    messages.value.push(message);
  });
  $io.on(ServerEvents.NEW_PLAYER, (player, _) => {
    const date = new Date();

    const message = {
      id: nanoid(),
      sender: player.username,
      text: `has joined the game.`,
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
    messages.value.push(message);
  });
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ username }) => {
    const date = new Date();

    const message = {
      id: nanoid(),
      sender: username,
      text: "has left the room",
      time: `${date.getHours()}:${date.getMinutes()}`,
    };
    messages.value.push(message);
  });
});

//TODO: find some way to listen for when a player joins a new room and clear out messages
onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.RECEIVE_MESSAGE);
  messages.value = [];
});
</script>
