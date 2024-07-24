<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { $io } = useNuxtApp();

const route = useRoute("game-id");
const roomCode = ref(route.params.id);
const hasLeftRoom = useState<boolean>("hasLeftRoom");

onBeforeRouteLeave((to, from) => {
  if (!hasLeftRoom.value) {
    $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value as string, (response) => {
      console.log(response);
    });
  }
});
</script>
