<template>
  <div class="flex flex-col items-center justify-center gap-16">
    <div
      class="flex max-w-md flex-col items-center gap-y-4 rounded-lg border p-4"
    >
      <span class="relative">
        <UiAvatar :src="avatar" :name="username" size="lg" />
        <button
          class="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1 hover:bg-blue-500"
          @click="changeAvatar"
        >
          <Icon name="heroicons:arrow-path" class="text-2xl" />
        </button>
      </span>
      <div class="mx-16 w-full text-left lg:space-y-4">
        <p class="hidden text-center text-lg font-semibold uppercase lg:block">
          <!-- Label and Input -->
          Choose a character and a nickname
        </p>
        <input
          v-model="username"
          class="w-full rounded-md bg-dark-mode-400 px-4 py-2 text-xl font-semibold outline-none"
          type="text"
          name="username"
          placeholder="Enter a username"
        >
      </div>
      <button
        class="btn mx-auto mt-8 flex w-1/2 items-center gap-x-4 py-2 pl-4 text-xl font-semibold"
        @click="register"
      >
        <Icon name="heroicons:play" class="text-2xl" />
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
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";
import { useStorage } from "@vueuse/core";
const { $io } = useNuxtApp();

const username = useStorage("username", "");
const avatar = ref("");
const seed = useStorage("userSeed", "");

onMounted(() => {
  generateAvatar();
});

const register = () => {
  $io.auth = { username: username.value, avatar: avatar.value };
  $io.connect();
  navigateTo({ path: "/mode" });
};
const generateAvatar = () => {
  const svg = createAvatar(adventurerNeutral, {
    size: 128, //TODO: set standard size and change size using css?
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
</script>
