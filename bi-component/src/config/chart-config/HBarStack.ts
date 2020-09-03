import ObjectUtil from "glaway-bi-util/ObjectUtil";
import HBarConfig from "./HBar";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      hbarStack: ObjectUtil.copy(HBarConfig.templates.echarts.sampleStyle.hbar)
    },
    grid: ObjectUtil.copy(HBarConfig.templates.echarts.grid),
    tooltip: ObjectUtil.copy(HBarConfig.templates.echarts.tooltip)
  }
};

/**
 * 菜单选项
 */
const menuOptions = ObjectUtil.copy(HBarConfig.menuOptions);

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_duijizhuzhuangtu1",
  title: "堆积条图",
  createType: ChartType.hbarStack,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(HBarConfig.config);

const HBarStackConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default HBarStackConfig;
