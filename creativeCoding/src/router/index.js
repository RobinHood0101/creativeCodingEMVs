import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PatternView from "../views/PatternView.vue";
import ImageManipulationView from "../views/ImageManipulationView.vue";
import AgentView from "../views/AgentView.vue";
import LSystemView from "../views/LSystemView.vue";

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
    ],
});

export default router;
