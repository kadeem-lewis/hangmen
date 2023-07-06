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
import { ref, onMounted } from "vue";
import SocketIoService from "../services/SocketIoService";
import { Socket } from "socket.io-client";

const socket = ref<Socket | null>(null);
const router = useRouter();
const gameCode = ref("");

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
});

const createGame = () => {
  socket.value?.emit("request-room-code");
  socket.value?.on("create-room", (roomCode) => {
    socket.value?.emit("join-room", roomCode, (message: string) => {
      console.log(message);
    });
    router.push({
      name: "game-lobby",
      params: { roomCode: roomCode },
    });
  });
};

const joinGame = () => {
  let room = gameCode.value.toString().toUpperCase();
  socket.value?.emit("join-room", room, (res: any) => {
    if (res.status === true) {
      router.push({
        name: "game-lobby",
        params: { roomCode: room },
      });
    } else {
      alert("This room doesn't exist");
    }
  });
};
</script>
