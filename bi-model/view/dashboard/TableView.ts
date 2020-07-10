
import { TableRelation } from "glaway-bi-model/params/JoinRelation";

/**
 * 分析数据
 */
export default interface TableView {

  /**
   * 主表信息
   */
  fromTable: TableRelation;

  /**
   * 视图名称
   */
  viewName: string;

}
