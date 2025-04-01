import { createRouter, createWebHistory } from "vue-router";
import Callback from "@/components/Callback.vue";
import Login from "@/components/Login.vue";

const routes = [
    {
        path: "/success", // GitHub redirect URI
        name: "Callback",
        component: Callback, // Renders the component responsible for handling GitHub OAuth
    },
    // default homepage route
    {
        path: "/",
        name: "Login",
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;