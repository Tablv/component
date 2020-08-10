import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { GaugeChartOption } from "glaway-bi-model/view/dashboard/chart/GaugeChartOption";

/**
 * 仪表盘处理
 */
export default class GaugeHandler implements ChartHandler {
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
    public sampleStyle: GaugeChartOption
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

    if (this.sampleStyle.pointer) {
      this.sampleStyle.pointer.length = (this.sampleStyle.pointer.length +
        "%") as any;
    }

    if (this.sampleStyle.label.offset) {
      this.sampleStyle.label.offset.forEach((item: string | number) => {
        item = item + "%";
      });
    }

    if (this.sampleStyle.title?.offsetCenter) {
      this.sampleStyle.title.offsetCenter.forEach((item: string | number) => {
        item = item + "%";
      });
    }

    let colorGroup = this.dashboard.echarts.sampleStyle.global.color.map(
      (item, index) => {
        return [(index + 3) / 10, item];
      }
    );

    if (this.sampleStyle.axisLine?.lineStyle.color) {
      colorGroup = this.sampleStyle.axisLine?.lineStyle.color;
    }

    const seriesData = {
      type: "gauge",
      detail: {
        show: this.sampleStyle.label.show,
        color: this.sampleStyle.label.color,
        // backgroundColor: this.sampleStyle.label.color,
        fontFamily: this.sampleStyle.label.fontFamily,
        fontSize: this.sampleStyle.label.fontSize,
        offsetCenter: this.sampleStyle.label.offset,
        formatter: (value: number) => {
          let result = `${((value / comparison) * 100).toFixed(2)}%`;
          if (this.sampleStyle.label.isShowNumber) {
            result = `${value}` + `(${result})`;
          }
          const number = [result, `\n${comparison}`].join("");
          return number;
        }
      },
      // 坐标轴线
      axisLine: {
        // 属性lineStyle控制线条样式
        lineStyle: {
          width: this.sampleStyle.axisLine?.lineStyle.width,
          color: colorGroup
        }
      },
      splitNumber: this.sampleStyle.splitNumber,
      pointer: this.sampleStyle.pointer,
      itemStyle: this.sampleStyle.itemStyle,
      splitLine: this.sampleStyle.splitLine,
      axisTick: this.sampleStyle.axisTick,
      endAngle: this.sampleStyle.endAngle,
      startAngle: this.sampleStyle.startAngle,
      axisLabel: {
        show: this.sampleStyle.axisLabel?.show,
        color: this.sampleStyle.axisLabel?.color,
        fontFamily: this.sampleStyle.axisLabel?.fontFamily,
        fontSize: this.sampleStyle.axisLabel?.fontSize,
        formatter: (value: number) => {
          if (!this.sampleStyle.label.isShowNumber) {
            return (
              ((value / comparison) * 100).toFixed(
                this.sampleStyle.decimals.value
              ) + "%"
            );
          } else {
            return value.toFixed(this.sampleStyle.decimals.value);
          }
        }
      },
      title: this.sampleStyle.title,
      radius: this.sampleStyle.radius + "%",
      center: this.sampleStyle.center,
      max: comparison || 100,
      data: [
        {
          measure: {
            name: measures,
            value: actual
          },
          dimensions: [
            {
              name: measures,
              value: actual
            }
          ],
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
