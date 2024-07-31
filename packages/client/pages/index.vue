<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <UCard class="flex items-center justify-center">
      <span class="relative w-full">
        <UAvatar :src="avatar" alt="`${username} Avatar`" size="3xl" />
        <UButton
          icon="i-heroicons-arrow-path"
          class="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1 hover:bg-blue-500"
          @click="changeAvatar"
        />
      </span>
      <label
        for="username"
        class="hidden text-center text-lg font-semibold uppercase lg:block"
      >
        Choose a character and a nickname
      </label>
      <UInput
        v-model="username"
        name="username"
        size="lg"
        placeholder="Enter a username"
      />
      <UButton icon="i-heroicons-play" label="Play" @click="register" block />
    </UCard>
    <UCard>
      <h4 class="text-2xl">How to play</h4>
      <UCarousel />
      <p>Guess the word or something.</p>
      <p>Idk, why are you asking me??</p>
    </UCard>
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
