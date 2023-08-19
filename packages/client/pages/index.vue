<template>
  <div class="flex justify-center items-center">
    <div class="w-full">
      <div class="flex flex-col md:flex-row gap-y-4 items-center">
        <span class="relative">
          <img :src="avatar" alt="Avatar" />
          <button
            class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 rounded-full p-1"
            @click="changeAvatar"
          >
            <Icon name="heroicons:arrow-path" size="1.5rem" />
          </button>
        </span>
        <div class="w-full mx-16 md:space-y-4 text-left">
          <p class="hidden md:block font-semibold uppercase text-lg">
            Choose a character and a nickname
          </p>
          <input
            class="bg-dark-mode-400 text-xl font-semibold w-full mx-4 rounded-md px-4 py-2 outline-none"
            type="text"
            name="username"
            placeholder="Enter a username"
            v-model="username"
          />
        </div>
      </div>
      <button
        @click="register"
        class="rounded-lg pl-4 flex items-center gap-x-4 bg-blue-600 py-2 hover:bg-blue-500 mt-8 font-semibold text-xl w-1/2 mx-auto"
      >
        <Icon name="heroicons:play-solid" size="1.5rem" />
        <span class="flex-grow uppercase">Play</span>
      </button>
    </div>
    <div class="hidden md:block">
      <h4 class="text-2xl">How to play</h4>
      <p>Guess the word or something. Idk, why are you asking me??</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
const { $io } = useNuxtApp();
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";

const username = ref("");
const userId = ref("");
const avatar = ref("");
const seed = ref("");

onMounted(() => {
  if (localStorage.getItem("username") !== null) {
    username.value = localStorage.getItem("username") as string;
  }
});

const register = () => {
  if (localStorage.getItem("userId") !== null) {
    userId.value = localStorage.getItem("userId") as string;
  } else {
    userId.value = nanoid();
    localStorage.setItem("userId", userId.value);
  }
  localStorage.setItem("username", username.value);
  localStorage.setItem("userSeed", seed.value);
  $io.emit(ClientEvents.REGISTER, username.value, userId.value);
  navigateTo({ path: "/mode" });
};
const generateAvatar = () => {
  const svg = createAvatar(adventurerNeutral, {
    size: window.innerWidth >= 448 ? 128 : 96,
    radius: 50,
    scale: 90,
    seed: seed.value,
  }).toDataUriSync();
  avatar.value = svg;
};
const changeAvatar = () => {
  seed.value = Math.floor(Math.random() * 100).toString();
  generateAvatar();
};
onMounted(() => {
  if (localStorage.getItem("userSeed") !== null) {
    seed.value = localStorage.getItem("userSeed") as string;
  }
  generateAvatar();
});
</script>
