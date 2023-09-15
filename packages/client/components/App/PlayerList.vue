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
            <span v-if="$io.id">
              <!-- TODO: show this player is the current socket -->
              ( You )
            </span>
          </div>
          <div>{{ 0 }} points</div>
        </div>
        <div>
          <img :src="players[key].avatar" alt="player avatar" class="w-12" />
        </div>

        <!-- TODO: show (You) next to the player, show points, avatar and show rankings -->
        <Icon
          v-if="players[key].isReady"
          icon="heroicons:check-circle"
          :inline="true"
        />
        <UiModal v-model="playerClick">Hey Hey Hey</UiModal>
      </div>
      <div v-else class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <Icon icon="heroicons:user" :inline="true" /></span
        ><span>Empty</span>
      </div>

      <!-- TODO: add way to check if the current person is the host and let them see different things on screen -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { User } from "@hangmen/shared";

const { $io } = useNuxtApp();

const players = useState<{ [id: string]: User } | null>("players");
//TODO: convert players to object and use for in to get keys and get data that way

onMounted(() => {
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ userId }) => {
    if (players.value) {
      Object.keys(players.value).forEach((key) => {
        if (players.value && players.value[key].userId === userId) {
          delete players.value[key];
        }
      });
    }
  });

  $io.on(ServerEvents.READY_PLAYERS, (playersList) => {});
});

const playerClick = ref(false);

onBeforeUnmount(() => {
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
});
</script>
