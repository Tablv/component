import * as baseOption from "./ChartBaseOption";
/**
 * 图表样式-基类
 */
export interface SeriesOption {
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
  label: Partial<baseOption.ILabel>;

  /**
   * 数据小数设置
   */
  decimals: {
    value: number;
    unit: string | number;
  };

  grid: {
    // 初始值需要与全局配置保持一致
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
    }
  };
}
/**
 * 柱状图
 */
export interface BarSeriesOption extends SeriesOption {
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
export interface BarStackSeriesOption extends BarSeriesOption {}

/**
 * 百分比堆积柱图
 */
export interface BarPercentageSeriesOption extends BarStackSeriesOption {}

/**
 * 条形图
 */
export interface HBarSeriesOption extends BarSeriesOption {}

/**
 * 堆积条形图
 */
export interface HBarStackSeriesOption extends HBarSeriesOption {}

/**
 * 百分比堆积条图
 */
export interface HBarPercentageSeriesOption extends HBarStackSeriesOption {}

/**
 * 线形图
 */
export interface LineSeriesOption extends SeriesOption{
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
//  */
// export interface PieSeriesOption extends SeriesOption {
//   centerConfig: {
//     xAxias: string;
//     yAxias: string;
//   };
//   radiusConfig: {
//     inside: string | number;
//     outside: string | number;
//     axisLineWidth: string | number;
//   };
// }

// /**
//  * 图表类型
//  */
// export interface RadarSeriesOption extends PieSeriesOption {}

// /**
//  * 图表类型
//  */
// export interface RosePieSeriesOption extends PieSeriesOption {}

// /**
//  * 图表类型
//  */
// export interface RPieSeriesOption extends PieSeriesOption {}

// /**
//  * 图表类型
//  */
// export interface SunPieSeriesOption extends PieSeriesOption {}

// /**
//  * 图表类型
//  */
// export interface TargetPieSeriesOption extends PieSeriesOption {}

// /**
//  * 图表类型
//  */
// export interface GaugeSeriesOption extends PieSeriesOption {
//   splitNumber: number;
//   pointer: {
//     show: boolean;
//     length: number;
//     width: number;
//   };
//   splitLine: {
//     show: boolean;
//     length: number;
//     // 属性lineStyle控制线条样式
//     lineStyle: {  
//       color: string;
//     };
//   },
//   axisTick: {
//     showt: boolean;
//     length: number;
//   };
//   endAngle: number;
//   startAngle: number;
// }

/**
 * 漏斗图配置
 */
export interface FunnelSeriesOption extends SeriesOption, Partial<{
  /**
   * 数据最小值
   */
  min: number;

  /**
   * 数据最大值
   */
  max: number;

  /**
   * 数据最小值 min 映射的宽度
   */
  minSize: string;

  /**
   * 数据最大值 max 映射的宽度。
   */
  maxSize: string;

  /**
   *  数据排序 'ascending'，'descending'，'none'
   * 
  */
  sort: string;

  /**
    * 水平方向对齐布局类型
    */
  funnelAlign: string;

  /**
    * gap
    */
  gap: number;

  /**
   * 漏斗图组件离容器左侧的距离。
   */
  left: number | string;

  /**
   * 漏斗图组件离容器上侧的距离
   */
  top: number | string;

  /**
   * 漏斗图组件离容器右侧的距离。
   */
  right: number | string;

  /**
   * 漏斗图组件离容器下侧的距离
   */
  bottom: number | string;

  /**
   * 漏斗图组件的宽度。 默认自适应。
   */
  width?: string | number;

  /**
   * 漏斗图组件的高度。默认自适应。
   */
  height?: string | number;

  /**
   * 图形样式
   */
  itemStyle: Partial<{
    orderColor: string;
    borderWidth: number;
    borderType: string;
    shadowBlur: string;
    shadowColor: string,
    shadowOffsetX: number,
    shadowOffsetY: number,
    opacity: number
  }>;

  /**
   * 标签的视觉引导线样式
   */
  labelLine: {
    show: boolean;
    length?: number;
    lineStyle: Partial<{
      color: string,
      width: number,
      type: string,
      shadowBlur: string,
      shadowColor: string,
      shadowOffsetX: number,
      shadowOffsetY: number,
      opacity: number;
    }>;
  };

  /**
   * 所有图形的 zlevel 值。
   */
  zlevel?: number;

  /**
   * 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
   * z相比zlevel优先级更低，而且不会创建新的 Canvas。
   */
  z?: number;
  
}> {}

/**
 * 图表类型
 */
export interface BiaxialSeriesOption {}