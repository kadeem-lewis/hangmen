import { App } from "vue";
import { io, Socket } from "socket.io-client";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $socket: Socket;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  install: (app: App, options: any) => {
    const serverUrl =
      import.meta.env.VITE_SERVER_URL || "http://localhost:3005";
    const socket = io(serverUrl);

    app.config.globalProperties.$socket = socket;
    app.provide("$socket", socket);
  };
});

//Plugin E:/Web Development/Hangman/client/plugins/SocketPlugin.ts is not wrapped in defineNuxtPlugin. It is advised to wrap your plugins as in the future this may enable enhancements.
