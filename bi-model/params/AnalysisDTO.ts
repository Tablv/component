import FieldDTO from "./FieldDTO";
import JoinRelation, { TableRelation } from "./JoinRelation";
import WhereDTO from "./WhereDTO";
import OrderDTO from "./OrderDTO";

/**
 * 分析 参数
 */
export default interface AnalysisDTO {
  /**
   * dashboard 编号
   */
  dashboardId: string;

  /**
   * 主表信息
   */
  from?: TableRelation | null;

  /**
   * 视图名称
   */
  viewName: string;
  
  /**
   * join 查询
   */
  join?: Array<JoinRelation>;

  /**
   * 字段数组
   */
  fields: Array<FieldDTO>;

  /**
   * where 条件
   */
  where: Array<WhereDTO>;

  /**
   * order 排序
   */
  order: Array<OrderDTO>;

  /**
   * limit 排名
   */
  limit: string;
}
