<template>
  <div class="grid grid-cols-4 gap-2">
    <AppGameBar class="col-span-4" />
    <div class="h-full col-span-1">
      <AppPlayerList />
    </div>
    <div class="col-span-2">
      <NuxtPage />
    </div>
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
