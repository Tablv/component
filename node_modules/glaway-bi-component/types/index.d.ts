import Vue from "vue";
import ChartUIService from "glaway-bi-component/src/interfaces/ChartUIService";

export interface InstallationOptions {
  locale: any,
  i18n: any,
  size: string
}

/**
 * Install all glaway-bi-component components into Vue.
 * Please do not invoke this method directly.
 * Call `Vue.use(BIComponent)` to install.
 */
export function install (vue: typeof Vue, options: InstallationOptions): void

export interface ChartComponent extends ChartUIService {}
