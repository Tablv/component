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
    dimensions: Array<string>,
    fieldName: string,
    result: AnalysisResults,
    decimals?: any
  ): echarts.EChartOption.SeriesBar["data"] {
    let fieldArray: echarts.EChartOption.SeriesBar["data"] = [];

    fieldArray = result.map((data: any) => {
      let value = data[fieldName];
      if (typeof value !== "object") {
        value = decimals
          ? Number(data[fieldName]).toFixed(decimals.value)
          : data[fieldName];
      }
      return {
        measure: {
          name: fieldName,
          value: data[fieldName]
        },
        dimensions: dimensions.map(dimensionName => {
          return {
            name: dimensionName,
            value: data[dimensionName]
          };
        }),
        name: fieldName,
        originalValue: data[fieldName],
        value
      };
    });

    return fieldArray;
  }

  public static getLineByFieldLineName(
    dimensions: Array<string>,
    fieldName: string,
    result: AnalysisResults,
    decimals?: any,
    connectNulls?: boolean | object
  ): echarts.EChartOption.SeriesBar["data"] {
    let fieldArray: echarts.EChartOption.SeriesBar["data"] = this.getDataByFieldName(
      dimensions,
      fieldName,
      result,
      decimals
    );
    if (fieldArray && typeof connectNulls === "object") {
      fieldArray.forEach((item: any) => {
        item.value = item.value || 0;
      });
    }
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

    const resultValue = result[0][fieldName];

    const value = decimals
      ? Number(resultValue).toFixed(decimals.value)
      : resultValue;

    (<any>dataresult)[index] = {
      measure: {
        name: fieldName,
        value: resultValue
      },
      dimensions: [
        {
          name: fieldName,
          value: resultValue
        }
      ],
      name: fieldName,
      originalValue: resultValue,
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
    dimensions: Array<string>,
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
        measure: {
          name: fieldName,
          value: item[fieldName]
        },
        dimensions: dimensions.map(dimensionName => {
          return {
            name: dimensionName,
            value: item[dimensionName]
          };
        }),
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
    result: AnalysisResults,
    decimals?: any
  ): echarts.EChartOption.SeriesBar["data"] {
    return result.map((data: any) => {
      // const value = decimals
      //   ? Number(data[measureName]).toFixed(decimals.value)
      //   : data[measureName];
      const dataObject: echarts.EChartOption.SeriesPie.DataObject = {
        measure: {
          name: measureName,
          value: data[measureName]
        },
        dimensions: [
          {
            name: dimensionName,
            value: data[dimensionName]
          }
        ],
        name: data[dimensionName] as string,
        originalValue: data[measureName] as number,
        value: data[measureName]
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
    result: AnalysisResults,
    decimals?: any
  ): echarts.EChartOption.SeriesBar["data"] {
    return measureNameList.map(measureName => {
      let value = EChartServiceUtil.getReduceSum(result, measureName);
      // value = decimals
      //   ? Number(value.toFixed(decimals.value))
      //   : value;
      const dataObject: echarts.EChartOption.SeriesPie.DataObject = {
        measure: {
          name: measureName,
          value
        },
        dimensions: [
          {
            name: measureName,
            value
          }
        ],
        name: measureName as string,
        value,
        originalValue: value
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
    const value = result.map(data => data[measureName] as number);
    return {
      measure: {
        name: measureName,
        value
      },
      dimensions: [
        {
          name: measureName,
          value
        }
      ],
      name: measureName,
      originalValue: value,
      value
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
    return sampleStyle
      ? {
          margin: "25%",
          normal: {
            show: sampleStyle.label.show,
            position: sampleStyle.label.position,
            color: sampleStyle.label.color,
            fontFamily: sampleStyle.label.fontFamily,
            fontSize: sampleStyle.label.fontSize,
            formatter: (params: any) => {
              if (sampleStyle.label.isShowNumber) {
                return (
                  params.name +
                  " - " +
                  params.value.toFixed(sampleStyle.decimals.value)
                );
              } else {
                return (
                  params.name +
                  " - " +
                  params.percent.toFixed(sampleStyle.decimals.value) +
                  "%"
                );
              }
            }
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
