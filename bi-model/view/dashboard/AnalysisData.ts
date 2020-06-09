
import TableVO from "glaway-bi-model/results/TableVO";
import JoinRelation from "glaway-bi-model/params/JoinRelation";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import WhereDTO from "glaway-bi-model/params/WhereDTO";
import OrderDTO from "glaway-bi-model/params/OrderDTO";
import Filter from "glaway-bi-model/view/dashboard/utility/Filter";
import Sort from "glaway-bi-model/view/dashboard/utility/Sort";
import Warn from "glaway-bi-model/view/dashboard/utility/Warn";
import Limit from "glaway-bi-model/view/dashboard/utility/Limit";

/**
 * 分析数据
 */
export default interface AnalysisData {
  /**
   * 数据集ID
   */
  datasetId: string | null;

  /**
   * 维度
   */
  dimensions: Array<FieldDTO>;

  /**
   * 度量
   */
  measures: Array<FieldDTO>;

  /**
   * 主表信息
   */
  fromTable: TableVO | null;

  /**
   * 视图名称
   */
  viewName: string;

  /**
   * 表关联字段信息
   */
  joinRelation: Array<JoinRelation>;

  /**
   * 条件查询
   */
  where: Array<WhereDTO>;

  /**
   * 排序查询
   */
  order: Array<OrderDTO>;

  /**
   * 是否参与图表联动
   */
  isReact: boolean;

  /**
   * 过滤器
   */
  filter: Filter;

  /**
   * 排序
   */
  sort: Sort;

  /**
   * 排名
   */
  limit: Limit;

  /**
   * 预警
   */
  warn: Warn;
}
