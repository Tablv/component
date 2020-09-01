import { ChartConfigItem } from "glaway-bi-component/src/config/ChartConfig";
import { ChartType } from "glaway-bi-model/enums/ChartType";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      map: {
        map: "china",
        mapList: ["china"],
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontFamily: "Microsoft YaHei",
          fontSize: 12,
          isShowNumber: false
        },
        pointer: {},
        decimals: {
          value: 0,
          unit: ""
        },
        center: ["50%", "50%"],
        grid: {
          top: {
            value: 50,
            unit: "%"
          },
          left: {
            value: 50,
            unit: "%"
          },
          right: {
            value: 50,
            unit: "%"
          },
          bttom: {
            value: 50,
            unit: "%"
          }
        }
      }
    },
    // 地图组件
    geo: {
      id: 0,
      name: 'babablalla'
    }
  }
};

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_ditu_sandian",
  title: "地图",
  createType: ChartType.map,
  enable: true
};

/**
 * 菜单选项
 */
const menuOptions = {
  label: {
    position: {
      selection: [
        { text: "顶部", value: "top" },
        { text: "右部", value: "right" },
        { text: "左部", value: "left " },
        { text: "下部", value: "bottom" },
        { text: "内部", value: "inside" }
      ]
    }
  }
};

/**
 * 功能配置项
 */
const config = {
  warnable: false,
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


const MapConfig: ChartConfigItem = {
  templates,
  menuOptions,
  config,
  createMenuConfig
};
export default MapConfig;
