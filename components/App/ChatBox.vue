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
const { $io } = useNuxtApp();

type Message = {
  id: string;
  sender: string;
  text: string;
};
const messages = ref<Message[]>([]);
const roomCode = ref("");

onMounted(() => {
  $io.on("receive-message", (message) => {
    messages.value.push(message);
  });
  $io.on("new-player", (player, players) => {
    const message = {
      id: `${Date.now()}-${Math.floor(Math.random() * 9) + 1}`,
      sender: player.username,
      text: `has joined the game`,
    };
    messages.value.push(message);
  });
});

onUpdated(() => {
  $io?.on("player-leave-room", (player, playersList) => {
    const message = {
      id: `${Date.now()}-${Math.floor(Math.random() * 9) + 1}`,
      sender: player.username,
      text: "has left the room",
    };
    messages.value.push(message);
  });
});

const router = useRouter();
const route = useRoute();
roomCode.value = route.params.roomCode as string;

const leaveGame = () => {
  console.log(roomCode.value);
  $io?.emit("leave-room", roomCode.value, (response: any) => {
    if (response.status === "ok") {
      router.push({ name: "game-mode" });
    } else {
      console.log("An error has occurred");
    }
  });
};

onBeforeUnmount(() => {
  messages.value = [];
});
</script>
