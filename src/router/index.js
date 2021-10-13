import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import LogIn from "../components/LogIn.vue";
import SignUp from "../components/SignUp.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/user/login",
    name: "logIn",
    component: LogIn,
  },
  {
    path: "/user/signUp",
    name: "signUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
