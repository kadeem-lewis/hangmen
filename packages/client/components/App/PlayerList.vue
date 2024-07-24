<template>
  <ul v-if="players" class="flex flex-col gap-y-2">
    <li
      v-for="(player, key) in players"
      :key="key"
      class="rounded-md bg-dark-mode-500 p-2 text-center"
    >
      <div
        v-if="players[key]"
        class="flex flex-row justify-between"
        @click="() => (isOpen = true)"
      >
        <div>
          <div class="font-bold">#{{ "1" }}</div>
          <Icon v-if="players[key].isHost" name="mdi:crown" />
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
        <UiAvatar
          :src="players[key].avatar"
          :name="players[key].username"
          size="sm"
        />
        <UiDialog v-model:open="isOpen">
          <UiDialogContent> Hey hey hey </UiDialogContent>
        </UiDialog>
      </div>
      <div v-else class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <Icon name="heroicons:user" /></span
        ><span>Empty</span>
      </div>
    </li>
  </ul>
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
