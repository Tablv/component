import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ChartConfigItem } from "../ChartConfig";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import PieConfig from "./Pie";

/**
 * 初始化模板
 */
const templates = {
  echarts: {
    sampleStyle: {
      targetpie: Object.assign(
        {},
        PieConfig.templates.echarts.sampleStyle.pie,
        {
          radiusConfig: {
            inside: 65,
            outside: 60
          }
        }
      )
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
