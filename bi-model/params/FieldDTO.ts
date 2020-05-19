import TableInfoVO from "glaway-bi-model/results/TableInfoVO";
import { FieldType } from "glaway-bi-model/enums/FieldType";

/**
 * 字段 参数
 */
export default interface FieldDTO {
  id: string;

  /**
   * 字段类型
   */
  type: FieldType;

  /**
   * 数据库 Schema
   */
  schema: string;

  /**
   * 数据库表名
   */
  tableName: string;

  /**
   * - 表别名
   */
  tableAlias: string;

  /**
   * 字段列名
   */
  columnName: string;

  /**
   * 字段别名
   */
  alias: string;

  /**
   * 方法
   */
  func: Array<string>;

  /**
   * Group by 顺序
   */
  group: number;
}

/**
 * 构建类
 */
export class FieldDTOBuilder {
  /**
   * 构建 FieldDTO
   *
   * @param tableInfo 表字段VO
   * @param fieldType 字段类型（默认为Y度量）
   */
  public static buildFieldDTO(
    tableInfo: TableInfoVO,
    fieldType?: FieldType
  ): FieldDTO {
    return {
      id: tableInfo.id,
      type: fieldType ? fieldType : FieldType.measureY,
      schema: tableInfo.tableSchema,
      tableName: tableInfo.tableName,
      columnName: tableInfo.columnName,
      alias: tableInfo.alias,
      tableAlias: tableInfo.tableAlias,
      func: [],
      group: 0
    };
  }
}
