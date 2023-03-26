<template>
  <h2 class="text-2xl text-center font-bold">Choose Mode</h2>
  <div class="flex flex-col gap-4">
    <button
      @click="createGame"
      class="rounded-full bg-purple-600 py-2 hover:bg-purple-500 mt-2 font-semibold text-xl w-3/4 mx-auto"
    >
      Create Game
    </button>
    <input
      type="text"
      ref="gameCode"
      placeholder="Enter Room Code"
      class="bg-dark-mode-400 rounded-sm px-4 py-2 outline-none mx-2"
    />
    <button
      @click="joinGame"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 font-semibold text-xl w-3/4 mx-auto"
    >
      Join Game
    </button>
  </div>
</template>

<script setup lang="ts">
import SocketIoService from "../services/SocketIoService";
export default {
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
  },
  data() {
    return {
      socket: null,
      roomCode: "",
    };
  },
  methods: {
    createGame() {
      this.socket.emit("request-room-code");
      this.socket.on("create-room", (roomCode) => {
        this.socket.emit("join-room", roomCode, (message) => {
          console.log(message);
        });
        this.$router.push({
          name: "game-lobby",
          params: { roomCode: roomCode },
        });
      });
    },
    joinGame() {
      let room = this.$refs.gameCode.value.toString();
      this.socket.emit("join-room", room, (message) => {});
      this.$router.push({
        name: "game-lobby",
        params: { roomCode: room },
      });
    },
  },
};
</script>
