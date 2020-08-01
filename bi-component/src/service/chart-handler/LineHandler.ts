import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { LineChartOption } from "glaway-bi-model/view/dashboard//chart/ChartOption";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import warnConfigure from "./configure/WarnConfigure";
import { WARN_DEFAULT_VALUE } from "glaway-bi-model/view/Warn";

/**
 * 折线图处理
 */
export default class LineHandler implements ChartHandler {
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
    public sampleStyle: LineChartOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  /**
   * 获取图表的处理结果
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
    style.legend = this.getLegend();

    /**
     * 预警处理
     */
    if (this.dashboard.analysis.warn.id !== WARN_DEFAULT_VALUE) {
      warnConfigure(this.dashboard, style);
    }

    return style;
  }

  /**
   * 获取X轴数据
   */
  public getXAxis(): Array<echarts.EChartOption.XAxis> {
    let xAxis: Array<echarts.EChartOption.XAxis> = [];
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
      xAxis.push(axisXData);
    }
    // 遍历生成X轴
    dimensions.forEach(dimensionName => {
      const axisXData = {
        name: dimensionName,
        type: "category",
        axisLabel: {
          interval: this.sampleStyle.axisLabel.interval || 0,
          rotate: this.sampleStyle.axisLabel.rotate || 0
        },
        data: EChartDataUtil.getDataByFieldName(
          dimensions,
          dimensionName,
          this.result
        )
      } as echarts.EChartOption.XAxis;
      xAxis.push(axisXData);
    });

    return xAxis;
  }

  /**
   * 获取Y轴数据
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
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    const { dimensions, measures } = this.fieldNames;
    const connectNulls = this.sampleStyle.connectNulls;
    const seriesData = {
      type: "line",
      label: {
        show: this.sampleStyle.label.show,
        position: this.sampleStyle.label.position,
        color: this.sampleStyle.label.color,
        fontSize: this.sampleStyle.label.fontSize,
        fontFamily: this.sampleStyle.label.fontFamily
      },
      symbol: this.sampleStyle.symbol,
      symbolSize: this.sampleStyle.symbolSize,
      symbolRotate: this.sampleStyle.symbolRotate,
      smooth: this.sampleStyle.smooth,
      connectNulls
    };

    if (dimensions.length) {
      const serieData = this.getSeriesDimensions(
        seriesData,
        measures[0],
        connectNulls
      );
      series.push(serieData);
    } else {
      // 不存在维度字段
      // 度量字段名字作为维度字段
      const serieData = this.getSeriesUndimesion(seriesData, connectNulls);
      series.push(serieData);
    }

    return series;
  }

  /**
   * 将会把结果数据以及度量设置为二维数组，返回对应一行数据
   * @name 不存维度时的series处理函数
   * @param seriesData 系列数据
   * @param measureName 度量名
   * @param index 下标
   */
  private getSeriesUndimesion(
    seriesData: echarts.EChartOption.Series,
    connectNulls: boolean
  ): echarts.EChartOption.Series {
    const andSeriesData = {
      name: "Undimesion",
      data: EChartDataUtil.getLineByNoDimensionsArray(
        this.fieldNames.measures,
        this.result,
        this.sampleStyle.decimals,
        connectNulls
      )
    };
    return Object.assign(andSeriesData, seriesData);
  }

  /**
   * @name 存在维度的series处理函数
   * @param seriesData 系列数据
   * @param measureName 度量名
   */
  private getSeriesDimensions(
    seriesData: echarts.EChartOption.Series,
    measureName: string,
    connectNulls: boolean
  ): echarts.EChartOption.Series {
    const dimensions = this.fieldNames.dimensions;
    const andSeriesData = {
      name: measureName,
      data: EChartDataUtil.getLineByDimensionsArray(
        dimensions,
        measureName,
        this.result,
        this.sampleStyle.decimals,
        connectNulls
      )
    };
    return Object.assign(andSeriesData, seriesData);
  }

  /**
   * 获取图例
   */
  public getLegend(): echarts.EChartOption.Legend {
    const legend = {
      data: this.fieldNames.measures
    };
    return legend;
  }
}
