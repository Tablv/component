export default interface TableInfoVO {
  /**
   * - ID
   */
  id: string;

  /**
   * - TABLE
   */
  tableId: string;

  /**
   * - 列名
   */
  columnName: string;

  /**
   * - 列别名
   */
  alias: string;

  /**
   * - 数据类型
   */
  dataType: string | null;

  /**
   * - 数据集ID
   */
  datasetId: string;

  /**
   * - 表名
   */
  tableName: string;

  /**
   * - 表Schema
   */
  tableSchema: string;

  /**
   * - 表别名
   */
  tableAlias: string;
}
