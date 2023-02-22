<template>
  <form class="flex relative" @submit.prevent="sendMessage">
    <input
      type="text"
      class="grow rounded-sm px-4 py-2 outline-none bg-dark-mode-400"
      placeholder="Enter Message..."
      v-model="chatInput"
    />
    <button
      class="absolute right-2 p-1 rounded-md hover:bg-dark-mode-600 top-1/2 -translate-y-1/2"
    >
      <font-awesome-icon
        icon="fa-solid fa-paper-plane"
        class="text-gray-300 m-auto"
      />
    </button>
  </form>
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
      chatInput: "",
    };
  },
  computed: {
    getId() {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 9) + 1;
      return `${timestamp}-${random}`;
    },
  },
  methods: {
    sendMessage() {
      this.socket.emit("send-message", this.getId, this.chatInput);
      this.chatInput = "";
    },
  },
};
</script>
