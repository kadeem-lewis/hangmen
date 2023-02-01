<template>
  <h1>Game</h1>
  <RouterView></RouterView>
  <InputArea></InputArea>
  <ChatBox></ChatBox>
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
