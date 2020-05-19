import ObjectUtil from "glaway-bi-util/ObjectUtil";
import HBarStackHandler from "./HBarStackHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";

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
    this.fieldNames.measures.forEach(measureName => {
      const seriesData = {
        name: measureName,
        type: "bar",
        stack: "hbarPercentage",
        data: EChartDataUtil.getPercentageArray(
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
