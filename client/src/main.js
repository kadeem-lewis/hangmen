import { createApp } from "vue";
import "./style.css";
import io from "socket.io-client";
import App from "./App.vue";

const socket = io("http://localhost:3005");
createApp(App).use(store).config.globalProperties.$socket = socket;
createApp(App).mount("#app");
