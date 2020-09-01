import ObjectUtil from "glaway-bi-util/ObjectUtil";
import BarConfig from "./Bar";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      hbar: ObjectUtil.copy(BarConfig.templates.echarts.sampleStyle.bar)
    },
    grid: ObjectUtil.copy(BarConfig.templates.echarts.grid)
  }
};

/**
 * 菜单选项
 */
const menuOptions = ObjectUtil.copy(BarConfig.menuOptions);

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_zhuzhuangtu",
  title: "条图",
  createType: ChartType.hbar,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(BarConfig.config);

const HBarConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default HBarConfig;
