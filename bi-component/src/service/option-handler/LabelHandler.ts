/**
 * 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
 */

import { SeriesOption } from "glaway-bi-model/view/dashboard/chart/SeriesOption";
import { BarSeriesOption } from "glaway-bi-model/view/dashboard/chart/BarSeriesOption";
import { FunnelSeriesOption } from "glaway-bi-model/view/dashboard/chart/FunnelSeriesOption";
import { GaugeSeriesOption } from "glaway-bi-model/view/dashboard/chart/GaugeSeriesOption";
import { LineSeriesOption } from "glaway-bi-model/view/dashboard/chart/LineSeriesOption";
import { PieSeriesOption } from "glaway-bi-model/view/dashboard/chart/PieSeriesOption";

export default class LabelHandler {
  public static getLable(label: SeriesOption["label"]): SeriesOption["label"] {
    return {
      show: label.show,
      color: label.color,
      fontFamily: label.fontFamily,
      fontSize: label.fontSize,
      offsetCenter: label.offset,
      rotate: label.rotate,
      backgroundColor: label.backgroundColor,
      borderColor: label.borderColor,
      borderWidth: label.borderWidth,
      borderRadius: label.borderRadius,
      padding: label.padding,
      shadowColor: label.shadowColor,
      shadowBlur: label.shadowBlur,
      shadowOffsetX: label.shadowOffsetX,
      shadowOffsetY: label.shadowOffsetY,
      textBorderColor: label.textBorderColor,
      textBorderWidth: label.textBorderWidth,
      textShadowColor: label.textShadowColor,
      textShadowBlur: label.textShadowBlur,
      textShadowOffsetX: label.textShadowOffsetX,
      textShadowOffsetY: label.textShadowOffsetY,
      position: label.position as EPosition
    };
  }

  // 对label进行处理
  public static getMapLabel(label: SeriesOption["label"]) {
    return this.getLable(label);
  }

  /**
   * @function 柱图label的处理方法
   * @param label 柱图相关的lable配置信息
   */
  public static getBarLabel(
    label: SeriesOption["label"]
  ): echarts.EChartOption.SeriesBar["label"] {
    return this.getLable(label) as echarts.EChartOption.SeriesBar["label"];
  }

  /**
   * @function 漏斗图label的处理方法
   * @param label 漏斗图相关的label配置信息
   */
  public static getFunnelLabel(
    sampleStyle: FunnelSeriesOption
  ): echarts.EChartOption.SeriesFunnel["label"] {
    const { decimals, label } = sampleStyle;
    const baseLable = this.getLable(label);

    // 返回数据格式化
    baseLable.formatter = (params: { value: number; percent: number }) => {
      const value = Number((params.value * 1).toFixed(decimals.value));
      const percent = Number((params.percent * 1).toFixed(decimals.value));
      let result = `${percent.toFixed(decimals.value)}%`;
      if (label.isShowNumber) {
        result = `${value}` + `(${result})`;
      }
      return result;
    }
    return baseLable as echarts.EChartOption.SeriesFunnel["label"];
  }

  /**
   * @function 仪表盘label的处理方法
   * @param label label配置信息
   */
  public static getGaugeLabel(
    sampleStyle: GaugeSeriesOption,
    comparison: number
  ): any {
    const { decimals, label } = sampleStyle;

    const baseLable = this.getLable(label);
    
    // 返回数据格式化
    baseLable.formatter = (value: number) => {
      let result = `${((value / comparison) * 100).toFixed(2)}%`;
      if (label.isShowNumber) {
        result = `${value}` + `(${result})`;
      }
      const number = [result, `\n${comparison}`].join("");
      return number;
    }
    return baseLable as any;
  }

  /**
   * @function 仪表盘label的处理方法
   * @param label label配置信息
   */
  public static getTargetLabel(
    sampleStyle: GaugeSeriesOption,
    comparison: number
  ): any {
    const { decimals, label } = sampleStyle;

    const baseLable = this.getLable(label);

    // 返回数据格式化
    baseLable.formatter = (value: number) => {
      let result = `${((value / comparison) * 100).toFixed(decimals.value)}%`;
      if (label.isShowNumber) {
        result = `${value}` + `(${result})`;
      }
      const number = [result, `\n${comparison}`].join("");
      return number;
    }
    return baseLable as any;
  }


  /**
   * @function 线图的label处理方法
   *
   */
  public static getLineLabel(
    sampleStyle: LineSeriesOption
  ): echarts.EChartOption.SeriesLine["label"] {
    const { label } = sampleStyle;
    return this.getLable(label) as echarts.EChartOption.SeriesLine["label"];
  }

  /**
   * 获取饼图label样式
   *
   * @param sampleStyle 样例样式
   */
  public static getPieLabel(
    sampleStyle: PieSeriesOption
  ): echarts.EChartOption.SeriesPie["label"] {
    const { label, decimals } = sampleStyle;

    const baseLable = this.getLable(label);

    // 返回数据格式化
    baseLable.formatter = (params: any) => {
      if (label.isShowNumber) {
        return params.name + " - " + params.value.toFixed(decimals.value);
      } else {
        return (
          params.name + " - " + params.percent.toFixed(decimals.value) + "%"
        );
      }
    }
    return baseLable as echarts.EChartOption.SeriesPie["label"];
  }
}
enum EPosition {
  left = "left",
  right = "right",
  inside = "inside"
}
