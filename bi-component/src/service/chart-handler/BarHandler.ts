import { SplitedFieldNames } from "../EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import warnConfigure from "./configure/WarnConfigure";
import { WARN_DEFAULT_VALUE } from "glaway-bi-model/view/Warn";
import { ChartHandler } from "../../interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { BarSeriesOption } from "glaway-bi-model/view/dashboard/chart/BarSeriesOption";
import echarts from "echarts";
import LabelHandler from "../option-handler/LabelHandler";

/**
 * 柱图处理
 */
export default class BarHandler implements ChartHandler {
  /**
   * @name 分析字段
   */
  public fieldNames: SplitedFieldNames;
  /**
   * @function 构造函数
   * 后面有其他的设置也加入到这里
   * @param result 分析结果
   * @param dashboard 仪表盘数据
   * @param sampleStyle 样例样式
   */
  constructor(
    public result: AnalysisResults,
    public dashboard: Dashboard,
    public sampleStyle: BarSeriesOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  /**
   * @function 获取图表的处理结果
   */
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.xAxis = [];
      style.yAxis = [];
      style.series = [];
      return {};
    }

    style.xAxis = this.getXAxis();
    style.yAxis = this.getYAxis();
    style.series = this.getSeries();

    /**
     * 预警处理
     */
    if (this.dashboard.analysis.warn.id !== WARN_DEFAULT_VALUE) {
      warnConfigure(this.dashboard, style);
    }

    return style;
  }

  /**
   * @function 获取X轴数据
   */
  public getXAxis(): Array<echarts.EChartOption.XAxis> {
    let xAxis: Array<echarts.EChartOption.XAxis> = [];
    // 维度是0
    const { dimensions, measures } = this.fieldNames;

    if (!dimensions.length) {
      const axisXData: echarts.EChartOption.XAxis = {
        name: "",
        type: "category",
        axisLabel: {
          interval: this.sampleStyle.axisLabel.interval || 0,
          rotate: this.sampleStyle.axisLabel.rotate || 0
        },
        data: measures.map(measure => ({ value: measure })) as any
      };
      //  维度不存在 x轴拿度量
      xAxis.unshift(axisXData);
    }
    // 遍历生成X轴
    dimensions.forEach(dimensionName => {
      const axisXData: echarts.EChartOption.XAxis = {
        name: "",
        type: "category",
        axisLabel: {
          interval: this.sampleStyle.axisLabel.interval || 0,
          rotate: this.sampleStyle.axisLabel.rotate || 0
        },
        data: EChartDataUtil.getDataByFieldName(
          dimensions,
          dimensionName,
          this.result
        ) as any
      };
      xAxis.unshift(axisXData);
    });

    return xAxis;
  }

  /**
   * @function 获取Y轴数据
   */
  public getYAxis(): Array<echarts.EChartOption.YAxis> {
    return [
      {
        type: "value",
        name: this.sampleStyle.decimals.unit
      }
    ] as Array<echarts.EChartOption.YAxis>;
  }

  /**
   * 将会把结果数据以及度量设置为二维数组，返回对应一行数据
   * @function 不存维度时的series处理函数
   * @param seriesData 系列数据
   * @param measureName 度量名
   * @param index 下标
   */
  private getSeriesUndimesion(
    seriesData: echarts.EChartOption.Series,
    measureName: string,
    index: number
  ): echarts.EChartOption.Series {
    seriesData = ObjectUtil.copy(seriesData);
    const andSeriesData = {
      name: measureName,
      type: "bar",
      stack: "one",
      data: EChartDataUtil.getTestByFieldName(index, measureName, this.result)
    };
    return Object.assign(andSeriesData, seriesData);
  }

  /**
   * @function 存在维度的series处理函数
   * @param seriesData 系列数据
   * @param measureName 度量名
   */
  private getSeriesDimensions(
    seriesData: echarts.EChartOption.Series,
    measureName: string
  ): echarts.EChartOption.Series {
    const dimensions = this.fieldNames.dimensions;
    const andSeriesData = {
      name: measureName,
      type: "bar",
      data: EChartDataUtil.getDataByFieldName(
        dimensions,
        measureName,
        this.result,
        this.sampleStyle.decimals
      )
    };
    return Object.assign(andSeriesData, seriesData);
  }

  /**
   * @function 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];

    const { dimensions, measures } = this.fieldNames;

    const seriesData = {
      type: "bar",
      itemStyle: {
        barBorderRadius: this.sampleStyle.radius
      },
      barWidth: this.getBarWidth(this.sampleStyle),
      label: LabelHandler.getBarLabel(this.sampleStyle.label)
    };

    measures.forEach((measureName, index) => {
      const serieData = dimensions.length
        ? this.getSeriesDimensions(seriesData, measureName)
        : this.getSeriesUndimesion(seriesData, measureName, index);
      series.push(serieData);
    });

    return series;
  }

  /**
   * 获取柱宽
   *
   * @param sampleStyle 样例样式
   */
  public getBarWidth(sampleStyle: BarSeriesOption): string | undefined {
    return sampleStyle
      ? sampleStyle.width.value + sampleStyle.width.unit
      : undefined;
  }
}
