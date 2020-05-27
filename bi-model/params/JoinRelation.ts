/**
 * Join 关系
 */
export default interface JoinRelation {
  /**
   * 左表
   */
  lt: TableRelation;

  /**
   * 右表
   */
  rt: TableRelation;

  /**
   * 左字段
   */
  lc: string;

  /**
   * 右字段
   */
  rc: string;

  type: "left" | "right" | "inner" | "outer";
}

/**
 * 表关系
 */
export interface TableRelation {
  /**
   * 表Schema
   */
  schema: string;

  /**
   * 表名
   */
  tableName: string;

  /**
   * 表别名
   */
  alias: string;
}
