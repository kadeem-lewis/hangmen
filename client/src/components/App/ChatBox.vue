<template>
  <div class="bg-dark-mode-500 p-4">
    <div><button @click="leaveGame()">Leave Game</button></div>
    <div>
      <ChatBubble
        v-for="message in messages"
        :key="message.id"
        :sender="message.sender"
        :message="message.text"
      ></ChatBubble>
    </div>
  </div>
</template>
<script>
import ChatBubble from "./ChatBubble.vue";
import SocketIoService from "../../services/SocketIoService";
export default {
  components: {
    ChatBubble,
  },
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
    this.socket.on("receive-message", (message) => {
      this.messages.push(message);
    });
    this.socket.on("new-player", (player, players) => {
      const message = {
        id: `${Date.now()}-${Math.floor(Math.random() * 9) + 1}`,
        sender: "Announcer",
        text: `${player.username} has joined the room`,
      };
      this.messages.push(message);
    });
  },
  data() {
    return {
      socket: null,
      messages: [],
    };
  },
  computed: {
    sortedMessages() {
      return this.messages.sort;
    },
  },
  methods: {
    receiveMessage() {
      this.socket.on("receive-message", (data) => {
        messages.push(data);
      });
    },
    leaveGame() {
      this.socket.emit("leave-room");
      this.$router.push({ name: "game-mode" });
    },
  },
};
</script>
