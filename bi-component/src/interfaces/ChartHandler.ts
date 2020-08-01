import { SplitedFieldNames } from "../service/EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import {
  BarChartOption,
  BarStackChartOption,
  BarPercentageChartOption,
  HBarChartOption,
  HBarStackChartOption,
  HBarPercentageChartOption,
  LineChartOption,
  PieChartOption,
  RadarChartOption,
  RosePieChartOption,
  RPieChartOption,
  SunPieChartOption,
  TargetPieChartOption,
  GaugeChartOption,
  FunnelChartOption,
  BiaxialChartOption
} from "glaway-bi-model/view/dashboard/chart/ChartOption";

export interface RegistryConstructor {
  bar: CharthandlerConstructor<BarChartOption>;

  barStack: CharthandlerConstructor<BarStackChartOption>;

  barPercentage: CharthandlerConstructor<BarPercentageChartOption>;

  hbar: CharthandlerConstructor<HBarChartOption>;
  hbarStack: CharthandlerConstructor<HBarStackChartOption>;
  hbarPercentage: CharthandlerConstructor<HBarPercentageChartOption>;

  /**
   * 饼图
   */
  pie: CharthandlerConstructor<PieChartOption>;
  rpie: CharthandlerConstructor<RPieChartOption>;
  rosepie: CharthandlerConstructor<RosePieChartOption>;
  sunpie: CharthandlerConstructor<SunPieChartOption>;
  targetpie: CharthandlerConstructor<TargetPieChartOption>;

  /**
   * 雷达图
   */
  radar: CharthandlerConstructor<RadarChartOption>;

  /**
   * 折线图
   */
  line: CharthandlerConstructor<LineChartOption>;

  /**
   * 仪表盘图
   */
  guage: CharthandlerConstructor<GaugeChartOption>;

  /**
   * 漏斗图
   */
  funnel: CharthandlerConstructor<FunnelChartOption>;

  biaxial: any;
}

/**
 * 图表通用处理 接口
 */
interface CharthandlerConstructor<T> {
  new (
    result: AnalysisResults,
    dashboard: Dashboard,
    sampleStyle: T
  ): ChartHandler;
}

/**
 * 图表数据处理接口
 */
export interface ChartHandler {
  /**
   * @name 分析结果
   */
  result: AnalysisResults;

  /**
   * @name 仪表盘数据
   */
  dashboard: Dashboard;

  /**
   * @name 样例样式
   */
  sampleStyle: any;

  /**
   * @name 分析字段
   */
  fieldNames: SplitedFieldNames;

  /**
   * @function 获取计算后的结果样式
   */
  getStyle(): echarts.EChartOption;
  /**
   * @function 获取X轴数据
   */
  getXAxis?(): Array<echarts.EChartOption.XAxis>;

  /**
   * @function 获取Y轴数据
   */
  getYAxis?(): Array<echarts.EChartOption.YAxis>;

  /**
   * @function 获取Series数据
   */
  getSeries(): Array<echarts.EChartOption.Series>;

  /**
   * @function 获取图例
   */
  getLegend?(): echarts.EChartOption.Legend;
}
