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
      guage: Object.assign({}, PieConfig.templates.echarts.sampleStyle.pie, {
        label: {
          show: false,
          hidePosition: true,
          position: "",
          color: "#000",
          fontSize: 12,
          fontFamily: "Microsoft YaHei",
          isShowNumber: false
        },
        radiusConfig: {
          axisLineWidth: 2,
          inside: 0,
          outside: 90
        },
        splitNumber: 5,
        pointer: {
          show: true,
          length: 50,
          width: 4
        },
        splitLine: {
          show: true,
          length: 6,
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "auto"
          }
        },
        axisTick: {
          showt: true,
          length: 2
        },
        endAngle: -45,
        startAngle: 225
      })
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
  createType: ChartType.guage,
  enable: true
};

/**
 * 配置项
 */
const config = ObjectUtil.copy(TargetPieConfig.config);

const GuageConfig: ChartConfigItem = {
  templates,
  menuOptions,
  createMenuConfig,
  config
};

export default GuageConfig;
