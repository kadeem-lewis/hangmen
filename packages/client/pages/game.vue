<template>
  <!-- TODO: style to be mobile first -->
  <div class="col-span-2 grid gap-2 md:grid-cols-4">
    <AppGameBar class="order-1 col-span-2 md:col-span-4" />
    <NuxtPage class="order-2 col-span-2 bg-gray-900 p-2 md:order-3" />
    <AppPlayerList class="order-3 col-span-1 h-full md:order-2" />
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

// onBeforeRouteEnter((to, from, next) => {
//   if (from.name === "game-mode") {
//     next();
//   }
//   next({ name: "game-mode" });
// });
</script>
