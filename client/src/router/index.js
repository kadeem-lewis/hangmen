import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import ChooseMode from "../views/ChooseMode.vue";
import Game from "../views/Game.vue";
const routes = [
  { path: "/", component: LandingPage },
  { path: "/mode", component: ChooseMode },
  { path: "/room", component: Game },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
