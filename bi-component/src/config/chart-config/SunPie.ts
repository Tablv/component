import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import PieConfig from "./Pie";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      sunpie: ObjectUtil.copy(PieConfig.templates.echarts.sampleStyle.pie)
    },
    tooltip: ObjectUtil.copy(PieConfig.templates.echarts.tooltip)
  }
};

/**
 * 菜单选项
 */
const menuOptions = ObjectUtil.copy(PieConfig.menuOptions);

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_xuritu",
  title: "旭日图",
  createType: ChartType.sunpie,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(PieConfig.config);

const SunPieConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default SunPieConfig;
