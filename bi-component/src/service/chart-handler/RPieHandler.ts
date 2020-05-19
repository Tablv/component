import PieHandler from "./PieHandler";

/**
 * 环图处理
 */
export default class RPieHandler extends PieHandler {
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = super.getStyle() as echarts.EChartOption;

    style.series = this.getSeries();

    return style;
  }
  /**
   * 获取Series数据
   *
   * @param fieldNames 分析结果划分数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    series = (super.getSeries() as Array<echarts.EChartOption.SeriesPie>).map(
      seriesData => {
        seriesData.radius = ["45%", "70%"];
        return seriesData;
      }
    );
    return series;
  }
}
