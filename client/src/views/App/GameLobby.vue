<template>
  <div>
    <p class="text-center text-3xl">Waiting</p>
  </div>
  <div>{{ roomCode }}</div>
  <ul>
    <li v-for="player in players">{{ player.username }}</li>
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
    this.socket.on("new-player", (player) => {
      this.players.push(player);
      const message = {
        id: 99,
        sender: "Announcer",
        text: `${player.username} has joined the room`,
      };
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
