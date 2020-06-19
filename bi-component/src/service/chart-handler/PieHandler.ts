import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "glaway-bi-component/src/interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { PieChartOption } from "glaway-bi-model/view/dashboard//chart/ChartOption";

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
    let legend: echarts.EChartOption.Legend = {},
      legendData: Array<string> = [];

    this.fieldNames.dimensions.forEach(dimensionName => {
      this.result.forEach((data: any) => {
        const dimension = data[dimensionName] as string;
        legendData.push(dimension);
      });
    });

    legend.data = legendData;

    return legend;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    this.fieldNames.dimensions.forEach(dimensionName => {
      this.fieldNames.measures.forEach(measureName => {
        const seriesData = {
          type: "pie",
          radius: Object.values(this.sampleStyle.radiusConfig).map(
            item => item + "%"
          ),
          itemStyle: {},
          center: Object.values(this.sampleStyle.centerConfig),
          label: EChartDataUtil.getPieSeriesLabel(this.sampleStyle),
          data: EChartDataUtil.getDataByAxisName(
            dimensionName,
            measureName,
            this.result
          )
        } as echarts.EChartOption.Series;
        series.push(seriesData);
      });
    });

    return series;
  }
}
