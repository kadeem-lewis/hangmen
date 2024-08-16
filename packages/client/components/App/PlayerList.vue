<template>
  <div v-if="players" class="flex flex-col gap-y-2">
    <UCard v-for="[key, player] of players" :key="key" class="text-center">
      <div
        class="flex flex-row items-center justify-between"
        @click="() => (isOpen = true)"
      >
        <div>
          <div class="font-bold">#{{ "1" }}</div>
          <UIcon v-if="player.isHost" name="i-mdi-crown" />
        </div>
        <div>
          <div>
            <span class="font-bold">
              {{ player.username }}
            </span>
            <span v-if="$io.id === key"> ( You ) </span>
          </div>
          <div>{{ player.points ?? 0 }} points</div>
        </div>
        <UAvatar
          :src="`https://api.dicebear.com/9.x/adventurer-neutral/svg?${player.avatarSeed}`"
          :name="`${player.username} Avatar`"
          size="sm"
        />
        <UModal v-model="isOpen"> Hey hey hey </UModal>
      </div> </UCard
    ><UCard v-for="item in emptySlots" :key="item">
      <div class="flex justify-around">
        <span
          class="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-dark-mode-400"
        >
          <UIcon name="i-heroicons-user" />
        </span>
        <span>Empty</span>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp();

const { players } = storeToRefs(useRoomStore());

const emptySlots = computed(() => 4 - players.value.size);

const isOpen = ref(false);

onBeforeUnmount(() => {
  players.value.clear; //player array isn't emptied for room creator
});
</script>
