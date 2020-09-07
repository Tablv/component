import ObjectUtil from "glaway-bi-util/ObjectUtil";
import HBarStackHandler from "./HBarStackHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import LabelHandler from "../option-handler/LabelHandler";

/**
 * 百分比堆积条图处理
 */
export default class HBarPercentageHandler extends HBarStackHandler {
  /**
   * 获取X轴数据
   */
  public getXAxis(): Array<echarts.EChartOption.XAxis> {
    let xAxis: Array<echarts.EChartOption.XAxis> = [];
    return super.getXAxis().map((xAxis: echarts.EChartOption.XAxis) => {
      return ObjectUtil.merge(xAxis, {
        min: 0,
        max: 100,
        axisLabel: {
          show: true,
          formatter: "{value} %"
        },
        show: true
      });
    });
  }

  /**
   * @name 获取Y轴数据
   */
  public getYAxis(): Array<echarts.EChartOption.YAxis> {
    let yAxis: Array<echarts.EChartOption.YAxis> = [];
    // 维度是0
    const { dimensions } = this.fieldNames;
    if (!dimensions.length) {
      yAxis.unshift({
        name: "",
        type: "category",
        axisLabel: {
          interval: this.sampleStyle.axisLabel.interval || 0,
          rotate: this.sampleStyle.axisLabel.rotate || 0
        },
        data: []
      });
    }
    // 遍历生成X轴
    dimensions.forEach(dimensionName => {
      const axisXData: echarts.EChartOption.YAxis = {
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
      yAxis.unshift(axisXData);
    });
    return yAxis;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    this.result.forEach(item => {
      item.sum = this.fieldNames.measures.reduce(
        (sum: number, name: any) => sum + Number(item[name]),
        0
      );
    });
    const dimensions = this.fieldNames.dimensions;
    this.fieldNames.measures.forEach(measureName => {
      const seriesData = {
        name: measureName,
        type: "bar",
        stack: "hbarPercentage",
        itemStyle: {
          barBorderRadius: this.sampleStyle.radius
        },
        data: EChartDataUtil.getPercentageArray(
          dimensions,
          measureName,
          this.result,
          this.sampleStyle.decimals
        ),
        barWidth: EChartDataUtil.getBarWidth(this.sampleStyle),
        label: LabelHandler.getBarLabel(this.sampleStyle.label)
      };
      series.push(seriesData);
    });
    return series;
  }
}
