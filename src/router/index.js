import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
  // {
  //   path: "/1v1",
  //   name: "1v1",
  //   component: () => import("../views/1v1.vue")
  // }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
