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
        // 半径
        radius: 90,
        // 分割段数
        splitNumber: 3,
        // 轴线
        axisLine: {
          lineStyle: {
            width: 12
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
          color: 'auto',
          fontFamily: "Microsoft YaHei",
          fontSize: 16,
          lineHeight: 16,
          backgroundColor: '#00000000',
          borderColor: 'auto',
          borderWidth: 0,
          borderRadius: 0,
          padding: 0,
          shadowColor: 'auto',
          shadowBlur: 0,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          textBorderColor: 'auto',
          textBorderWidth: 0,
          textShadowColor: 'auto',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 0
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
