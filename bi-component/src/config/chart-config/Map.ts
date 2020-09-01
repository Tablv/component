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
      show: true,
      map: 'china',
      // roam: 'scale',
      // center: [115.97, 29.71],
      // aspectScale: 75,
      // zoom: 1.2,
      // scaleLimit: {
      //   min: 1,
      //   max: 1
      // },
      // selectedMode: false,
      // nameMap: {},
      // nameProperty: 'name',
      // boundingCoords: [
      //   // 定位左上角经纬度
      //   [-180, 90],
      //   // 定位右下角经纬度
      //   [180, -90]
      // ],
      mapList: ['china'],
      // itemStyle: {
      //   areaColor: {
      //     type: "radial",
      //     x: 1,
      //     y: 1,
      //     x2: 0,
      //     y2: 0,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: "#abcdef" // 0% 处的颜色
      //       },
      //       {
      //         offset: 0.5,
      //         color: "#123456" // 50% 处的颜色
      //       },
      //       {
      //         offset: 1,
      //         color: "#abcdef" // 100% 处的颜色
      //       }
      //     ],
      //     global: true // 缺省为 false
      //   },
      //   color: 'auto',
      //   borderColor: '#000',
      //   borderWidth: 0,
      //   borderType: 'solid',
      //   shadowBlur: 0,
      //   shadowColor: 'auto',
      //   shadowOffsetX: 0,
      //   shadowOffsetY: 0,
      //   opacity: 1,
      // },
      // emphasis: {
      //   itemStyle: {
      //     areaColor: {
      //       type: "radial",
      //       x: 1,
      //       y: 1,
      //       x2: 0,
      //       y2: 0,
      //       colorStops: [
      //         {
      //           offset: 0,
      //           color: "#abcdef" // 0% 处的颜色
      //         },
      //         {
      //           offset: 0.5,
      //           color: "#123456" // 50% 处的颜色
      //         },
      //         {
      //           offset: 1,
      //           color: "#abcdef" // 100% 处的颜色
      //         }
      //       ],
      //       global: true // 缺省为 false
      //     },
      //     color: 'auto',
      //     borderColor: '#000',
      //     borderWidth: 0,
      //     borderType: 'solid',
      //     shadowBlur: 0,
      //     shadowColor: 'auto',
      //     shadowOffsetX: 0,
      //     shadowOffsetY: 0,
      //     opacity: 1
      //   }
      // },
      // zlevel: 1,
      // z: 1,
      // left: 'auto',
      // top: 'auto',
      // right: 'auto',
      // bottom: 'auto',
      // layoutCenter: ['50%', '50%'],
      // layoutSize: 100,
      // regions: [{
      //   name: '北京',
      //   itemStyle: {
      //       areaColor: '#ff0000',
      //       color: '#ff0000'
      //   }
      // }],
      // silent: true
    },
    // 视觉映射组件
    visualMap: {
      type: 'piecewise',
      show: true,
      min: 0,
      max: 10000
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
