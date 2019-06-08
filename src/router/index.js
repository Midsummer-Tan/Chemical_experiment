import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("@/views/Index")
    },
    {
      path: "/experiment",
      name: "scene",
      component: () => import("@/components/Scene")
    }
  ]
});
