import PieHandler from "./PieHandler";

/**
 * 环图处理
 */
export default class TargetPieHandler extends PieHandler {
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
    this.fieldNames.measures.forEach(measureName => {
      const seriesData = {
        type: "pie",
        hoverAnimation: false,
        avoidLabelOverlap: false,
        clockwise: false,
        label: {
          show: true,
          position: "center",
          formatter: "{b}: {d}%"
        },
        labelLine: {
          show: false
        },
        radius: ["45%", "70%"],
        data: this.result.map(item => ({
          name: measureName,
          value: item[measureName]
        }))
      } as echarts.EChartOption.Series;
      series.push(seriesData);
    });
    return series;
  }
}
