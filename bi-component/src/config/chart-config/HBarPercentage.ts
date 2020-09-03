import ObjectUtil from "glaway-bi-util/ObjectUtil";
import HBarStackConfig from "./HBarStack";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      hbarPercentage: ObjectUtil.copy(
        HBarStackConfig.templates.echarts.sampleStyle.hbarStack
      )
    },
    grid: ObjectUtil.copy(HBarStackConfig.templates.echarts.grid),
    tooltip: ObjectUtil.copy(HBarStackConfig.templates.echarts.tooltip)
  }
};

/**
 * 菜单选项
 */
const menuOptions = ObjectUtil.copy(HBarStackConfig.menuOptions);

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_baifenbiduijitiaoxingtu",
  title: "百分比堆积条图",
  createType: ChartType.hbarPercentage,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(HBarStackConfig.config);

const HBarPercentageConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default HBarPercentageConfig;
