<template>
  <form class="flex relative" @submit.prevent>
    <input
      type="text"
      class="grow rounded-sm px-4 py-2 outline-none bg-dark-mode-400"
      placeholder="Enter Message..."
    />
    <button
      class="absolute right-2 p-1 rounded-md hover:bg-dark-mode-600 top-1/2 -translate-y-1/2"
    >
      <font-awesome-icon
        icon="fa-solid fa-paper-plane"
        class="text-gray-300 m-auto"
      />
    </button>
  </form>
  <KeyBoard></KeyBoard>
</template>
<script>
import KeyBoard from "./KeyBoard.vue";
export default {
  components: {
    KeyBoard,
  },
};
</script>
