<template>
  <div class="container text-white min-h-screen m-auto">
    <NavBar></NavBar>
    <main>
      <RouterView></RouterView>
    </main>
  </div>
</template>
<script>
import NavBar from "./components/NavBar.vue";
import SocketIoService from "./services/SocketIoService";
export default {
  components: {
    NavBar,
  },
  created() {
    this.socket = SocketIoService.setupSocketConnection();
  },
  mounted() {
    console.log(this.socket);
    this.socket.on("connect", () => {
      console.log("user connected");
    });
  },
};
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
body {
  background-color: hsl(0, 0%, 7%);
}
</style>
