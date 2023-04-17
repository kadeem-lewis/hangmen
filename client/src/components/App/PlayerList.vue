<template>
  <ul class="grid grid-cols-2">
    <li class="p-2 text-center" v-for="player in players" :key="player.id">
      {{ player.username }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, onUpdated, onBeforeUnmount } from "vue";
import SocketIoService from "../../services/SocketIoService";
import { Socket } from "socket.io-client";
type Player = {
  id: string;
  username: string;
};

const socket = ref<Socket | null>(null);
const players = ref<Player[]>([]);

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
  socket.value.on("new-player", (player, playersList) => {
    players.value = playersList;
  });
});

onUpdated(() => {
  socket.value?.on("player-leave-room", (user) => {
    players.value = players.value.filter(
      (player) => player.username !== user.username
    );
  });
});

onBeforeUnmount(() => {
  players.value = [];
});
</script>
