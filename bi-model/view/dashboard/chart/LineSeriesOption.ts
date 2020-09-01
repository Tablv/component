import { SeriesOption } from "./SeriesOption";

export interface LineSeriesOption extends SeriesOption {
  axisLabel: {
    interval: 0;
    rotate: 0;
  };

  /**
   * 标记形状
   'circle'; 'rect'; 'roundRect'; 'triangle'; 'diamond'; 'pin'; 'arrow'; 'none'; 'emptyCircle'
   */
  
  symbol: string;

  /**
   * 标记大小
   */
  symbolSize: number;

  /**
   * 标记旋转角度 (统一)
   */
  symbolRotate: number;

  /**
   * 是否连接空数据
   */
  connectNulls: boolean;

  /**
   * 是否平缓曲线
   */
  smooth: boolean
}