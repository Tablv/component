import PieHandler from "./PieHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";

/**
 * 旭日图处理
 */
export default class SunPieHandler extends PieHandler {
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
    this.fieldNames.dimensions.forEach(dimensionName => {
      this.fieldNames.measures.forEach(measureName => {
        const seriesData = {
          type: "sunburst",
          radius: ["15%", "80%"],
          sort: null,
          highlightPolicy: "ancestor",
          levels: [],
          label: {
            rotate: "radial"
          },
          data: EChartDataUtil.getDataByAxisName(
            dimensionName,
            measureName,
            this.result
          )
        } as echarts.EChartOption.Series;
        series.push(seriesData);
      });
    });
    return series;
  }
}
