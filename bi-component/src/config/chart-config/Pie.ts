import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      pie: {
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontSize: 12,
          fontFamily: "Microsoft YaHei",
          isShowNumber: false,
          rotate: 0,
          padding: [5, 5, 5, 5],
          borderColor: "ccc",
          borderWidth: 0,
          borderRadius: 0,
          shadowBlur: 0,
          shadowColor: "transparent",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          backgroundColor: "transparent",
          textBorderColor: "transparent",
          textBorderWidth: 0,
          textShadowColor: "transparent",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        },
        center: ["50%", "50%"],
        decimals: {
          value: 2,
          unit: ""
        },
        radius: [0, 60]
      }
    }
  }
};

/**
 * 菜单选项
 */
const menuOptions = {
  label: {
    position: {
      selection: [
        { text: "外侧", value: "top" },
        { text: "内部", value: "inside" },
        { text: "中心", value: "center" }
      ]
    }
  }
};

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_bingtu1",
  title: "饼图",
  createType: ChartType.pie,
  enable: true
};

/**
 * 配置项
 */
const config = {
  warnable: false,
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
          value: 0
        }
      ]
    }
  ]
};

const PieConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default PieConfig;
