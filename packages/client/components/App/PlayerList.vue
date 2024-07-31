<template>
  <div v-if="players" class="flex flex-col gap-y-2">
    <UCard v-for="(player, key) in players" :key="key" class="text-center">
      <div
        v-if="players[key]"
        class="flex flex-row items-center justify-between"
        @click="() => (isOpen = true)"
      >
        <div>
          <div class="font-bold">#{{ "1" }}</div>
          <UIcon v-if="players[key].isHost" name="i-mdi-crown" />
        </div>
        <div>
          <div>
            <span class="font-bold">
              {{ players[key].username }}
            </span>
            <span v-if="$io.id === key"> ( You ) </span>
          </div>
          <div>{{ 0 }} points</div>
        </div>
        <UAvatar
          :src="players[key].avatar"
          :name="`${players[key].username} Avatar`"
          size="sm"
        />
        <UModal v-model="isOpen"> Hey hey hey </UModal>
      </div>
      <div v-else class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <UIcon name="i-heroicons-user" /></span
        ><span>Empty</span>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@hangmen/shared";

const { $io } = useNuxtApp();

const players = useState<{ [id: string]: User } | null>("players");

onMounted(() => {
  //TODO: param is currently username because userId isnt properly setup yet. change back when done because two users with same username would break system
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ username }) => {
    if (players.value) {
      Object.keys(players.value).forEach((key) => {
        if (players.value && players.value[key].username === username) {
          delete players.value[key];
        }
      });
    }
  });
});

const isOpen = ref(false);

onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
  players.value = null; //player array isn't emptied for room creator
});
</script>
