import { ChartConfigItem } from "glaway-bi-component/src/config/ChartConfig";
import { ChartType } from "glaway-bi-model/enums/ChartType";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      map: {
        type: "map",
        map: "china",
        mapList: ["china"],
        label: {
          show: false,
          color: "#000",
          fontFamily: "Microsoft YaHei",
          fontSize: 12,
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
        center: ["50%", "50%"],
        geoIndex: 0,
        itemStyle: {
          areaColor: "#fff000",
          color: {
            type: "radial",
            x: 1,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#abcdef" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "#123456" // 50% 处的颜色
              },
              {
                offset: 1,
                color: "#abcdef" // 100% 处的颜色
              }
            ],
            global: true // 缺省为 false
          },
          borderColor: "#000",
          borderWidth: 0,
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "auto",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1
        },
        emphasis: {
          itemStyle: {
            areaColor: "#f00000",
            color: {
              type: "radial",
              x: 1,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#abcdef" // 0% 处的颜色
                },
                {
                  offset: 0.5,
                  color: "#123456" // 50% 处的颜色
                },
                {
                  offset: 1,
                  color: "#abcdef" // 100% 处的颜色
                }
              ],
              global: true // 缺省为 false
            },
            borderColor: "#000",
            borderWidth: 0,
            borderType: "solid",
            shadowBlur: 0,
            shadowColor: "auto",
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        }
      }
    },
    // 地图组件
    geo: {
      show: true,
      map: "china",
      roam: "scale",
      center: [115.97, 29.71],
      aspectScale: 75,
      zoom: 1.2,
      scaleLimit: {
        min: 1,
        max: 1
      },
      // selectedMode: false,
      // nameMap: {},
      // nameProperty: 'name',
      // boundingCoords: [
      //   // 定位左上角经纬度
      //   [-180, 90],
      //   // 定位右下角经纬度
      //   [180, -90]
      // ],
      mapList: ["china"],
      itemStyle: {
        areaColor: {
          type: "radial",
          x: 1,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#abcdef" // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "#123456" // 50% 处的颜色
            },
            {
              offset: 1,
              color: "#abcdef" // 100% 处的颜色
            }
          ],
          global: true // 缺省为 false
        },
        color: "auto",
        borderColor: "#000",
        borderWidth: 0,
        borderType: "solid",
        shadowBlur: 0,
        shadowColor: "auto",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1
      },
      emphasis: {
        itemStyle: {
          areaColor: {
            type: "radial",
            x: 1,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "#abcdef" // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: "#123456" // 50% 处的颜色
              },
              {
                offset: 1,
                color: "#abcdef" // 100% 处的颜色
              }
            ],
            global: true // 缺省为 false
          },
          color: "auto",
          borderColor: "#000",
          borderWidth: 0,
          borderType: "solid",
          shadowBlur: 0,
          shadowColor: "auto",
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 1
        }
      },
      // zlevel: 1,
      // z: 1,
      // left: 'auto',
      // top: 'auto',
      // right: 'auto',
      // bottom: 'auto',
      layoutCenter: ["50%", "50%"]
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
      type: "piecewise",
      show: true,
      enable: true,
      min: 0,
      max: 100000
    },
    effectScatter: {
      show: true,
      // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      symbol: "circle",
      symbolRotate: 0,
      symbolSize: 20,
      itemStyle: {
        color: "#fff000",
        borderColor: "#000",
        borderWidth: 0,
        borderType: "solid",
        shadowBlur: 0,
        shadowColor: "auto",
        shadowOffsetX: 0,
        shadowOffsetY: 0
      },
      rippleEffect: {
        color: "auto",
        scale: 2.5
      }
    },
    lines: {
      show: true,
      symbol: "circle",
      symbolSize: 10,
      effect: {
        show: true,
        symbol: "circle",
        symbolSize: 5,
        color: "red",
        trailLength: 0.2,
        loop: true
      },
      lineStyle: {
        color: "#ff00ff",
        width: 5,
        type: "solid",
        curveness: 0.5,
        shadowBlur: 0,
        shadowColor: "auto",
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
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
