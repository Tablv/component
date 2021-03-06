import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      line: {
        decimals: {
          value: 0,
          unit: ""
        },
        label: {
          show: false,
          position: "top",
          color: "#000",
          fontSize: 12,
          fontFamily: "Microsoft YaHei",
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
        symbol: "emptyCircle",
        // 标记大小
        symbolSize: 5,
        // 标记旋转角度 (统一)
        symbolRotate: 0,
        // 是否连接空数据
        connectNulls: false,
        // 是否平缓曲线
        smooth: false
      }
    },
    grid: {
      show: false,
      containLabel: true,
      top: 60,
      left: 60,
      right: 60,
      bottom: 60
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
  iconClass: "gw-iconfsux_zhexiantu",
  title: "折线图",
  createType: ChartType.line,
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
          symbol: ">",
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
          symbol: ">=",
          value: 1
        }
      ]
    }
  ]
};

const LineConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default LineConfig;
