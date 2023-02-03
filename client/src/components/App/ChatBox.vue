<template>
  <div class="bg-dark-mode-500 p-4">
    <div>
      <p>Hello All</p>
    </div>
    <div class="odd:bg-slate-200">
      <ChatBubble></ChatBubble>
    </div>
  </div>
</template>
<script>
import ChatBubble from "./ChatBubble.vue";
export default {
  components: {
    ChatBubble,
  },
  data() {
    return {};
  },
};
</script>
