<template>
  <div class="grid grid-cols-4 gap-2">
    <AppGameBar class="col-span-4" />
    <AppPlayerList class="h-full col-span-1" />
    <NuxtPage class="col-span-2 bg-dark-mode-500 p-2" />
    <div class="h-full grid-col-span-1">
      <AppChatBox />
      <AppInputArea />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

// onBeforeRouteEnter((to, from, next) => {
//   if (from.name === "game-mode") {
//     next();
//   }
//   next({ name: "game-mode" });
// });
</script>
