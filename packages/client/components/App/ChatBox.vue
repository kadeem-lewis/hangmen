<template>
  <div class="overflow-y-auto bg-gray-100 dark:bg-gray-900">
    <div class="h-64 p-4">
      <AppChatBubble
        v-for="message in messages"
        :key="message.id"
        :sender="message.sender"
        :message="message.text"
      />
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

const messages = ref<Message[]>([]);

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

//TODO: find some way to listen for when a player joins a new room and clear out messages
onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.RECEIVE_MESSAGE);
  messages.value = [];
});
</script>
