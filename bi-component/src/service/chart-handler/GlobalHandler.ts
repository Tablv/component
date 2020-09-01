/**
 * 配置相关参数
 */

import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import GEOHandler from "../option-handler/GEOHandler";
import VisualMapHandler from "../option-handler/VisualMapHandler";

/**
 * 全局处理方法
 *
 * @param result 分析结果
 * @param dashboard 仪表盘对象
 */
export default function(result: AnalysisResults, dashboard: Dashboard) {
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
  style.legend = dashboard.echarts.legend;

  /**
   * 直角坐标系
   */
  if (dashboard.echarts.grid) {
    style.grid = gridGenerator(dashboard);
  }

  /**
   * 地图组件
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

function gridGenerator(dashboard: Dashboard): echarts.EChartOption.Grid {
  const gridTop = dashboard.echarts.grid?.top as Iunit,
    gridBottom = dashboard.echarts.grid?.bottom as Iunit,
    gridLeft = dashboard.echarts.grid?.left as Iunit,
    gridRight = dashboard.echarts.grid?.right as Iunit;

  return {
    top: gridTop.value + gridTop.unit,
    bottom: gridBottom.value + gridBottom.unit,
    left: gridLeft.value + gridLeft.unit,
    right: gridRight.value + gridRight.unit
  };
}

export interface Iunit {
  value: string;
  unit: string;
}
