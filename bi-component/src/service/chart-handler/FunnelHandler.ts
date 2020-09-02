import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { FunnelSeriesOption } from "glaway-bi-model/view/dashboard/chart/FunnelSeriesOption";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";

/**
 * 漏斗图处理
 */
export default class FunnelHandler implements ChartHandler {
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
    public sampleStyle: FunnelSeriesOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  /**
   * @function 获取计算后的样式
   */
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.series = [];
      return {};
    }

    style.series = this.getSeries();
    style.tooltip = this.getTooltips();

    style.legend = this.getLegend();

    return style;
  }

  /**
   * @function 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    const { dimensions, measures } = this.fieldNames;

    // 实际值必须唯一，
    const decimals = this.sampleStyle.decimals.value;
    const seriesData = {
      type: "funnel",
      label: {
        show: this.sampleStyle.label.show,
        color: this.sampleStyle.label.color,
        fontFamily: this.sampleStyle.label.fontFamily,
        fontSize: this.sampleStyle.label.fontSize,
        position: this.sampleStyle.label.position,
        formatter: (params: { value: number; percent: number }) => {
          const value = Number((params.value * 1).toFixed(decimals));
          const percent = Number((params.percent * 1).toFixed(decimals));
          let result = `${percent.toFixed(decimals)}%`;
          if (this.sampleStyle.label.isShowNumber) {
            result = `${value}` + `(${result})`;
          }
          return result;
        }
      },
      labelLine: this.sampleStyle.labelLine,
      itemStyle: this.sampleStyle.itemStyle,
      sort: this.sampleStyle.sort,
      funnelAlign: this.sampleStyle.funnelAlign,
      gap: this.sampleStyle.gap,
      min: this.sampleStyle.min,
      // max: this.sampleStyle.max,
      minSize: this.sampleStyle.minSize + "%",
      maxSize: this.sampleStyle.maxSize + "%",
      width: this.sampleStyle.width + "%",
      height: this.sampleStyle.height + "%",
      top: this.sampleStyle.center ? this.sampleStyle.center[1] : 0,
      // 横坐标
      left: this.sampleStyle.center ? this.sampleStyle.center[0] : 0
    } as any;

    if (dimensions.length) {
      const serieData = this.getSeriesDimensions(seriesData, measures[0]);
      series.push(serieData);
    } else {
      // 不存在维度字段
      // 度量字段名字作为维度字段
      const serieData = this.getSeriesUndimesion(seriesData);
      series.push(serieData);
    }
    return series;
  }

  /**
   * 将会把结果数据以及度量设置为二维数组，返回对应一行数据
   * @function 不存维度时的series处理函数
   * @param seriesData 系列数据
   * @param measureName 度量名
   * @param index 下标
   */
  private getSeriesUndimesion(
    seriesData: echarts.EChartOption.Series
  ): echarts.EChartOption.Series {
    const andSeriesData = {
      name: "Undimesion",
      data: EChartDataUtil.getFunnelByNoDimensionsArray(
        this.fieldNames.measures,
        this.result,
        this.sampleStyle.decimals
      )
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
      data: EChartDataUtil.getFunnelByDimensionsArray(
        dimensions,
        measureName,
        this.result,
        this.sampleStyle.decimals
      )
    };
    return Object.assign(andSeriesData, seriesData);
  }

  /**
   * @function 提示信息
   */
  getTooltips() {
    return {
      formatter: "{b} : {c}"
    };
  }

  /**
   * @function 图例信息
   */
  getLegend() {
    const { dimensions, measures } = this.fieldNames;
    if (dimensions.length) {
      return {
        data: this.result.map(item => item[dimensions[0]].toString())
      };
    } else {
      return {
        data: measures
      };
    }
  }
}
