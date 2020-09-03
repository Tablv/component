/**
 * 配置相关参数
 */

import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import GEOHandler from "glaway-bi-component/src/service/option-handler/GEOHandler";
import VisualMapHandler from "glaway-bi-component/src/service/option-handler/VisualMapHandler";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import TooltipHandler from "glaway-bi-component/src/service/option-handler/TooltipHandler";

/**
 * 全局处理方法
 *
 * @param result 分析结果
 * @param dashboard 仪表盘对象
 */
export default function(result: AnalysisResults, dashboard: Dashboard) {
  const chartType: ChartType = dashboard.visualData.type;
  /**
   * 返回的 Echarts 样式对象
   */
  let style: echarts.EChartOption = {};

  /**
   * 标题
   */
  style.title = dashboard.echarts.title as echarts.EChartTitleOption;

  /**
   * 配色
   */
  style.color = dashboard.echarts.color;

  /**
   * 图例组件
   */
  style.legend = dashboard.echarts.legend as echarts.EChartOption.Legend;

  /**
   * 提示标签
   */
  if (dashboard.echarts.tooltip) {
    style.tooltip = TooltipHandler.getToolTip(dashboard.echarts);
  }

  /**
   * 直角坐标系
   */
  if (dashboard.echarts.grid) {
    style.grid = dashboard.echarts.grid as echarts.EChartOption.Grid;
  }

  /**
   * 地图坐标系
   */
  if (dashboard.echarts.geo) {
    style.geo = GEOHandler.getGEO(dashboard.echarts);
  }
  /**
   * 视觉映射组件
   */
  if (dashboard.echarts.visualMap) {
    style.visualMap = VisualMapHandler.getVisualMap(dashboard.echarts);
  }

  return style;
}
