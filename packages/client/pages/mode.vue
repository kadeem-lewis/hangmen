<template>
  <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
  <div class="flex flex-col gap-4">
    <button
      @click="createGame"
      class="btn mx-auto mt-2 w-3/4 rounded-lg py-2 text-xl font-semibold"
    >
      Create Game
    </button>
    <input
      type="text"
      v-model="gameCode"
      placeholder="Enter Room Code"
      class="mx-2 rounded-md bg-dark-mode-400 px-4 py-2 outline-none"
    />
    <button
      @click="joinGame"
      class="btn mx-auto w-3/4 py-2 text-xl font-semibold"
    >
      Join Game
    </button>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const gameCode = ref("");

// Set up event listener on component mount
onMounted(() => {
  $io.on(ServerEvents.CREATE_ROOM, (roomCode) => {
    $io.emit(ClientEvents.JOIN_ROOM, roomCode, (message) => {
      console.log(message);
    });
    navigateTo({
      path: `/game/${roomCode}/lobby`,
    });
  });
});

// Remove event listener on component unmount
onUnmounted(() => {
  $io.off(ServerEvents.CREATE_ROOM);
});
const createGame = () => {
  $io.emit(ClientEvents.REQUEST_ROOM_CODE);
};

const joinGame = () => {
  let room = gameCode.value.toString().toUpperCase();
  $io.emit(ClientEvents.JOIN_ROOM, room, (res: any) => {
    if (res.status === "ok") {
      navigateTo({
        path: `/game/${room}/lobby`,
      });
    } else {
      alert(res.message);
    }
  });
};
</script>
