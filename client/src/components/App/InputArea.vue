<template>
  <form class="flex" @submit.prevent>
    <input
      type="text"
      class="basis-3/4 rounded-sm px-4 py-2 outline-none bg-dark-mode-400"
      placeholder="Enter Message..."
    />
    <button class="basic-1/4 border-2 p-2 rounded">Send</button>
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
