import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { PieChartOption } from "glaway-bi-model/view/dashboard//chart/ChartOption";

/**
 * 仪表盘处理
 */
export default class GuageHandler implements ChartHandler {
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

    style.series = this.getSeries();
    style.tooltip = this.getTooltips();

    return style;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    this.fieldNames.measures.forEach(measures => {
      const seriesData = {
        type: "gauge",
        detail: { formatter: "{value}" },
        // 坐标轴线
        axisLine: {
          // 属性lineStyle控制线条样式
          lineStyle: {
            width: this.sampleStyle.radiusConfig.axisLineWidth
          }
        },

        radius: this.sampleStyle.radiusConfig.outside,
        center: Object.values(this.sampleStyle.centerConfig),
        data: this.result.map((item: any) => ({
          name: measures,
          value: item[measures]
        }))
      } as echarts.EChartOption.Series;
      series.push(seriesData);
    });

    return series;
  }

  // 提示信息
  getTooltips() {
    return {
      formatter: "{b} : {c}"
    };
  }
}
