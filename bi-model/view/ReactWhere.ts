import WhereDTO from "glaway-bi-model/params/WhereDTO";
import TaskConfig from "glaway-bi-model/view/dashboard/TaskConfig";

/**
 * 联动查询
 */
export default interface ReactWhere {
  /**
   * 当前仪表盘ID
   */
  dashboardId: string | null;

  /**
   * 数据集ID
   */
  datasetId: string | null;

  /**
   * 条件过滤
   */
  where: Array<WhereDTO | null>;

  /**
   * 选中的条件数据下标
   */
  selectedIndex: string | null;

  /**
   * 上次选中的联动主体id
   */
  oldDashboardId: string | null;

  /**
   * 开启的轮播任务
   */
  rotationTask: TaskConfig;
}
