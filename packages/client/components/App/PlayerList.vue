<template>
  <ul v-if="players" class="flex flex-col gap-y-2">
    <li
      class="rounded-md bg-dark-mode-500 p-2 text-center"
      v-for="(player, key) in players"
      :key="key"
    >
      <div
        v-if="players[key]"
        class="flex flex-row justify-between"
        @click="playerClick = true"
      >
        <div>
          <div class="font-bold">#{{ "1" }}</div>
          <Icon v-if="players[key].isHost" icon="mdi:crown" :inline="true" />
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
        <div>
          <img :src="players[key].avatar" alt="player avatar" class="w-12" />
        </div>
        <UiModal v-model="playerClick">Hey Hey Hey</UiModal>
      </div>
      <div v-else class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <Icon icon="heroicons:user" :inline="true" /></span
        ><span>Empty</span>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
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

const playerClick = ref(false);

onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
  players.value = null; //player array isn't emptied for room creator
});
</script>
