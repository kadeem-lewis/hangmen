<template>
  <div class="space-y-8">
    <h2 class="text-center text-2xl font-bold">Choose Mode</h2>
    <div class="grid gap-8 lg:grid-cols-2">
      <UCard>
        <template #header>
          <h4 class="text-2xl">Create Game</h4>
        </template>
        <div class="flex h-full items-end justify-center">
          <UButton block @click="createGame">Create Game</UButton>
        </div>
      </UCard>
      <UCard>
        <template #header>
          <h4 class="text-2xl">Join Game</h4>
        </template>
        <UForm
          ref="form"
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="joinGame"
          @error="console.log"
        >
          <UAlert
            v-if="serverError"
            title="Failed to join Room"
            :description="serverError"
          />
          <UFormGroup label="Enter Room Code" name="gameCode">
            <UInput v-model="state.gameCode" placeholder="Room Code:" />
          </UFormGroup>
          <UButton type="submit" block>Join Game</UButton>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
const { $io } = useNuxtApp();

const schema = z.object({
  gameCode: z.string().length(5, "Invalid room code"),
});

type State = z.infer<typeof schema>;

const state: State = reactive({
  gameCode: "",
});

const serverError = ref<string>();

const { players, messages } = storeToRefs(useRoomStore());

onMounted(() => {
  $io.on(ServerEvents.CREATE_ROOM, (roomCode) => {
    $io.emit(ClientEvents.JOIN_ROOM, roomCode, (response) => {
      const date = useDateFormat(useNow(), "HH:mm");

      if (response.data) {
        console.log(response.data.playerList);
        players.value = new Map(response.data.playerList);

        const message = {
          id: nanoid(),
          sender: response.data.player.username,
          text: `has joined the game.`,
          time: date.value,
        };
        messages.value.push(message);
      }
    });
    navigateTo({
      path: `/game/${roomCode}/lobby`,
    });
  });
});

onUnmounted(() => {
  $io.off(ServerEvents.CREATE_ROOM);
});
const createGame = () => {
  $io.emit(ClientEvents.REQUEST_ROOM_CODE);
};

const joinGame = (event: FormSubmitEvent<State>) => {
  console.log(event.data);
  const room = state.gameCode.toUpperCase();
  $io.emit(ClientEvents.JOIN_ROOM, room, (response) => {
    if (response.status === "ok") {
      const date = useDateFormat(useNow(), "HH:mm");

      if (response.data) {
        players.value = new Map(response.data.playerList);

        const message = {
          id: nanoid(),
          sender: response.data.player.username,
          text: `has joined the game.`,
          time: date.value,
        };
        messages.value.push(message);
      }

      navigateTo({
        path: `/game/${room}/lobby`,
      });
    } else {
      console.log(response.message);
      serverError.value = response.message;
    }
  });
};
</script>
