import { useStorage } from "@vueuse/core";

export const useConnectionStore = defineStore("connection", () => {
  // const username = useStorage("username", "");
  // const avatar = ref("");
  // const seed = useStorage("userSeed", "");

  const { $io } = useNuxtApp();
  function bindEvents() {}

  function register() {
    // $io.auth = { username, avatar };
    $io.connect();
    navigateTo({ path: "/mode" });
  }

  return {
    // username,
    // avatar,
    // seed,
    bindEvents,
    register,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectionStore, import.meta.hot));
}
