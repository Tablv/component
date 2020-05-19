import { SplitedFieldNames } from "../service/EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import { ChartOption } from "glaway-bi-model/view/dashboard/ChartOption";

/**
 * 图表通用处理 接口
 */
export interface CharthandlerConstructor {
  new (
    result: AnalysisResults,
    dashboard: Dashboard,
    sampleStyle: ChartOption
  ): ChartHandler;
}

/**
 * 图表数据处理接口
 */
export interface ChartHandler {
  /**
   * 分析结果
   */
  result: AnalysisResults;

  /**
   * 仪表盘数据
   */
  dashboard: Dashboard;

  /**
   * 样例样式
   */
  sampleStyle: any;

  /**
   * 分析字段
   */
  fieldNames: SplitedFieldNames;

  /**
   * 获取计算后的结果样式
   */
  getStyle(): echarts.EChartOption;
  /**
   * 获取 X轴 数据
   */
  getXAxis?(): Array<echarts.EChartOption.XAxis>;

  /**
   * 获取 Y轴 数据
   */
  getYAxis?(): Array<echarts.EChartOption.YAxis>;

  /**
   * 获取 Series 数据
   */
  getSeries(): Array<echarts.EChartOption.Series>;

  /**
   * 获取图例
   */
  getLegend?(): echarts.EChartOption.Legend;
}
