<template>
  <div class="grid grid-cols-4 gap-2">
    <div class="col-span-3">
      <RouterView></RouterView>
      <InputArea></InputArea>
    </div>
    <ChatBox class="h-full grid-col-span-1"></ChatBox>
  </div>
</template>

<script>
import SocketIoService from "../services/SocketIoService";
import ChatBox from "../components/App/ChatBox.vue";
import InputArea from "../components/App/InputArea.vue";
export default {
  components: {
    ChatBox,
    InputArea,
  },
  mounted() {
    this.socket = SocketIoService.setupSocketConnection();
  },
  data() {
    return {
      socket: null,
    };
  },
  beforeEnter(to, from, next) {
    if (from.name === "game-mode") {
      next();
    }
    next({ name: "game-mode" });
  },
  beforeRouteLeave(to, from, next) {
    this.socket.emit("leave-room");
    next();
  },
};
</script>
