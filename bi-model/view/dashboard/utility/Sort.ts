import OrderDTO from 'glaway-bi-model/params/OrderDTO';
import { SortType } from "glaway-bi-model/enums/SortType";

/**
 * 排序
 */
export default interface Sort {
  /**
   * ID
   */
  id: string;

  /**
   * 排序类型
   */
  type: SortType;

  /**
   * 排序数据
   */
  data: Array<OrderDTO>;

  /**
   * 自定义排序
   */
  custom: Array<string>;
}