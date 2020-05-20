import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import {
  BarChartOption,
  PieChartOption
} from "glaway-bi-model/view/dashboard/chart/ChartOption";

export default class EChartServiceUtil {
  /**
   * 通过字段名，获取结果集内的数据数组
   * - 柱图，堆积柱图, 折线图
   *
   * @param fieldName 字段名
   * @param result 结果集
   */
  public static getDataByFieldName(
    fieldName: string,
    result: AnalysisResults,
    decimals?: any
  ): Array<string | number> {
    let fieldArray: Array<string | number> = [];

    fieldArray = result.map((data: any) => {
      return decimals
        ? Number(data[fieldName]).toFixed(decimals.value)
        : data[fieldName];
    });

    return fieldArray;
  }

  /**
   * 通过字段名，获取结果集内的数据数组
   * 百分比堆积柱图
   * @param fieldName 字段名
   * @param result 结果集
   */
  public static getPercentageArray(
    fieldName: string,
    result: AnalysisResults,
    decimals?: any
  ): Array<string | number> {
    return result.map((item: any) => {
      const dec = decimals?.value || 0;
      const value = Number(
        ((item[fieldName] / item["sum"]) * 100).toFixed(dec)
      );
      return value;
    });
  }

  /**
   * 通过字段名，获取结果集内的数据数组
   * - 饼图
   *
   * @param dimensionName 维度字段名
   * @param measureName 度量字段名
   * @param result 结果集
   */
  public static getDataByAxisName(
    dimensionName: string,
    measureName: string,
    result: AnalysisResults
  ): echarts.EChartOption.SeriesBar["data"] {
    return result.map(data => {
      const dataObject: echarts.EChartOption.SeriesPie.DataObject = {
        name: data[dimensionName] as string,
        value: data[measureName] as number
      };

      return dataObject;
    });
  }

  /**
   * 通过字段名，获取结果集内的数据数组
   * 雷达图
   * @param measureName 度量字段名
   * @param result 结果集
   */
  public static getRadarDataByAxisName(
    measureName: string,
    result: AnalysisResults
  ): echarts.EChartOption.SeriesRadar.DataObject {
    return {
      name: measureName,
      value: result.map(data => data[measureName] as number)
    };
  }

  /**
   * 获取柱宽
   *
   * @param sampleStyle 样例样式
   */
  public static getBarWidth(sampleStyle: BarChartOption): string | undefined {
    return sampleStyle
      ? sampleStyle.width.value + sampleStyle.width.unit
      : undefined;
  }

  public static getBarSeriesLabel(
    sampleStyle: BarChartOption
  ): echarts.EChartOption.SeriesBar["label"] {
    return sampleStyle
      ? {
          show: sampleStyle.label.show,
          position: sampleStyle.label.position,
          color: sampleStyle.label.color,
          fontFamily: sampleStyle.label.fontFamily,
          fontSize: sampleStyle.label.fontSize
        }
      : {};
  }

  /**
   * 获取饼图label样式
   *
   * @param sampleStyle 样例样式
   */
  public static getPieSeriesLabel(
    sampleStyle: PieChartOption
  ): echarts.EChartOption.SeriesPie["label"] {
    return sampleStyle
      ? {
          margin: "25%",
          normal: {
            show: sampleStyle.label.show,
            position: sampleStyle.label.position,
            color: sampleStyle.label.color,
            fontFamily: sampleStyle.label.fontFamily,
            fontSize: sampleStyle.label.fontSize,
            formatter: "{b} - {d}%"
          }
        }
      : {
          margin: "25%",
          normal: {
            show: "true",
            formatter: "{b} - {d}%"
          }
        };
  }
}
