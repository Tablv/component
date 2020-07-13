import PieHandler from "./PieHandler";

/**
 * 玫瑰图处理
 */
export default class RosePieHandler extends PieHandler {
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = super.getStyle() as echarts.EChartOption;

    style.series = this.getSeries();

    return style;
  }
  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    series = (super.getSeries() as Array<echarts.EChartOption.SeriesPie>).map(
      seriesData => {
        seriesData.roseType = "radius";
        return seriesData;
      }
    );
    return series;
  }
}
