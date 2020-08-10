import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "glaway-bi-component/src/interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { PieChartOption } from "glaway-bi-model/view/dashboard/chart/PieOption";

/**
 * 饼图处理
 */
export default class PieHandler implements ChartHandler {
  /**
   * 分析字段
   */
  public fieldNames: SplitedFieldNames;

  /**
   * 数据设置
   * 后面有其他的设置也加入到这里
   * @param result 分析结果
   * @param dashboard 仪表盘数据
   * @param sampleStyle 样例样式
   */
  constructor(
    public result: AnalysisResults,
    public dashboard: Dashboard,
    public sampleStyle: PieChartOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.series = [];
      return {};
    }

    style.legend = this.getLegend();
    style.series = this.getSeries();

    return style;
  }

  /**
   * 获取图例
   *
   * @param fieldNames 分析结果划分数据
   */
  public getLegend(): echarts.EChartOption.Legend {
    let legend: echarts.EChartOption.Legend = {};

    // dimension 存在元素 走 一维度一度量
    const dimensionName = this.fieldNames.dimensions[0];

    legend.data = dimensionName
      ? this.result.map((data: any) => data[dimensionName] as string)
      : this.fieldNames.measures;

    return legend;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    // dimension 存在元素 走 一维度一度量
    const dimensionName = this.fieldNames.dimensions[0];
    const measuresList = this.fieldNames.measures;
    // series
    const seriesData = {
      type: "pie",
      radius:
        typeof this.sampleStyle.radius === "object"
          ? this.sampleStyle.radius.map(item => item + "%")
          : this.sampleStyle.radius,
      itemStyle: {},
      center: this.sampleStyle.center,
      label: EChartDataUtil.getPieSeriesLabel(this.sampleStyle),
      data: [] as echarts.EChartOption.SeriesBar["data"]
    };

    // 度量必须唯一，不然要提示前端禁用失败
    seriesData.data = dimensionName
      ? EChartDataUtil.getDataByAxisName(
          dimensionName,
          measuresList[0],
          this.result,
          this.sampleStyle.decimals
        )
      : EChartDataUtil.getNameByMeasure(
          measuresList,
          this.result,
          this.sampleStyle.decimals
        );

    series.push(seriesData);

    return series;
  }
}
