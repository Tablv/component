import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import BarHandler from "./BarHandler";
import ObjectUtil from "glaway-bi-util/ObjectUtil";

/**
 * 百分比堆积柱图处理
 */
export default class BarPercentageHandler extends BarHandler {
  /**
   * 获取Y轴数据
   */
  public getYAxis(): Array<echarts.EChartOption.YAxis> {
    return super.getYAxis().map((yAxis: echarts.EChartOption.YAxis) => {
      return ObjectUtil.merge(yAxis, {
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
  public getXAxis(): Array<echarts.EChartOption.XAxis> {
    let xAxis: Array<echarts.EChartOption.XAxis> = [];
    // 维度是0
    const { dimensions } = this.fieldNames;
    if (!dimensions.length) {
      xAxis.unshift({
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
        stack: "barPercentage",
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
        label: EChartDataUtil.getBarSeriesLabel(this.sampleStyle)
      };
      series.push(seriesData);
    });
    return series;
  }
}
