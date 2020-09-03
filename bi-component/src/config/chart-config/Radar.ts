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
      radar: ObjectUtil.copy(PieConfig.templates.echarts.sampleStyle.pie)
    },
    tooltip: ObjectUtil.copy(PieConfig.templates.echarts.tooltip)
  }
};

/**
 * 菜单选项
 */
const menuOptions = {
  label: {
    position: {
      selection: [
        { text: "顶部", value: "top" },
        { text: "内部", value: "inside" }
      ]
    }
  }
};

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_leidatu",
  title: "雷达图",
  createType: ChartType.radar,
  enable: true
};

/**
 * 配置项
 */
const config = Object.assign(ObjectUtil.copy(PieConfig.config), {
  changeLimit: [
    {
      // 维度
      dimensions: [
        {
          symbol: ">",
          value: 0
        },
        {
          symbol: "<",
          value: 2
        }
      ],
      // 度量
      measures: [
        {
          symbol: ">",
          value: 0
        },
        {
          symbol: "<",
          value: 2
        }
      ]
    },
    {
      // 维度
      dimensions: [
        {
          symbol: ">=",
          value: 0
        },
        {
          symbol: "<",
          value: 1
        }
      ],
      // 度量
      measures: [
        {
          symbol: ">",
          value: 3
        }
      ]
    }
  ]
});

const RadarConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default RadarConfig;
