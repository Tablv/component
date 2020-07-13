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
          unit: ""
        },
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontFamily: "Microsoft YaHei",
          fontSize: 12,
          isShowNumer: false
        },
        axisLabel: {
          interval: 0,
          rotate: 0
        },
        decimals: {
          value: 0,
          unit: ""
        },
        grid: {
          // 初始值需要与全局配置保持一致
          top: {
            value: 60,
            unit: "px"
          },
          left: {
            value: 50,
            unit: "px"
          },
          right: {
            value: 50,
            unit: "px"
          },
          bottom: {
            value: 30,
            unit: "px"
          }
        }
      }
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
