<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <div class="flex flex-col items-center gap-y-4 lg:flex-row">
        <span class="relative">
          <img :src="avatar" alt="Avatar" />
          <button
            class="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1 hover:bg-blue-500"
            @click="changeAvatar"
          >
            <Icon name="heroicons:arrow-path" size="24" />
          </button>
        </span>
        <div class="mx-16 w-full text-left lg:space-y-4">
          <p class="hidden text-lg font-semibold uppercase lg:block">
            Choose a character and a nickname
          </p>
          <input
            class="mx-4 w-full rounded-md bg-dark-mode-400 px-4 py-2 text-xl font-semibold outline-none"
            type="text"
            name="username"
            placeholder="Enter a username"
            v-model="username"
          />
        </div>
      </div>
      <button
        @click="register"
        class="btn mx-auto mt-8 flex w-1/2 items-center gap-x-4 py-2 pl-4 text-xl font-semibold"
      >
        <Icon name="heroicons:play-solid" size="24" />
        <span class="flex-grow uppercase">Play</span>
      </button>
    </div>
    <div class="hidden lg:block">
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
