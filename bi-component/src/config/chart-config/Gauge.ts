import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import PieConfig from "./Pie";
import TargetPieConfig from "./TargetPie";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      gauge: Object.assign({}, PieConfig.templates.echarts.sampleStyle.pie, {
        // 半径
        radius: 90,
        // 分割段数
        splitNumber: 3,
        // 轴线
        axisLine: {
          lineStyle: {
            width: 12,
            color: [
              [0.3, "#1B5E20FF"],
              [0.8, "#FF6F00FF"],
              [1, "#B71C1CFF"],
              [0, 0]
            ]
          }
        },
        // 指针
        pointer: {
          show: true,
          length: 70,
          width: 5
        },
        label: {
          show: true,
          hidePosition: true,
          position: "",
          color: "auto",
          fontSize: 16,
          fontFamily: "Microsoft YaHei",
          isShowNumber: true,
          offset: [0, 50]
        },
        // 指针样式
        itemStyle: {
          color: "auto",
          borderColor: "auto",
          borderWidth: 0,
          borderType: "solid",
          shadowColor: "auto",
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          opacity: 100
        },
        // 分割线
        splitLine: {
          show: true,
          length: 20,
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto"
          }
        },
        // 刻度线
        axisTick: {
          showt: true,
          length: 7
        },
        // 刻度lable
        axisLabel: {
          show: true,
          color: "auto",
          fontSize: 12,
          fontFamily: "Microsoft YaHei"
        },
        // 标题
        title: {
          show: true,
          offsetCenter: [0, -40],
          color: "auto",
          fontFamily: "Microsoft YaHei",
          fontSize: 16,
          lineHeight: 16,
          backgroundColor: "#00000000",
          borderColor: "auto",
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: "auto",
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textBorderColor: "auto",
          textBorderWidth: 0,
          textShadowColor: "auto",
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
        },
        endAngle: -45,
        startAngle: 225,
        min: 0,
        max: 0
      })
    },
    /**
     * 提示信息
     */
    tooltip: {
      show: false,
      backgroundColor: "rgba(50,50,50,0.7)",
      borderColor: "#333",
      borderWidth: 0,
      padding: 5,
      textStyle: {
        color: "#fff",
        fontStyle: "normal",
        fontWeight: "normal",
        fontFamily: "Microsoft YaHei",
        fontSize: 14,
        textBorderColor: "transparent",
        textBorderWidth: 0,
        textShadowColor: "transparent",
        textShadowBlur: 0,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0
      }
    }
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
  iconClass: "gw-iconfsux_tubiao_yibiaopan",
  title: "仪表盘",
  createType: ChartType.gauge,
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
          symbol: ">=",
          value: 1
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
    }
  ]
};

const GaugeConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default GaugeConfig;
