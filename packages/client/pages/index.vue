<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
    <UCard>
      <ClientOnly>
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
            <UAvatar
              :src="`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${seed}&size=128&scale=90&radius=50`"
              alt="`${username} Avatar`"
              size="3xl"
            />
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
          <UButton
            icon="i-heroicons-play"
            label="Play"
            block
            @click="register"
          />
        </div>
      </ClientOnly>
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
import { useStorage } from "@vueuse/core";
const { $io } = useNuxtApp();

const username = useStorage("username", "");
const seed = useStorage("userSeed", "");

const register = () => {
  $io.auth = { username: username.value, avatarSeed: seed.value };
  $io.connect();
  navigateTo({ path: "/mode" });
};

const changeAvatar = () => {
  seed.value = Math.floor(Math.random() * 100).toString();
};
</script>
