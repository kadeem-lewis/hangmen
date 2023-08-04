<template>
  <div class="bg-dark-mode-500 p-4 overflow-y-auto h-64">
    <button @click="leaveGame()">Leave Game</button>
    <div>
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :sender="message.sender"
        :message="message.text"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import ChatBubble from "./ChatBubble.vue";
import SocketIoService from "../../services/SocketIoService";
import { Socket } from "socket.io-client";

type Message = {
  id: string;
  sender: string;
  text: string;
};
const socket = ref<Socket | null>(null);
const messages = ref<Message[]>([]);
const roomCode = ref("");

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
  socket.value.on("receive-message", (message) => {
    messages.value.push(message);
  });
  socket.value.on("new-player", (player, players) => {
    const message = {
      id: `${Date.now()}-${Math.floor(Math.random() * 9) + 1}`,
      sender: player.username,
      text: `has joined the game`,
    };
    messages.value.push(message);
  });
});

onUpdated(() => {
  socket.value?.on("player-leave-room", (player, playersList) => {
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
  socket.value?.emit("leave-room", roomCode.value, (response: any) => {
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
