/**
 * 数据集
 */
export default interface DatasetVO {
	/**
   * - 数据集名称
   */
	name: string;

  /**
   * - 关联storage中的schema，如果有多个用逗号拼接
   */
  schemas: string;

  /**
   * - schema类型(R/F)
   */
  schemasType: string;

  /**
   * - 配置信息(关联)
   */
  settings: string;

  /**
   * - 分组ID(在分组中的ID)
   */
  groupId: string;

  /**
   * - 属于哪个分组文件夹
   */
  folderId: string;

  /**
   * - 主表
   */
  pkTable: string;
}