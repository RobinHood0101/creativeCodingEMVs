import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PatternView from "../views/PatternView.vue";
import ImageManipulationView from "../views/ImageManipulationView.vue";
import AgentView from "../views/AgentView.vue";
import LSystemView from "../views/LSystemView.vue";
import TextGeneratorView from "../views/TextGeneratorView.vue";
import ConwaysGameView from "../views/ConwaysGameView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/patterns",
            name: "patterns",
            component: PatternView,
        },
        {
            path: "/image-manipulation",
            name: "image-manipulation",
            component: ImageManipulationView,
        },
        {
            path: "/agent",
            name: "agent",
            component: AgentView,
        },
        {
            path: "/l-systems",
            name: "l-systems",
            component: LSystemView,
        },
        {
            path: "/text-generator",
            name: "text-generator",
            component: TextGeneratorView,
        },
        {
            path: "/conways-game",
            name: "conways-game",
            component: ConwaysGameView,
        },
    ],
});

export default router;
