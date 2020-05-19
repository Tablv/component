import BarHandler from "./BarHandler";

/**
 * 堆积柱图处理
 */
export default class BarStackHandler extends BarHandler {
  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<
      echarts.EChartOption.Series | { data: Array<any> }
    > = super.getSeries();
    series.forEach(item => {
      (item as any).stack = "stack";
    });

    return series;
  }
}
