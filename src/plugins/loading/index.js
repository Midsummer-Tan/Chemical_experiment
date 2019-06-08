import Vue from "vue";
import Loading from "./main";
const loadingBox = (Vue.prototype.$loading = new Vue(Loading).$mount());
document.body.insertBefore(loadingBox.$el, document.getElementById("app"));
