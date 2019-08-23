import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component:resolve => require(["./views/Login"],resolve)
    },
    {
      path: "/adminchemistry",
      component: resolve => require(["./views/admin"], resolve)
    },
    {
      path: "index",
      component: resolve => require(["./views/Index"], resolve),
      children: [
        {
          path: "/collection",
          component: resolve => require(["./components/Collection"], resolve)
        },
        {
          path: "/experiment_b/:id",
          component: resolve => require(["./components/ExperimentB"], resolve)
        }
      ]
    }
  ]
});
