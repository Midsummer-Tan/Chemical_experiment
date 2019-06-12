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
          path: "/experiment/1",
          component: () => import("./components/Experiment")
        },
        {
          path:"/experiment/2",
          component:()=>import("./components/Testgltf")
        },
        {
          path: "/experiment_b/:id",
          component: () => import("./components/ExperimentB")
        }
      ]
    }
  ]
});
