<template>
  <div>
    <input type="text" />
    <button>Send</button>
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
