import WhereDTO from "glaway-bi-model/params/WhereDTO";
import { FilterType } from "glaway-bi-model/enums/FilterType";
import { WhereType } from "glaway-bi-model/enums/WhereType";
import TableInfoVO from "glaway-bi-model/results/TableInfoVO";
import UUID from "glaway-bi-util/UUID";

export const FILTER_DEFAULT_VALUE = "DEFAULT";

/**
 * 过滤器数据包
 */
export interface FilterDatapack {
  /**
   * 过滤配置ID
   */
  id: string;

  /**
   * 过滤配置名称
   */
  name: string;

  /**
   * 所属仪表盘ID
   */
  dashboardId: string;

  /**
   * 过滤器配置
   */
  config: Array<FilterConfig>;
}

/**
 * 过滤器配置
 */
export interface FilterConfig {
  /**
   * 过滤配置ID
   */
  id: string;

  /**
   * 数据包ID
   */
  datapackId: string;

  /**
   * 字段ID
   */
  fieldId: string;

  /**
   * 字段数据
   */
  fieldData: TableInfoVO | null;

  /**
   * 过滤器类型
   */
  type: FilterType;

  /**
   * where 类型
   */
  whereType: WhereType;

  /**
   * 过滤值 (用逗号","隔开)
   */
  values: string;
}

/**
 * 构建类
 */
export class FilterBuilder {
  /**
   * 构建 FilterDatapack
   *
   * @param dashboardId 仪表盘ID
   * @param currentLength 当前长度
   */
  public static buildFilterPack(
    dashboardId: string,
    currentLength: number
  ): FilterDatapack {
    const serialNo = currentLength + 1,
      datapackId = UUID.generate();

    return {
      id: datapackId,
      name: "过滤器 " + serialNo,
      dashboardId,
      config: [this.buildFilterConfig(datapackId)]
    };
  }

  /**
   * 构建 FilterConfig
   *
   * @param datapackId 数据包ID
   */
  public static buildFilterConfig(datapackId: string): FilterConfig {
    const configId = UUID.generate();

    return {
      id: configId,
      datapackId,
      fieldId: "",
      fieldData: null,
      type: FilterType.standard,
      whereType: WhereType.EQ,
      values: ""
    };
  }

  /**
   * 构建 WhereDTO
   *
   * @param filterConfig 配置
   */
  public static buildWhere(filterConfig: FilterConfig): WhereDTO | null {
    if (!filterConfig.fieldData) return null;

    const tableInfo = filterConfig.fieldData,
      whereDTO: WhereDTO = {
        id: UUID.generate(),
        tableAlias: tableInfo.tableAlias,
        columnName: tableInfo.columnName,
        columnAlias: tableInfo.alias,
        w: [
          {
            type: filterConfig.whereType,
            value: filterConfig.values
          }
        ]
      };
    return whereDTO;
  }
}
