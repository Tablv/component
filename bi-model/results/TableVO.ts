import TableInfoVO from "./TableInfoVO";

export default interface TableVO {
  /**
   * - ID
   */
  id: string;

  /**
   * - SCHEMA
   */
  schema: string;

  /**
   * - 表名
   */
  name: string;

  /**
   * - 别名
   */
  alias: string;

  /**
   * - 数据集ID
   */
  datasetId: string;

  /**
   * - 表字段集合
   */
  children: Array<TableInfoVO>;
}
