<template>
  <UCard class="flex flex-col justify-between">
    <div class="max-h-64 grow overflow-y-auto">
      <AppChatBubble
        v-for="message in messages"
        :key="message.id"
        v-bind="message"
      />
    </div>
    <template #footer>
      <AppInputArea />
    </template>
  </UCard>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();

const { messages } = storeToRefs(useRoomStore());

onMounted(() => {
  $io.on(ServerEvents.RECEIVE_MESSAGE, (message) => {
    messages.value.push(message);
  });
  $io.on(ServerEvents.NEW_PLAYER, (player, _) => {
    const date = useDateFormat(useNow(), "HH:mm");

    const message = {
      id: nanoid(),
      sender: player.username,
      text: `has joined the game.`,
      time: date.value,
    };
    messages.value.push(message);
  });
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ username }) => {
    const date = useDateFormat(useNow(), "HH:mm");

    const message = {
      id: nanoid(),
      sender: username,
      text: "has left the room",
      time: date.value,
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
