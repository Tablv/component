import ChartComponent from "glaway-bi-component/src/components/ChartComponent.vue";
import DefaultTemplate from "@/config/DefaultTemplate";
import ParamsConverter from "glaway-bi-component/src/util/ParamsConverter";

function install(Vue: any, opt = {}) {
  Vue.component("bi-component", ChartComponent);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  ChartComponent,
  DefaultTemplate,
  ParamsConverter,
};
