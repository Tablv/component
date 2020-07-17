/**
 * 柱状图
 */
export interface BarChartOption {
  width: {
    value: number;
    unit: string; // '%'  or  '' (px)
  };
  label: {
    show: boolean;
    position: string; // 'top' 'left' 'right' 'bottom' 'inside'
    isShowNumer: boolean;
    hidePosition?: boolean;
    color: string;
    fontSize: number;
    fontFamily: string;
  };
  radius: number;
  axisLabel: {
    interval: 0;
    rotate: 0;
  };
  decimals: {
    value: number;
    unit: string | number;
  };
}

/**
 * 堆积柱图
 */
export interface BarStackChartOption extends BarChartOption {}

/**
 * 百分比堆积柱图
 */
export interface BarPercentageChartOption extends BarStackChartOption {}

/**
 * 条形图
 */
export interface HBarChartOption extends BarChartOption {}

/**
 * 堆积条形图
 */
export interface HBarStackChartOption extends HBarChartOption {}

/**
 * 百分比堆积条图
 */
export interface HBarPercentageChartOption extends HBarStackChartOption {}

/**
 * 线形图
 */
export interface LineChartOption {
  decimals: {
    value: number;
    unit: string | number;
  };
  axisLabel: {
    interval: 0;
    rotate: 0;
  };
  label: {
    show: boolean;
    isShowNumer: boolean;
    hidePosition?: boolean;
    position: string;
    color: string;
    fontSize: number;
    fontFamily: string;
  };
}

/**
 * 饼状图
 */
export interface PieChartOption {
  label: {
    show: boolean;
    isShowNumer: boolean;
    hidePosition?: boolean;
    position: string;
    color: string;
    fontSize: number;
    fontFamily: string;
  };
  centerConfig: {
    xAxias: string;
    yAxias: string;
  };
  radiusConfig: {
    inside: string | number;
    outside: string | number;
    axisLineWidth: string | number;
  }
  decimals: {
    value: number;
    unit: string | number;
  };
}

/**
 * 图表类型
 */
export interface RadarChartOption extends PieChartOption {}

/**
 * 图表类型
 */
export interface RosePieChartOption extends PieChartOption {}

/**
 * 图表类型
 */
export interface RPieChartOption extends PieChartOption {}

/**
 * 图表类型
 */
export interface SunPieChartOption extends PieChartOption {}

/**
 * 图表类型
 */
export interface TargetPieChartOption extends PieChartOption {}

/**
 * 图表类型
 */
export interface GaugeChartOption extends PieChartOption {
  splitNumber: number;
  pointer: {
    show: boolean;
    length: number;
    width: number;
  };
  splitLine: {
    show: boolean;
    length: number;
    lineStyle: {       // 属性lineStyle控制线条样式
      color: string;
    };
  },
  axisTick: {
    showt: boolean;
    length: number;
  };
  endAngle: number;
  startAngle: number;
}

/**
 * 图表类型
 */
export interface BiaxialChartOption {}

/**
 * 图表样式
 */
export interface ChartOption
  extends BarChartOption,
    PieChartOption,
    GaugeChartOption,
    LineChartOption {}
