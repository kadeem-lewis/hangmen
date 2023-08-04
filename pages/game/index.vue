<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <NuxtPage />
      <AppInputArea />
    </div>
    <AppChatBox class="h-full grid-col-span-1" />
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

// onBeforeRouteLeave((to, from, next) => {
//   socket.value?.emit("leave-room");
//   next();
// });
</script>
