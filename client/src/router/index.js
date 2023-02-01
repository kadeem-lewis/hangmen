import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import ChooseMode from "../views/ChooseMode.vue";
import Game from "../views/Game.vue";
import GameLobby from "../views/App/GameLobby.vue";
import GameCanvas from "../views/App/GameCanvas.vue";
import GameOver from "../views/App/GameOver.vue";
import NotFound from "../views/NotFound.vue";
const routes = [
  { name: "landing-page", path: "/", component: LandingPage },
  { name: "game-mode", path: "/mode", component: ChooseMode },
  {
    name: "game",
    path: "/game",
    component: Game,
    children: [
      { name: "game-lobby", path: "/lobby", component: GameLobby },
      { name: "game-play", path: "/play", component: GameCanvas },
      { name: "game-over", path: "/end", component: GameOver },
    ],
  },
  { path: "/:notFound(.*)", component: NotFound },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
