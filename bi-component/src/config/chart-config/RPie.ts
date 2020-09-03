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
      rpie: Object.assign({}, PieConfig.templates.echarts.sampleStyle.pie, {
        radius: [45, 90]
      })
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
  iconClass: "gw-iconfsux_tubiao_bingtu",
  title: "环形图",
  createType: ChartType.rpie,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(PieConfig.config);

const RPieConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default RPieConfig;
