import { DatasetType } from '../enums/DatasetType'

/**
 * 数据集分组
 */
export default interface DatasetGroupVO {
  /**
   * ID
   */
  id: string;

  /**
   * 数据集名称
   */
  name: string;

  /**
   * 父节点ID
   */
  parentId: string;

  /**
   * 层级
   */
  lvl: number;

  /**
   * 是否是叶子节点 (0: TRUE/1: FALSE)
   */
  isLeaf: 0 | 1;

  /**
   * 类型 (0: 分组 / 1: 数据）
   */
  type: DatasetType;

  /**
   * 子节点
   */
  children?: Array<DatasetGroupVO>;
}