import BarHandler from "./BarHandler";

/**
 * 条图处理
 */
export default class HBarHandler extends BarHandler {
  /**
   * 获取X轴数据
   */
  public getXAxis(): Array<echarts.EChartOption.XAxis> {
    /*
     * 横向条形图 X轴配置，使用竖向柱状图 Y轴配置
     */
    return super.getYAxis() as Array<echarts.EChartOption.XAxis>;
  }

  /**
   * 获取Y轴数据
   */
  public getYAxis(): Array<echarts.EChartOption.YAxis> {
    /*
     * 横向条形图 Y轴配置，使用竖向柱状图 X轴配置
     */
    return super.getXAxis() as Array<echarts.EChartOption.YAxis>;
  }
}
