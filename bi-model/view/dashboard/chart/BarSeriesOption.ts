import { SeriesOption } from "./SeriesOption";

export interface BarSeriesOption extends SeriesOption {
  /**
   * 柱宽
   */
  width: {
    value: number;
    unit: string;
  };
  // 圆角
  radius: number;
  axisLabel: {
    interval: number;
    rotate: number;
  };
}