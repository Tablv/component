import TableInfoVO from "glaway-bi-model/results/TableInfoVO";
import TableVO from "glaway-bi-model/results/TableVO";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import AnalysisDTO from "glaway-bi-model/params/AnalysisDTO";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import WhereDTO from "glaway-bi-model/params/WhereDTO";
import ReactWhere from "glaway-bi-model/view/ReactWhere";
import { FieldDTOBuilder } from "glaway-bi-model/params/FieldDTO";
import JoinRelation from "glaway-bi-model/params/JoinRelation";

export default class ParamsConverter {
  /**
   * 获取分析对象
   *
   * @param currentDashboard 当前仪表盘
   */
  public static getAnalysisDTO(currentDashboard: Dashboard): AnalysisDTO {
    // const fromDTO = currentDashboard.analysis.fromTable
    //     ? {
    //         schema: currentDashboard.analysis.fromTable.schema,
    //         tableName: currentDashboard.analysis.fromTable.name,
    //         alias: currentDashboard.analysis.fromTable.alias
    //       }
    //     : null;

    const {
      dimensions,
      measures,
      where,
      filter,
      sort
    } = currentDashboard.analysis;

    const analysisDTO: AnalysisDTO = {
      dashboardId: currentDashboard.id,
      from: null,
      join: [],

      // 追加维度、度量数据
      fields: ObjectUtil.mergeArray([], true, dimensions, measures),

      // 追加过滤、排序
      where: ObjectUtil.mergeArray([], true, where, filter.data),
      order: ObjectUtil.copy(sort.data)
    };

    return analysisDTO;
  }

  /**
   * 追加字段
   *
   * @param wheres DTO源数组
   * @param reactWhere 联动条件
   */
  public static setReactWhere(
    wheres: Array<WhereDTO>,
    reactWhere: ReactWhere
  ): void {
    if (reactWhere.dashboardId && reactWhere.datasetId && reactWhere.where) {
      // 联动判断
      const reactColName = reactWhere.where.columnName;

      // 去除相同的where
      wheres = wheres
        .filter(where => where.columnName !== reactColName)
        .concat(reactWhere.where);
    }
  }

  /**
   * tableInfo 转 analysisDTO
   */
  public static getFetchValuesDTO(
    fromTable: TableVO,
    joinRelations: Array<JoinRelation>,
    tableInfo: TableInfoVO
  ): AnalysisDTO {
    let fieldDTO = FieldDTOBuilder.buildFieldDTO(tableInfo);

    // 字段追加去重
    fieldDTO.func = ["distinct"];

    return {
      dashboardId: "",
      from: {
        schema: fromTable.schema,
        tableName: fromTable.name,
        alias: fromTable.alias
      },
      join: joinRelations,
      fields: [fieldDTO],
      where: [],
      order: []
    };
  }
}
