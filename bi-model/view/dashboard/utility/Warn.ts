import { WarnDisplayType, WarnSymbolType } from 'glaway-bi-model/enums/WarnType';

/**
 * 预警
 */
export default interface Warn {
  /**
   * ID
   */
  id: string;

  /**
   * 预警颜色
   */
  color: string;

  /**
   * 预警信息显示类型
   *  - 0: 不显示预警信息
   *  - 1: 在图表右侧显示
   *  - 2: 在鼠标移入时显示 tooltip
   */
  displayType: WarnDisplayType;

  /**
   * 预警度量与条件
   */
  value: Array<{
    /**
     * 度量名称
     */
    seriesName: string;

    /**
     * 判断符号（大于小于等）
     */
    symbol: WarnSymbolType;

    /**
     * 预警数值
     */
    value: number;
  }>;
}