import type { Message, User } from "@hangmen/shared";
import { nanoid } from "nanoid";

export const useRoomStore = defineStore("room", () => {
  const { $io } = useNuxtApp();
  const messages = ref<Message[]>([]);
  const hasLeftRoom = ref(false);
  const settings = ref({});
  const players = ref(new Map<string, User>());

  function bindEvents() {
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
    $io.on(ServerEvents.RECEIVE_MESSAGE, (message) => {
      messages.value.push(message);
    });
    $io.on(ServerEvents.NEW_PLAYER, (player, playerList) => {
      players.value = new Map(playerList);
      const date = useDateFormat(useNow(), "HH:mm");

      const message = {
        id: nanoid(),
        sender: player.username,
        text: `has joined the game.`,
        time: date.value,
      };
      messages.value.push(message);
    });
    $io.on(ServerEvents.PLAYER_LEAVE_ROOM, ({ username }, playerList) => {
      players.value = new Map(playerList);
      const date = useDateFormat(useNow(), "HH:mm");

      const message = {
        id: nanoid(),
        sender: username,
        text: "has left the room",
        time: date.value,
      };
      messages.value.push(message);
    });
  }

  function createGame() {
    $io.emit(ClientEvents.REQUEST_ROOM_CODE);
  }

  function sendMessage(message: string) {
    $io.emit(ClientEvents.SEND_MESSAGE, nanoid(), message);
  }

  function leaveGame(roomCode: string) {
    $io.emit(ClientEvents.LEAVE_ROOM, roomCode, (response) => {
      if (response.status === "ok") {
        hasLeftRoom.value = true;
        $io.off(ServerEvents.NEW_PLAYER);
        navigateTo({ path: "/mode" });
      } else {
        console.error("An error has occurred");
      }
    });
  }

  return {
    messages,
    hasLeftRoom,
    settings,
    players,
    bindEvents,
    sendMessage,
    leaveGame,
    createGame,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot));
}
