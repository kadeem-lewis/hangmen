<template>
  <ul class="grid grid-cols-2">
    <li class="p-2 text-center" v-for="(slot, index) in 4" :key="index">
      <div v-if="players[index]">
        <Icon v-if="players[index].isHost" name="mdi:crown" />
        {{ players[index].username }}
        <Icon
          v-if="players[index].isReady"
          name="material-symbols:check-circle"
        />
      </div>
      <div v-else>
        Waiting for player

        <button @click="removePlayerSlot">X</button>
      </div>
      <!-- TODO: add way to check if the current person is the host and let them see different things on screen -->
    </li>
  </ul>
  <!-- Add a player slot button -->
  <button v-if="players.length < 4" @click="addPlayerSlot">Add Player</button>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

type Player = {
  userId: string;
  username: string;
  isHost: boolean;
  isReady: boolean;
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
  $io.on(ServerEvents.READY_PLAYERS, (playersList) => {});
});

// Function to remove a player slot
const removePlayerSlot = () => {
  if (players.value.length > 0) {
    // emit the event to server to reduce the max size of the room if required.
  }
};

// Function to add a player slot
const addPlayerSlot = () => {
  if (players.value.length < 4) {
    // Do something to add a new player or just increase the size of the room on the server.
  }
};

onBeforeUnmount(() => {
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
});
</script>
