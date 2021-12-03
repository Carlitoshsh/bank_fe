import { createRouter, createWebHashHistory } from "vue-router";
import LogIn from "../components/LogIn.vue";
import SignUp from "../components/SignUp.vue";
import Home from "../components/Home.vue";
import Account from "../components/Account.vue";
import Transaction from "../components/Transaction.vue";

const routes = [
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
  {
    path: "/user/home",
    name: "home",
    component: Home,
  },
  {
    path: "/user/account",
    name: "account",
    component: Account,
  },
  {
    path: "/user/transaction",
    name: "transaction",
    component: Transaction,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
