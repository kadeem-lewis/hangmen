<template>
  <div>
    <p class="text-center text-3xl">Waiting...</p>
  </div>
  <div>
    <p class="font-bold text-lg">Room Code:</p>
    <div class="py-2 text-2xl">
      <span class="p-2 rounded-lg bg-dark-mode-400 mr-2 font-bold">{{
        roomCode
      }}</span>
      <button
        @click="copyCode()"
        class="rounded-lg p-2 bg-sky-600 hover:bg-sky-500"
      >
        <ClipboardIcon />
      </button>
      <span v-show="isCopied" class="p-2 text-green-500">
        <ClipboardDocumentCheckIcon />
      </span>
    </div>
  </div>
  <PlayerList />
  <div class="flex">
    <button
      class="rounded-full bg-red-600 py-2 hover:bg-red-500 m-2 font-semibold text-xl w-1/2"
    >
      Not Ready
    </button>
    <button
      @click="startGame"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 m-2 font-semibold text-xl w-1/2"
    >
      Start
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import SocketIoService from "../../services/SocketIoService";
import PlayerList from "../../components/App/PlayerList.vue";
import {
  ClipboardIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/vue/24/solid";

const route = useRoute();
const router = useRouter();
const socket = ref(null);
const roomCode = ref("");
const isCopied = ref(false);

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
  roomCode.value = route.params.roomCode;
});

const startGame = () => {
  router.push("/game/play");
};

const copyCode = () => {
  navigator.clipboard.writeText(roomCode.value);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 2000);
};
</script>
