<template>
  <div class="bg-dark-mode-500 p-4">
    <div>
      <p>Hello All</p>
    </div>
    <div class="odd:bg-slate-200">
      <ChatBubble v-for="message in messages"></ChatBubble>
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
  },
  data() {
    return {
      socket: null,
      messages: [],
    };
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
