<template>
  <h2 class="text-2xl text-center font-bold">Choose Mode</h2>
  <div class="flex flex-col gap-4">
    <button
      @click="createGame"
      class="rounded-lg bg-purple-600 py-2 hover:bg-purple-500 mt-2 font-semibold text-xl w-3/4 mx-auto"
    >
      Create Game
    </button>
    <input
      type="text"
      v-model="gameCode"
      placeholder="Enter Room Code"
      class="bg-dark-mode-400 rounded-md px-4 py-2 outline-none mx-2"
    />
    <button
      @click="joinGame"
      class="rounded-lg bg-blue-600 py-2 hover:bg-blue-500 font-semibold text-xl w-3/4 mx-auto"
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
