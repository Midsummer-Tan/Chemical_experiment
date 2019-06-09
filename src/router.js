import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: () => import("./views/Login")
    },
    {
      path: "index",
      component: () => import("./views/Index"),
      children: [
        {
          path: "/collection",
          component: () => import("./components/Collection")
        },
        {
          path: "/experiment/:id",
          component: () => import("./components/Experiment")
        },
        {
          path: "/experiment_b/:id",
          component: () => import("./components/ExperimentB")
        }
      ]
    }
  ]
});