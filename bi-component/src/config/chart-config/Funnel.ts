import { ChartType } from "glaway-bi-model/enums/ChartType";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { ChartConfigItem } from "../ChartConfig";
import BarConfig from "./Bar";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      funnel: {
        min: 0,
        max: 100,
        minSize: 0,
        maxSize: 100,
        labelLine: {
          show: false
        },
        itemStyle: {
          borderColor: "#ffffff00",
          borderWidth: 0
        },
        sort: "descending",
        funnelAlign: "center",
        gap: 2,
        width: 77,
        height: 80,
        grid: {
          // 初始值需要与全局配置保持一致
          top: {
            value: 50,
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
        },
        label: {
          show: false,
          position: "inside",
          color: "#000",
          fontSize: 12,
          fontFamily: "Microsoft YaHei"
        },
        decimals: {
          value: 0,
          unit: ""
        },
        center: [
          {
            value: 50,
            unit: "px"
          },
          {
            value: 50,
            unit: "px"
          }
        ]
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
        { text: "左侧", value: "left" },
        { text: "右侧", value: "right" },
        { text: "左侧上部", value: "leftTop" },
        { text: "左侧下部", value: "leftBottom" },
        { text: "右侧上部", value: "rightTop" },
        { text: "右侧下部", value: "rightBottom" },
        { text: "内部", value: "inside" },
        { text: "内部右侧", value: "insideRight" },
        { text: "内部左侧", value: "insideLeft" }
      ]
    }
  }
};

/**
 * 创建菜单配置
 */
const createMenuConfig = {
  iconClass: "gw-iconfsux_tubiao_loudoutu",
  title: "漏斗图",
  createType: ChartType.funnel,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(BarConfig.config);

const FunnelConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default FunnelConfig;
