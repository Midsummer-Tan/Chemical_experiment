import ElectronicScale from './packages/ElectronicScale/index.js';
// ...如果还有的话继续添加

const components = [
  ElectronicScale
  // ...如果还有的话继续添加
]

const install = function (Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ElectronicScale
  // ...如果还有的话继续添加
}
