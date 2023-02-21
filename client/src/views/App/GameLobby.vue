<template>
  <div>
    <p class="text-center text-3xl">Waiting</p>
  </div>
  <div>{{ roomCode }}</div>
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
    };
  },
  methods: {
    startGame() {
      this.$router.push("/game/play");
    },
  },
};
</script>
