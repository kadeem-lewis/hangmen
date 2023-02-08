<template>
  <form class="flex flex-col" @submit.prevent="register">
    <input
      class="bg-dark-mode-400 rounded-sm px-4 py-2 outline-none mx-2"
      type="text"
      name="username"
      placeholder="Enter a username"
      v-model="username"
    />
    <button
      type="submit"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 mt-2 font-semibold text-xl w-3/4 mx-auto"
    >
      Play
    </button>
  </form>
</template>
<script>
import SocketIoService from "../services/SocketIoService";
export default {
  data() {
    return {
      socket: null,
      username: "",
      userId: "",
    };
  },
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
    if (localStorage.getItem("username") !== null) {
      this.username = localStorage.getItem("username");
    }
  },
  methods: {
    register() {
      // TODO: Send Data to server using socket.io
      if (localStorage.getItem("userId") !== null) {
        this.userId = localStorage.getItem("userId");
      } else {
        this.userId = this.generateId();
        localStorage.setItem("userId", this.userId);
      }
      localStorage.setItem("username", this.username);
      this.socket.emit("register", this.username, this.userId);
      this.$router.push("/mode");
    },
    generateId() {
      // Creates a random ID for each user
      return (
        Date.now().toString(36) +
        Math.floor(
          Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
        ).toString(36)
      );
    },
  },
};
</script>
