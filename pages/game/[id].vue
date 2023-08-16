<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { $io } = useNuxtApp();

const route = useRoute();
const roomCode = ref(route.params.id);

onBeforeRouteLeave((to, from) => {
  $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value as string, (response) => {
    console.log(response);
  });
});
</script>
