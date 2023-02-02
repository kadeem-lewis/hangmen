<template>
  <div class="grid grid-cols-4">
    <div class="col-span-3">
      <RouterView></RouterView>
      <InputArea></InputArea>
    </div>
    <ChatBox class="h-full grid-col-span-1"></ChatBox>
  </div>
</template>

<script>
import ChatBox from "../components/App/ChatBox.vue";
import InputArea from "../components/App/InputArea.vue";
export default {
  components: {
    ChatBox,
    InputArea,
  },
};
</script>
