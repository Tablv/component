import * as baseOption from "./ChartBaseOption";
/**
 * 图表样式-基类
 */
export interface SeriesOption {
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
 * 图表类型
 */
export interface BiaxialSeriesOption {}