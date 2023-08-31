<template>
  <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
  <div class="flex flex-col gap-4">
    <UButton
      @click="createGame"
      class="mx-auto mt-2 w-3/4 rounded-lg bg-purple-600 py-2 text-xl font-semibold hover:bg-purple-500"
    >
      Create Game
    </UButton>
    <input
      type="text"
      v-model="gameCode"
      placeholder="Enter Room Code"
      class="mx-2 rounded-md bg-dark-mode-400 px-4 py-2 outline-none"
    />
    <UButton
      @click="joinGame"
      class="mx-auto w-3/4 rounded-lg bg-blue-600 py-2 text-xl font-semibold hover:bg-blue-500"
    >
      Join Game
    </UButton>
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
