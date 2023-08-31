<template>
  <div class="flex items-center justify-center">
    <div class="w-full">
      <div class="flex flex-col items-center gap-y-4 md:flex-row">
        <span class="relative">
          <img :src="avatar" alt="Avatar" />
          <UButton
            icon="i-heroicons-arrow-path"
            :ui="{ rounded: 'rounded-full' }"
            class="absolute bottom-0 right-0"
            @click="changeAvatar"
          />
        </span>
        <div class="mx-16 w-full text-left md:space-y-4">
          <p class="hidden text-lg font-semibold uppercase md:block">
            Choose a character and a nickname
          </p>
          <UInput
            class="mx-4 w-full px-4 py-2 text-xl font-semibold outline-none"
            type="text"
            name="username"
            placeholder="Enter a username"
            v-model="username"
          />
        </div>
      </div>
      <UButton
        icon="i-heroicons-play-solid"
        @click="register"
        class="mx-auto mt-8 w-1/2 items-center py-2 pl-4 text-xl font-semibold"
      >
        <span class="flex-grow uppercase">Play</span>
      </UButton>
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
