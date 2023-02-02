<template>
  <div class="bg-slate-800">
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
