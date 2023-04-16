import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
// Vue router  imports
import router from "./router";
//Socket io connection
import SocketPlugin from "./plugins/SocketPlugin";

const app = createApp(App);
app.use(router);
//app.use(SocketPlugin);
app.mount("#app");
