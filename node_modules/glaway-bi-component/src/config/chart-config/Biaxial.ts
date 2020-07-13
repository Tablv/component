import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      biaxial: {}
    }
  }
};

/**
 * 菜单选项
 */
const menuOptions = {};

/**
 * 配置项
 */
const config = {
  doubleMeasures: true,
  changeLimit: []
};

const BiaxialConfig: ChartConfigItem = {
  templates,
  menuOptions,
  config
};

export default BiaxialConfig;
