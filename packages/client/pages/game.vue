<template>
  <!-- TODO: style to be mobile first -->
  <div class="col-span-2 grid gap-2 lg:grid-cols-4">
    <AppGameBar class="order-1 col-span-2 lg:col-span-4" />
    <NuxtPage class="order-2 col-span-2 bg-dark-mode-500 p-2 lg:order-3" />
    <AppPlayerList class="order-3 col-span-1 h-full lg:order-2" />
    <div class="grid-col-span-1 order-4 h-full">
      <AppChatBox />
      <AppInputArea />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "game",
});
const { $io } = useNuxtApp();

//TODO: If user comes to app from room link, prompt them to enter a username, connect them and add them to room
</script>
