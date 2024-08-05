import type { Message, User } from "@hangmen/shared";

export const useRoomStore = defineStore("room", () => {
  const messages = ref<Message[]>([]);
  const hasLeftRoom = ref(false);
  const settings = ref({});
  const players = ref(new Map<string, User>());

  return {
    messages,
    hasLeftRoom,
    settings,
    players,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRoomStore, import.meta.hot));
}
