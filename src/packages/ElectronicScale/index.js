import ElectronicScale from './ElectronicScale';
ElectronicScale.install = function(Vue){
  Vue.component(ElectronicScale.name, ElectronicScale);
}
/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default ElectronicScale;
