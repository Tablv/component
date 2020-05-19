import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { WarnDisplayType, WarnSymbolType } from "glaway-bi-model/enums/WarnType";
import { SortType } from "glaway-bi-model/enums/SortType";
import TableVO from "glaway-bi-model/results/TableVO";
import JoinRelation from "glaway-bi-model/params/JoinRelation";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import WhereDTO from "glaway-bi-model/params/WhereDTO";
import OrderDTO from "glaway-bi-model/params/OrderDTO";

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
   * 分析后暂存的数据
   */
  resultTmp: AnalysisResults;

  /**
   * 过滤器
   */
  filter: {
    /**
     * ID
     */
    id: string;

    /**
     * 条件数据
     */
    data: Array<WhereDTO>;
  };

  /**
   * 排序
   */
  sort: {
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
  };

  /**
   * 预警
   */
  warn: {
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
  };
}
