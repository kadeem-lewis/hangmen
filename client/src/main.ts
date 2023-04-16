import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
// Vue router  imports
import router from "./router";
//Socket io connection
import SocketPlugin from "./plugins/SocketPlugin";
// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faPaperPlane);
library.add(faClock);
library.add(faCopy);
library.add(faCheck);

const app = createApp(App);
app.use(router);
//app.use(SocketPlugin);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
