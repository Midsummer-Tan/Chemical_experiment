import Vue from "vue";
import SnackBar from "./main";
const snackBar = (Vue.prototype.$snackbar = new Vue(SnackBar).$mount());
document.body.appendChild(snackBar.$el);
