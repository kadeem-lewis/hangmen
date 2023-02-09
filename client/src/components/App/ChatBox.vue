<template>
  <div class="bg-dark-mode-500 p-4">
    <div class="odd:bg-slate-200">
      <ChatBubble
        v-for="message in sortedMessages"
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
  },
};
</script>
