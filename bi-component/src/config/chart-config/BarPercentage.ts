import BarStackConfig from "./BarStack";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      barPercentage: ObjectUtil.copy(
        BarStackConfig.templates.echarts.sampleStyle.barStack
      )
    },
    grid: ObjectUtil.copy(BarStackConfig.templates.echarts.grid)
    // tooltip: ObjectUtil.copy(BarStackConfig.templates.echarts.tooltip)
  }
};

/**
 * 菜单选项
 */
const menuOptions = ObjectUtil.copy(BarStackConfig.menuOptions);

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_baifenbiduijizhuzhuangtu",
  title: "百分比堆积柱图",
  createType: ChartType.barPercentage,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(BarStackConfig.config);

const BarPercentageConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default BarPercentageConfig;
