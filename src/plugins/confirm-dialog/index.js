import Vue from "vue";
import ConfirmDialog from "./main";

const confirm = Vue.extend(ConfirmDialog);
let currentMsg = null;
confirm.prototype.callBack = action => {
  if (!action) currentMsg.reject();
  currentMsg.resolve();
};
Vue.prototype.$confirm = (title, text) => {
  const newConfirm = new confirm().$mount();
  document.body.appendChild(newConfirm.$el);
  newConfirm.show(title, text);
  return new Promise((resolve, reject) => {
    currentMsg = { resolve, reject };
  });
};
