/**
 * 提示框组件。
 *
 */

import EChartsOption from "glaway-bi-model/view/dashboard/chart/EChartsOption";

export default class TooltipHandler {
  public static getToolTip(
    echarts: EChartsOption
  ): echarts.EChartOption.Tooltip {
    const toolTip = echarts.tooltip;
    return {
      show: toolTip?.show,
      trigger: toolTip?.trigger as ITrigger,
      backgroundColor: toolTip?.backgroundColor,
      borderColor: toolTip?.borderColor,
      borderWidth: Number(toolTip?.borderWidth),
      padding: toolTip?.padding,
      textStyle: toolTip?.textStyle as echarts.EChartOption.BaseTextStyle,
      formatter: toolTipFormatter
    };
  }
}

enum ITrigger {
  item = "item",
  axis = "axis",
  none = "none"
}

function toolTipFormatter(params: any) {
  return `name: ${params.name}<br />value: ${params.value}`;
}
