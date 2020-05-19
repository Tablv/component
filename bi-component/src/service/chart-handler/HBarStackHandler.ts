import HBarHandler from "./HBarHandler";

/**
 * 堆积条图处理
 */
export default class HBarStackHandler extends HBarHandler {
  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<
      echarts.EChartOption.Series | { data: Array<any> }
    > = super.getSeries();
    series.forEach(item => {
      (item as any).stack = "hstack";
    });
    return series;
  }
}
