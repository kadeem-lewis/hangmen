<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script lang="ts" setup>
const { $io } = useNuxtApp();
const { hasLeftRoom } = storeToRefs(useRoomStore());

const route = useRoute("game-id");
const roomCode = ref(route.params.id);

onBeforeRouteLeave(() => {
  if (!hasLeftRoom.value) {
    $io.emit(ClientEvents.LEAVE_ROOM, roomCode.value, (response) => {
      console.log(response);
    });
  }
});
</script>
