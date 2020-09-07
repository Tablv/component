import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import GaugeConfig from "./Gauge";
import PieConfig from "./Pie";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      targetpie: Object.assign(
        {},
        GaugeConfig.templates.echarts.sampleStyle.gauge,
        {
          // 分割段数
          splitNumber: 1,
          // 轴线
          axisLine: {
            lineStyle: {
              width: 12
            }
          },
          // 指针
          pointer: {
            show: false
          },
          label: {
            show: true,
            color: "auto",
            fontSize: 16,
            fontFamily: "Microsoft YaHei",
            isShowNumber: true,
            offset: [0, 50],
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
          // 指针样式
          itemStyle: {},
          // 分割线
          splitLine: {
            show: false
          },
          // 刻度线
          axisTick: {
            showt: false
          },
          // 刻度lable
          axisLabel: {
            show: false
          },
          decimals: {
            value: 2,
            unit: ""
          }
        }
      )
    },
    tooltip: false,
    legend: false
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
  iconClass: "gw-iconfsux_tubiao_baifenbihuantu",
  title: "指示器",
  createType: ChartType.targetpie,
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

const TargetPieConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default TargetPieConfig;
