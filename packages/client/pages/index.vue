<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <UCard>
      <div class="flex flex-col items-center justify-center gap-6">
        <UChip
          inset
          position="bottom-right"
          :ui="{ base: '-mx-2 my-1 rounded-none ring-0', background: '' }"
        >
          <template #content>
            <UButton
              icon="i-heroicons-arrow-path"
              class="rounded-full"
              @click="changeAvatar"
            />
          </template>
          <UAvatar :src="avatar" alt="`${username} Avatar`" size="3xl" />
        </UChip>
        <UFormGroup>
          <template #label>
            <span
              class="hidden text-center text-lg font-semibold uppercase lg:block"
            >
              Choose a character and a nickname
            </span>
          </template>
          <UInput
            v-model="username"
            name="username"
            size="lg"
            placeholder="Enter a username"
            required
          />
        </UFormGroup>
        <UButton icon="i-heroicons-play" label="Play" block @click="register" />
      </div>
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
