/**
 * visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）
 * 视觉元素可以是：
    symbol: 图元的图形类别
    symbolSize: 图元的大小
    color: 图元的颜色
    colorAlpha: 图元的颜色的透明度。
    opacity: 图元以及其附属物（如文字标签）的透明度
    colorLightness: 颜色的明暗度
    colorSaturation: 颜色的饱和度
    colorHue: 颜色的色调
  组件可以定义多个，从而可以同时对数据中的多个维度进行视觉映射。
  组件可以定义为 分段型（visualMapPiecewise） 或 连续型（visualMapContinuous），通过 type 来区分。例如：
 */

import EChartsOption from "glaway-bi-model/view/dashboard/chart/EChartsOption";

export default class VisualMapHandler {
  public static getVisualMap(
    echarts: EChartsOption
  ): Array<echarts.EChartOption.VisualMap> {
    const visualMapList = [] as Array<echarts.EChartOption.VisualMap>;
    visualMapList.push({
      show: true,
      type: "piecewise",
      min: 800,
      max: 50000,
      // realtime: false,
      // calculable: false,
      inRange: {
        color: echarts.color
      }
    });
    return visualMapList;
  }
}
