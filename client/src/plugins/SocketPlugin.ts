import { App } from "vue";
import { io, Socket } from "socket.io-client";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

export default {
  install: (app: App, options: any) => {
    const serverUrl =
      import.meta.env.VITE_SERVER_URL || "http://localhost:3005";
    const socket = io(serverUrl);

    app.config.globalProperties.$socket = socket;
    app.provide("$socket", socket);
  },
};
