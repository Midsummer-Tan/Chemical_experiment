import Progress from './Progress';
Progress.install = function (Vue) {
  Vue.component(Progress.name, Progress);
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default Progress;
