<template>
  <div>
    <p class="text-center text-3xl">Waiting...</p>
  </div>
  <div>
    <p class="font-bold text-lg">Room Code:</p>
    <div class="py-2 text-2xl">
      <span class="p-2 rounded-lg bg-dark-mode-400 mr-2 font-bold">{{
        roomCode
      }}</span>
      <button
        @click="copyCode()"
        class="rounded-lg p-2 bg-sky-600 hover:bg-sky-500"
      >
        <font-awesome-icon icon="fa-solid fa-copy" />
      </button>
      <span v-show="isCopied" class="p-2 text-green-500"
        ><font-awesome-icon icon="fa-solid fa-check"
      /></span>
    </div>
  </div>
  <ul class="grid grid-cols-2">
    <li class="p-2 text-center" v-for="player in players" :key="player.id">
      {{ player.username }}
    </li>
  </ul>
  <div class="flex">
    <button
      class="rounded-full bg-red-600 py-2 hover:bg-red-500 m-2 font-semibold text-xl w-1/2"
    >
      Not Ready
    </button>
    <button
      @click="startGame"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/2"
    >
      Start
    </button>
  </div>
</template>

<script>
import SocketIoService from "../../services/SocketIoService";
export default {
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
    this.socket.on("new-player", (player, players) => {
      this.players = players;
    });
    this.roomCode = this.$route.params.roomCode;
  },
  data() {
    return {
      roomCode: "",
      players: [],
      isCopied: false,
    };
  },
  methods: {
    startGame() {
      this.$router.push("/game/play");
    },
    copyCode() {
      navigator.clipboard.writeText(this.roomCode);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    },
  },
  beforeUnmount() {
    //this.players = [];
  },
};
</script>
