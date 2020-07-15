import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { PieChartOption } from "glaway-bi-model/view/dashboard//chart/ChartOption";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";

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

    // 指示器这里 实际值 = 度量
    // 实际值必须唯一，
    const measures = this.fieldNames.measures[0];
    const actual = EChartDataUtil.getReduceSum(this.result, measures);
    // 对比值 = 维度 唯一
    const dimensions = this.fieldNames.dimensions[0];
    const comparison =
      EChartDataUtil.getReduceSum(this.result, dimensions) || actual || 100;
    const seriesData = {
      type: "gauge",
      detail: {
        formatter: (value: number) => {
          const result = value - comparison;
          return [
            `{measuresStyle|${value}(${((value / comparison) * 100).toFixed(
              2
            )}%)\n}`,
            `{percentageStyle|${result}(${((result / comparison) * 100).toFixed(
              2
            )}%)}`
          ].join("");
        },
        rich: {
          measuresStyle: {
            lineHeight: 25,
            fontSize: 20
          },
          percentageStyle: {
            fontSize: 16
          }
        }
      },
      // 坐标轴线
      axisLine: {
        // 属性lineStyle控制线条样式
        lineStyle: {
          width: this.sampleStyle.radiusConfig.axisLineWidth
        }
      },
      axisLabel: {
        show: this.sampleStyle.label.show,
        color: this.sampleStyle.label.color,
        fontFamily: this.sampleStyle.label.fontFamily,
        fontSize: this.sampleStyle.label.fontSize,
        formatter: (value: number) => {
          if (!this.sampleStyle.label.isShowNumer) {
            return ((value / comparison) * 100).toFixed(2) + "%";
          } else {
            return value;
          }
        }
      },
      radius: this.sampleStyle.radiusConfig.outside,
      center: Object.values(this.sampleStyle.centerConfig),
      max: comparison || 100,
      data: [
        {
          name: measures,
          originalValue: actual,
          value: actual
        }
      ]
    } as any;
    series.push(seriesData);

    return series;
  }

  // 提示信息
  getTooltips() {
    return {
      formatter: "{b} : {c}"
    };
  }
}
