import { ChartType } from "glaway-bi-model/enums/ChartType";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { ChartConfigItem } from "../ChartConfig";
import BarConfig from "./Bar";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      funnel: Object.assign({}, BarConfig.templates.echarts.sampleStyle.bar)
    }
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
  iconClass: "gw-iconfsux_tubiao_loudoutu",
  title: "漏斗图",
  createType: ChartType.funnel,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(BarConfig.config);

const FunnelConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default FunnelConfig;
