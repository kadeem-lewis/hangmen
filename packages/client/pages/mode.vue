<template>
  <div class="m-auto max-w-4xl">
    <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
    <div class="grid gap-8 lg:grid-cols-2">
      <div class="flex items-end justify-center rounded-lg border p-8">
        <button
          @click="createGame"
          class="btn rounded-lg py-2 text-xl font-semibold"
        >
          Create Game
        </button>
      </div>
      <div class="flex flex-col justify-center gap-4 rounded-lg border p-8">
        <input
          type="text"
          v-model="gameCode"
          placeholder="Enter Room Code"
          class="mx-2 rounded-md bg-dark-mode-400 px-4 py-2 outline-none"
        />
        <button
          @click="joinGame"
          class="btn mx-auto py-2 text-xl font-semibold"
        >
          Join Game
        </button>
      </div>
    </div>
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
