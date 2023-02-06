import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
// Vue router  imports
import { createRouter } from "vue-router";
import router from "./router";
// Font Awesome imports
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

library.add(faPaperPlane);
library.add(faClock);

const app = createApp(App);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
