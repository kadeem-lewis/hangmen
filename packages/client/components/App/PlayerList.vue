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
  $io.on(ServerEvents.NEW_PLAYER, (_, playersList) => {
    console.log("New player event received", playersList);
    players.value = playersList;
  });
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ userId }) => {
    players.value = players.value.filter((p) => p.userId !== userId);
  });
});
onBeforeUnmount(() => {
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
});
</script>
