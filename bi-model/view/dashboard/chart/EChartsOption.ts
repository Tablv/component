import { BiaxialSeriesOption } from "glaway-bi-model/view/dashboard/chart/SeriesOption";
import { PieSeriesOption } from "glaway-bi-model/view/dashboard/chart/PieSeriesOption";
import { BarSeriesOption } from "glaway-bi-model/view/dashboard/chart/BarSeriesOption";
import { GaugeSeriesOption } from "glaway-bi-model/view/dashboard/chart/GaugeSeriesOption";
import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
import { LineSeriesOption } from "glaway-bi-model/view/dashboard/chart/LineSeriesOption";
import { FunnelSeriesOption } from "glaway-bi-model/view/dashboard/chart/FunnelSeriesOption";
import * as baseOption from "./ChartBaseOption";
/**
 * ECharts Option
 */
export default interface EChartsOption extends Partial<{
  /**
   * 标题组件，包含主标题和副标题
   */
  title: Partial<{
    id: string;
    show: boolean;
    text: string;
    link: string;
    target: baseOption.ETarget;
    subtext: string;
    sublink: string;
    subtarget: baseOption.ETarget;
    textAlign: baseOption.EAlign;
    textVerticalAlign: baseOption.EVerticalAlign;
    triggerEvent: boolean;
    padding: number | number[];
    itemGap: number;
    z: number;
    zlevel: number;
    backgroundColor: string;
    textStyle: Partial<{
      rich: object;
    } & baseOption.IFont & baseOption.IHWL& baseOption.ITextBorder & baseOption.ITextShadow>;
    subtextStyle: Partial<{
      rich: object;
      align: baseOption.ETarget;
      verticalAlign: baseOption.EAlign;
    } & baseOption.IFont & baseOption.IHWL& baseOption.ITextBorder & baseOption.ITextShadow>;
  } & baseOption.IBorder & baseOption.IShadow & baseOption.IPosition>;

  /**
   * 直角坐标系
   */
  grid: {
    id: string | number;
    show: boolean;
    zlevel: number;
    z: number;
    left: string | number | baseOption.IValueUnit;
    top: string | number | baseOption.IValueUnit;
    bottom: string | number | baseOption.IValueUnit;
    right: string | number | baseOption.IValueUnit;
    width: string | number;
    height: string | number;
    containLabel: boolean;
    backgroundColor: string;
    tooltip: Object;
  } & baseOption.IShadow & baseOption.IBorder;

  /**
   * 视觉映射组件
   */
  visualMap: {
    type: string;
    id: string | number;
    show: boolean;
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
    dimension: number;
    seriesIndex: number | Array<any>;
    hoverLink: boolean;
    inRnage: Object;
    outOfRange: Object;
    controller: Object;
    zlevel: number;
    z: number;
    orient: string;
    padding: number | number[];
    backgroundColor: string;
    color: string[];
    textStyle: baseOption.ItextStyle;
  } & baseOption.IPosition & baseOption.IBorder & baseOption.IScaleLimite;

   /**
   * 图例组件。
   */
  legend: {
    type: string;
    id: string;
    zlevel: number;
    z: number;
    show: boolean;
    widht: string | number;
    height: string | number;
    orient: string;
    align: string;
    padding: number | number[];
    itemGap: number;
    itemWidth: number;
    itemHeight: number;
    symbolKeepAspect: boolean;
    formatter: string | Function;
    selectedMode: boolean;
    inactiveColor: string;
    selected: Object;
    textStyle: baseOption.ItextStyle;
    icon: string;
    backgroundColor: string;
  } & baseOption.IPosition & baseOption.IBorder & baseOption.IShadow;


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
    showContent: boolean;
    alwaysShowContent: boolean;
    triggerOn: string;
    showDelay: number;
    hideDelay: number;
    enterable: boolean;
    renderMode: string;
    confine: boolean;
    appendToBody: boolean;
    transitionDuration: number;
    position: string | Function | Array<number | string>;
    formatter: string | Function;
    backgroundColor: string;
    padding: number | number[];
    textStyle: baseOption.ItextStyle;
    extraCssText: string;
  } & baseOption.IBorder;

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
  barStack?: BarSeriesOption;

  // 百分比堆积柱图
  barPercentage?: BarSeriesOption;

  // 条图
  hbar?: BarSeriesOption;

  // 堆积条图
  hbarStack?: BarSeriesOption;

  // 百分比堆积条图
  hbarPercentage?: BarSeriesOption;

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
