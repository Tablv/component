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

}

/**
 * 图表类型
 */
export interface BiaxialSeriesOption {}