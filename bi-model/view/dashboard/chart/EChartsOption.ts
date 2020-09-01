import {
  BarSeriesOption,
  BarStackSeriesOption,
  BarPercentageSeriesOption,
  HBarSeriesOption,
  HBarStackSeriesOption,
  LineSeriesOption,
  BiaxialSeriesOption,
  HBarPercentageSeriesOption,
  FunnelSeriesOption
} from "glaway-bi-model/view/dashboard/chart/SeriesOption";
import { PieSeriesOption } from "glaway-bi-model/view/dashboard/chart/PieSeriesOption";
import { GaugeSeriesOption } from "glaway-bi-model/view/dashboard/chart/GaugeSeriesOption";
import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
/**
 * ECharts Option
 */
export default interface EChartsOption extends Partial<{
  /**
   * 标题组件，包含主标题和副标题
   */
  title: {
    text: string;
    left: string;
    textStyle: {
      color: string;
      fontStyle: string;
      fontWeight: string | number;
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      backgroundColor: string | object;
      borderColor: string;
      borderWidth: number;
      borderRadius: number | number[];
      padding: number | number[];
      shadowColor: string;
      shadowBlur: string;
      shadowOffsetX: number;
      shadowOffsetY: number;
      width: string | number;
      height: string | number;
      textBorderColor: string;
      textBorderWidth: number;
      textShadowColor: string;
      textShadowBlur: string;
      textShadowOffsetX: number;
      textShadowOffsetY: number;
      rich: object;
    };
  };

  /**
   * 图例组件。
   */
  legend: {
    show: boolean;
    left: string;
    top: string;
    data: Array<string>;
  };

  /**
   * 直角坐标系
   */
  grid: {
    id: string | number;
    show: boolean;
    zlevel: number;
    z: number;
    left: string | number | {
      value: string | number;
      unit: string;
    };
    top: string | number | {
      value: string | number;
      unit: string;
    };
    bottom: string | number | {
      value: string | number;
      unit: string;
    };
    right: string | number | {
      value: string | number;
      unit: string;
    };
    width: string | number;
    height: string | number;
    containLabel: boolean;
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    tooltip: Object;
  };

  /**
   * 视觉映射组件
   */
  visualMap: {
    type: string;
    id: string | number;
    min: number;
    max: number;
    range: number[];
    calculable: boolean;
    realtime: boolean;
    inverse: boolean;
    precision: number;
    itemWidth: number;
    itemHeight: number;
    algin: string;
    text: string[];
    textGap: number;
    show: boolean;
    dimension: number;
    seriesIndex: number | Array<any>;
    hoverLink: boolean;
    inRnage: Object;
    outOfRange: Object;
    controller: Object;
    zlevel: number;
    z: number;
    left: string | number;
    top: string | number;
    right: string | number;
    bottom: string | number;
    orient: string;
    padding: number | number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    color: string[];
    textStyle: {
      color: string;
      fontStyle: string;
      fontWeight: string | number;
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      backgroundColor: string | object;
      borderColor: string;
      borderWidth: number;
      borderRadius: number | number[];
      padding: number | number[];
      shadowColor: string;
      shadowBlur: string;
      shadowOffsetX: number;
      shadowOffsetY: number;
      width: string | number;
      height: string | number;
      textBorderColor: string;
      textBorderWidth: number;
      textShadowColor: string;
      textShadowBlur: string;
      textShadowOffsetX: number;
      textShadowOffsetY: number;
      rich: object;
    }
  };

  tooltip: {
    show: boolean;
    trigger: string;
    axisPointer: {
      type: string;
      axis: string;
      snap: boolean;
      z: number;
      label: Object; /// 后面修改
      lineStyle: Object; // 后面修改
    };
  };

  geo: Object; // 以后修改

  color: string[];

  backgroundColor: string;

  xAxis: Array<ChartSeries>;

  yAxis: Array<ChartSeries>;

}>{
  sampleStyle: EChartsSampleStyle;

  series: Array<ChartSeries>;
}

/**
 * Echarts Series
 */
export interface ChartSeries {
  name?: string;
  type?: string;
  data?: Array<number> | Array<string>;
}

/**
 * 各图表自定义样式
 *
 * (用于合成Series数组 或 合并数值、单位 生成属性)
 *
 */
export interface EChartsSampleStyle {
  // 全局配置
  global: {
    color: Array<string>;
    grid: {
      top: {
        value: number;
        unit: string;
      };
      left: {
        value: number;
        unit: string;
      };
      right: {
        value: number;
        unit: string;
      };
      bottom: {
        value: number;
        unit: string;
      };
    };
  };

  // 柱图配置
  bar?: BarSeriesOption;

  // 堆积柱图
  barStack?: BarStackSeriesOption;

  // 百分比堆积柱图
  barPercentage?: BarPercentageSeriesOption;

  // 条图
  hbar?: HBarSeriesOption;

  // 堆积条图
  hbarStack?: HBarStackSeriesOption;

  // 百分比堆积条图
  hbarPercentage?: HBarPercentageSeriesOption;

  // 饼图配置
  pie?: PieSeriesOption;

  //环形图配置
  rpie?: PieSeriesOption;

  //玫瑰图配置
  rosepie?: PieSeriesOption;

  //旭日图配置
  sunpie?: PieSeriesOption;

  //雷达图配置
  radar?: PieSeriesOption;

  // 线图配置
  line?: LineSeriesOption;

  // 组合图配置
  biaxial?: BiaxialSeriesOption;

  // 仪表盘
  gauge?: GaugeSeriesOption;

  targetpie?: PieSeriesOption;

  funnel?: FunnelSeriesOption;

  map?: MapSeriesOption;
}
