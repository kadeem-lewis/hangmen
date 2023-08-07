<template>
  <div class="bg-dark-mode-500 p-4 overflow-y-auto h-64">
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
const roomCode = ref(route.params.id);

onMounted(() => {
  $io.on("receive-message", (message) => {
    messages.value.push(message);
  });
  //! Temporary non global state solution
  $io.on("message-sent", (message) => {
    messages.value.push(message);
  });
  $io.on("new-player", (player, players) => {
    const message = {
      id: nanoid(),
      sender: player.username,
      text: `has joined the game`,
    };
    messages.value.push(message);
  });
});

onUpdated(() => {
  $io?.on("player-leave-room", (player, playersList) => {
    const message = {
      id: nanoid(),
      sender: player.username,
      text: "has left the room",
    };
    messages.value.push(message);
  });
});

const leaveGame = () => {
  console.log(roomCode.value);
  $io?.emit("leave-room", roomCode.value, (response: any) => {
    if (response.status === "ok") {
      navigateTo({ path: "/mode" });
    } else {
      console.log("An error has occurred");
    }
  });
};

onBeforeUnmount(() => {
  messages.value = [];
});
</script>
