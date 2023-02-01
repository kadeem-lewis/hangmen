import { createApp } from "vue";
import "./style.css";
import io from "socket.io-client";
import { createRouter } from "vue-router";
import App from "./App.vue";

const socket = io("http://localhost:3005");

const app = createApp(App);

app.provide("socket", socket);
app.mount("#app");
