import DefaultTemplate from 'glaway-bi-component/src/config/DefaultTemplate';
import ChartComponent from "glaway-bi-component/src/components/ChartComponent.vue";

function install(Vue: any, opt = {}) {
  Vue.component("bi-component", ChartComponent);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ChartComponent,
  DefaultTemplate
};
