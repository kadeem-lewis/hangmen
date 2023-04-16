<template>
  <form class="flex flex-col" @submit.prevent="register">
    <input
      class="bg-dark-mode-400 rounded-sm px-4 py-2 outline-none mx-2"
      type="text"
      name="username"
      placeholder="Enter a username"
      v-model="username"
    />
    <button
      type="submit"
      class="rounded-full bg-blue-600 py-2 hover:bg-blue-500 mt-2 font-semibold text-xl w-3/4 mx-auto"
    >
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import SocketIoService from "../services/SocketIoService";

const socket = ref(null);
const username = ref("");
const userId = ref("");
const router = useRouter();

onMounted(() => {
  socket.value = SocketIoService.setupSocketConnection();
  if (localStorage.getItem("username") !== null) {
    username.value = localStorage.getItem("username");
  }
});

const register = () => {
  if (localStorage.getItem("userId") !== null) {
    userId.value = localStorage.getItem("userId");
  } else {
    userId.value = generateId();
    localStorage.setItem("userId", userId.value);
  }
  localStorage.setItem("username", username.value);
  socket.value.emit("register", username.value, userId.value);
  router.push("/mode");
};

const generateId = () => {
  return (
    Date.now().toString(36) +
    Math.floor(
      Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)
    ).toString(36)
  );
};
</script>
