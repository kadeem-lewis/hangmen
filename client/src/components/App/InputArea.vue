<template>
  <div class="flex">
    <input
      type="text"
      class="basis-3/4 bg-slate-500 rounded-md p-2 outline-none"
    />
    <button class="basic-1/4 border-2 p-2 rounded">Send</button>
  </div>
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
