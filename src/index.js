import ElectronicScale from './packages/ElectronicScale/index.js';
import Progress from "./packages/Progress/index.js";
// ...如果还有的话继续添加

const components = [
  ElectronicScale,
  Progress
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
  ElectronicScale,
  Progress,
  // ...如果还有的话继续添加
}
