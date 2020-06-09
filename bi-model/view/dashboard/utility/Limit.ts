import LimitDTO from 'glaway-bi-model/params/LimitDTO';

/**
 * 排序
 */
export default interface Sort {
  /**
   * ID
   */
  id: string;

  /**
   * 排序数据
   */
  data: Array<LimitDTO>;
}