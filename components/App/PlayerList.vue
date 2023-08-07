<template>
  <ul class="grid grid-cols-2">
    <li class="p-2 text-center" v-for="player in players" :key="player.userId">
      {{ player.username }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

type Player = {
  userId: string;
  username: string;
  isHost: boolean;
  currentRoom: string;
};

const players = ref<Player[]>([]);

onMounted(() => {
  $io.on("new-player", (_, playersList) => {
    console.log("New player event received", playersList);
    players.value = playersList;
  });
  $io.on("player-leave-room", ({ userId }) => {
    players.value = players.value.filter((p) => p.userId !== userId);
  });
});
onBeforeUnmount(() => {
  $io.off("new-player");
  $io.off("player-leave-room");
});
</script>
