import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";

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
   * 配置相关参数
   *
   */
  style.color = dashboard.echarts.sampleStyle.global.color;

  style.grid = gridGenerator(dashboard);

  return style;
}

function gridGenerator(dashboard: Dashboard): echarts.EChartOption.Grid {
  const gridTop = dashboard.echarts.sampleStyle.global.grid.top,
    gridBottom = dashboard.echarts.sampleStyle.global.grid.bottom,
    gridLeft = dashboard.echarts.sampleStyle.global.grid.left,
    gridRight = dashboard.echarts.sampleStyle.global.grid.right;

  return {
    top: gridTop.value + gridTop.unit,
    bottom: gridBottom.value + gridBottom.unit,
    left: gridLeft.value + gridLeft.unit,
    right: gridRight.value + gridRight.unit
  };
}
