<template>
  <ul class="grid grid-cols-2">
    <li class="p-2 text-center" v-for="player in players" :key="player.id">
      {{ player.username }}
    </li>
  </ul>
</template>

<script>
import SocketIoService from "../../services/SocketIoService";
export default {
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
    this.socket.on("new-player", (player, players) => {
      this.players = players;
    });
  },
  updated() {
    this.socket.on("player-leave-room", (user) => {
      this.players = this.players.filter(
        (player) => player.username !== user.username
      );
    });
  },
  data() {
    return {
      players: [],
    };
  },
  beforeUnmount() {
    this.players = [];
  },
};
</script>
