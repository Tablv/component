import TableInfoVO from "glaway-bi-model/results/TableInfoVO";
import TableVO from "glaway-bi-model/results/TableVO";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import AnalysisDTO from "glaway-bi-model/params/AnalysisDTO";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import WhereDTO from "glaway-bi-model/params/WhereDTO";
import ReactWhere from "glaway-bi-model/view/ReactWhere";
import { FieldDTOBuilder } from "glaway-bi-model/params/FieldDTO";
import JoinRelation, {
  TableRelation
} from "glaway-bi-model/params/JoinRelation";

export default class ParamsConverter {
  /**
   * 获取分析对象
   *
   * @param currentDashboard 当前仪表盘
   */
  public static getAnalysisDTO(currentDashboard: Dashboard): AnalysisDTO {
    let viewNameList: string[] = [],
      fromDTO: TableRelation = {
        schema: "",
        tableName: "",
        alias: ""
      };
    if (currentDashboard.analysis.viewName) {
      viewNameList = currentDashboard.analysis.viewName.split(".");
      fromDTO = {
        schema: viewNameList[0] + "." + viewNameList[1],
        tableName: viewNameList[2],
        alias: viewNameList[2]
      };
    }
    const {
      joinRelation,
      dimensions,
      measures,
      viewName,
      where,
      filter,
      sort,
      limit
    } = currentDashboard.analysis;

    const analysisDTO: AnalysisDTO = {
      dashboardId: currentDashboard.id,
      from: fromDTO,
      join: joinRelation,
      viewName,

      // 追加维度、度量数据
      fields: ObjectUtil.mergeArray([], true, dimensions, measures).map(
        item => {
          item.tableAlias = viewNameList[2] || "";
          return item;
        }
      ),

      // 追加过滤、排序、排名
      where: ObjectUtil.mergeArray([], true, where, filter.data).map(item => {
        item.tableAlias = viewNameList[2] || "";
        return item;
      }),
      order: ObjectUtil.copy(sort.data),
      limit: ""
    };
    if (limit.data[0]) {
      analysisDTO.limit = limit.data[0].limit;
      analysisDTO.order = ObjectUtil.copy(limit.data).map(item => {
        item.tableAlias = viewNameList[2] || "";
        return item;
      });
    }
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
   * 查询字段使用
   *
   * tableInfo 转 analysisDTO
   */
  public static getQueryValuesDTO(
    fromTable: TableVO,
    joinRelations: Array<JoinRelation>,
    tableInfo: TableInfoVO,
    currentDashboard: Dashboard
  ): AnalysisDTO {
    let viewNameList: string[] = [],
      fromDTO: TableRelation = {
        schema: "",
        tableName: "",
        alias: ""
      };
    if (currentDashboard.analysis.viewName) {
      viewNameList = currentDashboard.analysis.viewName.split(".");
      fromDTO = {
        schema: viewNameList[0] + "." + viewNameList[1],
        tableName: viewNameList[2],
        alias: viewNameList[2]
      };
    }
    let fieldDTO = FieldDTOBuilder.buildFieldDTO(tableInfo);

    // 字段追加去重
    fieldDTO.func = ["distinct"];
    fieldDTO.tableAlias = viewNameList[2];

    return {
      dashboardId: "",
      from: fromDTO,
      viewName: currentDashboard.analysis.viewName || "",
      join: joinRelations,
      fields: [fieldDTO],
      where: [],
      order: [],
      limit: ""
    };
  }
}
