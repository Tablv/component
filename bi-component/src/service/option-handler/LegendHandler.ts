/**
 * 图例组件。
 * 
 * 图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。

   当图例数量过多时，可以使用 滚动图例（垂直） 或 滚动图例（水平）
 */

import EChartsOption from "glaway-bi-model/view/dashboard/chart/EChartsOption";

export default class LegendHandler {
  public static getLegend(echarts: EChartsOption): echarts.EChartOption.Legend {
    const legend = echarts.legend;
    return {
      type: legend?.type,
      show: legend?.show,
      top: legend?.top,
      // left: legend?.left,
      right: legend?.right,
      // bottom: legend?.bottom,
      orient: legend?.orient as EOrient,
      textStyle: legend?.textStyle as any,
      align: legend?.align as EAlign,
      itemGap: Number(legend?.itemGap),
      itemWidth: legend?.itemWidth,
      itemHeight: legend?.itemHeight,
      padding: legend?.padding,
      inactiveColor: legend?.inactiveColor,
      backgroundColor: legend?.backgroundColor,
      borderColor: legend?.borderColor,
      borderWidth: legend?.borderWidth,
      borderRadius: legend?.borderRadius,
      shadowBlur: legend?.shadowBlur,
      shadowColor: legend?.shadowColor,
      shadowOffsetX: legend?.shadowOffsetX,
      shadowOffsetY: legend?.shadowOffsetY
      // formatter: function (name) {
      //   return echarts..format.truncateText(name, 40, '14px Microsoft Yahei', '…');
      // },
      // tooltip: {
      //   show: true
      // }
    };
  }
}

enum EOrient {
  horizontal = "horizontal",
  vertical = "vertical"
}

enum EAlign {
  auto = "auto",
  left = "left",
  right = "right"
}
