<template>
  <!-- TODO: style to be mobile first -->
  <div class="grid col-span-2 md:grid-cols-4 gap-2">
    <AppGameBar class="order-1 col-span-2 md:col-span-4" />
    <NuxtPage class="order-2 col-span-2 md:order-3 bg-dark-mode-500 p-2" />
    <AppPlayerList class="order-3 md:order-2 h-full col-span-1" />
    <div class="order-4 h-full grid-col-span-1">
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
