import EventsConfig from "glaway-bi-model/view/dashboard/EventsConfig";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
/**
 * 图表通用 UI 方法 接口
 */
export default interface ChartUIService {
  /**
   * 初始化图表
   */
  initChart(): void;

  /**
   * 清空图表
   */
  clearChart(): void;

  /**
   * 销毁图表
   */
  destoryChart(): void;

  /**
   * 调整图表尺寸
   */
  resizeChart(): void;

  /**
   * 绑定图表事件
   *
   * @param clearEvent 是否清空此前事件
   * @param thisEvents 当前事件配置
   */
  bindChartEvents(clearEvent: boolean, thisEvents: EventsConfig): void;

  /**
   * 渲染图表
   */
  renderChart(result?: AnalysisResults): void;

  getDashBoard(): void;
}
