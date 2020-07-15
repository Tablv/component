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
  ): echarts.EChartOption.SeriesBar["data"] {
    let fieldArray: echarts.EChartOption.SeriesBar["data"] = [];

    fieldArray = result.map((data: any) => {
      const value = decimals
        ? Number(data[fieldName]).toFixed(decimals.value)
        : data[fieldName];
      return {
        name: fieldName,
        originalValue: data[fieldName],
        value
      };
    });

    return fieldArray;
  }

  public static getTestByFieldName(
    index: number,
    fieldName: string,
    result: AnalysisResults,
    decimals?: any
  ): echarts.EChartOption.SeriesBar["data"] {
    const dataresult: echarts.EChartOption.SeriesBar["data"] = [];

    dataresult.length = Object.keys(result).length;

    const value = decimals
      ? Number(result[0][fieldName]).toFixed(decimals.value)
      : result[0][fieldName];

    (<any>dataresult)[index] = {
      name: fieldName,
      originalValue: result[0][fieldName],
      value
    };

    return dataresult;
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
  ): echarts.EChartOption.SeriesBar["data"] {
    return result.map((item: any) => {
      const dec = decimals?.value || 0;
      const value = Number(
        ((item[fieldName] / item["sum"]) * 100).toFixed(dec)
      );
      return {
        name: fieldName,
        originalValue: item[fieldName],
        value
      };
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
        originalValue: data[measureName] as number,
        value: data[measureName] as number
      } as any;

      return dataObject;
    });
  }

  /**
   * 进针对度量进行，获取分析结果中的数据
   *
   * @param measureNameList 度量列表
   * @param result 分析结果
   */
  public static getNameByMeasure(
    measureNameList: Array<string>,
    result: AnalysisResults
  ): echarts.EChartOption.SeriesBar["data"] {
    return measureNameList.map(measureName => {
      const dataObject: echarts.EChartOption.SeriesPie.DataObject = {
        name: measureName as string,
        value: EChartServiceUtil.getReduceSum(result, measureName),
        originalValue: EChartServiceUtil.getReduceSum(result, measureName)
      } as any;
      return dataObject;
    });
  }

  /**
   * 对一个对象数组进行某个字段求和
   *
   * @param result 求和数组
   * @param measureName 求和字段
   */
  public static getReduceSum(result: Array<any>, measureName: string): number {
    return (
      result.reduce((total: any, item: any) => {
        return total + parseInt(item[measureName]) || 0;
      }, 0) || 0
    );
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
      originalValue: result.map(data => data[measureName] as number),
      value: result.map(data => data[measureName] as number)
    } as any;
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
    const formatterTextType = sampleStyle.label.isShowNumer ? "c}" : "d}%";
    return sampleStyle
      ? {
          margin: "25%",
          normal: {
            show: sampleStyle.label.show,
            position: sampleStyle.label.position,
            color: sampleStyle.label.color,
            fontFamily: sampleStyle.label.fontFamily,
            fontSize: sampleStyle.label.fontSize,
            formatter: `{b} - {${formatterTextType}`
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
