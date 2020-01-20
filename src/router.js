import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      component:resolve => require(["./views/Login"],resolve)
    },
    {
      path: "/admin",
      component: resolve => require(["./views/admin_login"], resolve)
    },
    {
      path: "/adminadduser",
      component: resolve => require(["./views/admin_adduser"], resolve)
    },
    {
      path: "/adminindex",
      component: resolve => require(["./views/admin_index"], resolve)
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
        },
        {
          path: "/video",
          component: resolve => require(["./components/Video"], resolve)
        }
      ]
    }
  ]
});
