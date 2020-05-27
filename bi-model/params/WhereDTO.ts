import { WhereType } from "glaway-bi-model/enums/WhereType";

/**
 * 条件 参数
 */
export default interface WhereDTO {
  id: string;

  tableAlias: string;

  columnName: string;

  columnAlias?: string;

  w: Array<WhereColumnDTO>;
}

/**
 * 条件字段 参数
 */
export interface WhereColumnDTO {
  type: WhereType;
  value: string;
}
