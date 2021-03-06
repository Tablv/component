import { ChartConfigItem } from "glaway-bi-component/src/config/ChartConfig";
import { ChartType } from "glaway-bi-model/enums/ChartType";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      bar: {
        width: {
          value: 13,
          unit: "px"
        },
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontFamily: "Microsoft YaHei",
          fontSize: 12,
          isShowNumber: false,
          rotate: 0,
          padding: [5, 5, 5, 5],
          borderColor: "transparent",
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
        axisLabel: {
          interval: 0,
          rotate: 0
        },
        decimals: {
          value: 0,
          unit: ""
        },
        radius: 0
      }
    },
    grid: {
      show: false,
      containLabel: true,
      top: 60,
      left: 50,
      right: 50,
      bottom: 50
    }
  }
};

/**
 * 菜单选项
 */
const menuOptions = {
  series: {
    barWidth: {
      unit: {
        selection: [
          { text: "px", value: "" },
          { text: "%", value: "%" }
        ]
      }
    },
    barLabel: {
      position: {
        selection: [
          { text: "顶部", value: "top" },
          { text: "内部", value: "inside" }
        ]
      }
    }
  },
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
  iconClass: "gw-iconfsux_tubiao_zhuzhuangtu1",
  title: "柱状图",
  createType: ChartType.bar,
  enable: true
};

/**
 * 配置项
 */
const config = {
  warnable: true,
  changeLimit: [
    {
      // 维度
      dimensions: [
        {
          symbol: ">=",
          value: 0
        },
        {
          symbol: "<=",
          value: 2
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

const BarConfig: ChartConfigItem = {
  templates,
  menuOptions,
  config,
  createMenuConfig
};
export default BarConfig;
