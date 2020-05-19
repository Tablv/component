import { OrderType } from "glaway-bi-model/enums/OrderType";

/**
 * 排序 参数
 */
export default interface OrderDTO {
  /**
   * 表别名
   */
  tableAlias?: string;

  /**
   * 字段名
   */
  columnName?: string;

  /**
   * 字段别名
   */
  alias?: string;

  /**
   * 排序
   */
  sort: OrderType;
}
