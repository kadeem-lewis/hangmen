<template>
  <form class="flex flex-col" @submit.prevent="register">
    <input
      class="bg-dark-mode-400 rounded-sm px-4 py-2 outline-none mx-2"
      type="text"
      name="username"
      placeholder="Enter a username"
      ref="username"
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
      socket: SocketIoService.setupSocketConnection(),
    };
  },
  mounted() {
    console.log(this.socket);
    this.socket.on("connect", () => {
      console.log("user connected");
    });
  },
  methods: {
    register() {
      // TODO: Send Data to server using socket.io
      const username = this.$refs.username.value;
      this.socket.emit("register", username);
      this.$router.push("/mode");
    },
  },
};
</script>
