import WhereDTO from "glaway-bi-model/params/WhereDTO";

/**
 * 过滤
 */
export default interface Filter {
  /**
   * ID
   */
  id: string;

  /**
   * 条件数据
   */
  data: Array<WhereDTO>;
}