<template>
  <ul class="flex flex-col gap-y-2">
    <li
      class="rounded-md bg-dark-mode-500 p-2 text-center"
      v-for="(slot, index) in 4"
      :key="index"
    >
      <div
        v-if="players[index]"
        class="flex flex-row justify-between"
        @click="playerClick = true"
      >
        <div>
          <div class="font-bold">#{{ "1" }}</div>
          <Icon v-if="players[index].isHost" name="mdi:crown" />
        </div>
        <div>
          <div>
            <span class="font-bold">
              {{ players[index].username }}
            </span>
            <span v-if="$io.id">
              <!-- TODO: show this player is the current socket -->
              ( You )
            </span>
          </div>
          <div>{{ 0 }} points</div>
        </div>
        <div>
          <img :src="avatar" alt="player avatar" />
        </div>

        <!-- TODO: show (You) next to the player, show points, avatar and show rankings -->
        <Icon
          v-if="players[index].isReady"
          name="material-symbols:check-circle"
        />
        <UiModal v-model="playerClick">Hey Hey Hey</UiModal>
      </div>
      <div v-else class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <Icon name="heroicons:user" /></span
        ><span>Empty</span>
      </div>

      <!-- TODO: add way to check if the current person is the host and let them see different things on screen -->
    </li>
  </ul>
</template>

<script setup lang="ts">
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";

const { $io } = useNuxtApp();

type Player = {
  userId: string;
  username: string;
  isHost: boolean;
  isReady: boolean;
};

const players = ref<Player[]>([]);

onMounted(() => {
  $io.on(ServerEvents.NEW_PLAYER, (_, playersList) => {
    players.value = playersList;
    //TODO: Since playersList is an array it doesn't contain the socket.io to compare to the client side version
  });
  $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ userId }) => {
    players.value = players.value.filter((p) => p.userId !== userId);
  });
  $io.on(ServerEvents.READY_PLAYERS, (playersList) => {});
});

const playerClick = ref(false);

const svg = createAvatar(adventurerNeutral, {
  size: 42,
  radius: 50,
  scale: 90,
}).toDataUriSync();

const avatar = ref(svg);

onBeforeUnmount(() => {
  $io.off(ServerEvents.NEW_PLAYER);
  $io.off(ServerEvents.PLAYER_LEAVE_ROOM);
});
</script>
