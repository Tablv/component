import { SplitedFieldNames } from "../service/EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import {
  BarSeriesOption,
  BarStackSeriesOption,
  BarPercentageSeriesOption,
  HBarSeriesOption,
  HBarStackSeriesOption,
  HBarPercentageSeriesOption,
  BiaxialSeriesOption
} from "glaway-bi-model/view/dashboard/chart/SeriesOption";
import { GaugeSeriesOption } from "glaway-bi-model/view/dashboard/chart/GaugeSeriesOption";
import { PieSeriesOption } from "glaway-bi-model/view/dashboard/chart/PieSeriesOption";
import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
import { LineSeriesOption } from "glaway-bi-model/view/dashboard/chart/LineSeriesOption";
import { FunnelSeriesOption } from "glaway-bi-model/view/dashboard/chart/FunnelSeriesOption";

export interface RegistryConstructor {
  bar: CharthandlerConstructor<BarSeriesOption>;

  barStack: CharthandlerConstructor<BarStackSeriesOption>;

  barPercentage: CharthandlerConstructor<BarPercentageSeriesOption>;

  hbar: CharthandlerConstructor<HBarSeriesOption>;
  hbarStack: CharthandlerConstructor<HBarStackSeriesOption>;
  hbarPercentage: CharthandlerConstructor<HBarPercentageSeriesOption>;

  /**
   * 饼图
   */
  pie: CharthandlerConstructor<PieSeriesOption>;
  rpie: CharthandlerConstructor<PieSeriesOption>;
  rosepie: CharthandlerConstructor<PieSeriesOption>;
  sunpie: CharthandlerConstructor<PieSeriesOption>;
  // targetpie: CharthandlerConstructor<PieSeriesOption>;
  targetpie: CharthandlerConstructor<GaugeSeriesOption>;

  /**
   * 雷达图
   */
  radar: CharthandlerConstructor<PieSeriesOption>;

  /**
   * 折线图
   */
  line: CharthandlerConstructor<LineSeriesOption>;

  /**
   * 仪表盘图
   */
  gauge: CharthandlerConstructor<GaugeSeriesOption>;

  /**
   * 漏斗图
   */
  funnel: CharthandlerConstructor<FunnelSeriesOption>;

  map: CharthandlerConstructor<MapSeriesOption>;

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
