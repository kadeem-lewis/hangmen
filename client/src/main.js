import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import io from "socket.io-client";
// Vue router  imports
import { createRouter } from "vue-router";
import router from "./router";
// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const socket = io("http://localhost:3005");

library.add(faPaperPlane);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.provide("socket", socket);
app.mount("#app");
