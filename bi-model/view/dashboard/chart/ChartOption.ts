/**
 * 图表样式-基类
 */
export interface ChartOption {
  /**
   * 坐标轴显示标志
   */
  axisGroup: {
    xAxis: {
      show: boolean
    },
    yAxis: {
      show: boolean
    }
  };

  /**
   * 数据标注
   */
  label: {
    show: boolean;
    // 'top' 'left' 'right' 'bottom' 'inside'
    position: string;
    // 显示数值
    isShowNumber: boolean;
    // 隐藏定位
    hidePosition?: boolean;
    color: string;
    fontSize: number;
    fontFamily: string;
  };

  /**
   * 数据小数设置
   */
  decimals: {
    value: number;
    unit: string | number;
  };
}
/**
 * 柱状图
 */
export interface BarChartOption extends ChartOption {
  /**
   * 柱宽
   */
  width: {
    value: number;
    // '%'  or  '' (px)
    unit: string;
  };
  // 圆角
  radius: number;
  axisLabel: {
    interval: 0;
    rotate: 0;
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
export interface LineChartOption extends ChartOption{
  axisLabel: {
    interval: 0;
    rotate: 0;
  };
  // 标记形状
  // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', 'emptyCircle'
  symbol: string,
  // 标记大小
  symbolSize: number,
  // 标记旋转角度 (统一)
  symbolRotate: number,
  // 是否连接空数据
  connectNulls: boolean,
  // 是否平缓曲线
  smooth: boolean
}

/**
 * 饼状图
 */
export interface PieChartOption extends ChartOption {
  centerConfig: {
    xAxias: string;
    yAxias: string;
  };
  radiusConfig: {
    inside: string | number;
    outside: string | number;
    axisLineWidth: string | number;
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
    // 属性lineStyle控制线条样式
    lineStyle: {  
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