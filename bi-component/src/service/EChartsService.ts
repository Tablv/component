import AnalysisDTO from "glaway-bi-model/params/AnalysisDTO";
import {
  AnalysisResult,
  AnalysisResults
} from "glaway-bi-model/types/AnalysisResults";
import ReactWhere from "glaway-bi-model/view/ReactWhere";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsOption from "glaway-bi-model/view/dashboard/EChartsOption";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import { FieldType } from "glaway-bi-model/enums/FieldType";
import AnalysisData from "glaway-bi-model/view/dashboard/AnalysisData";
import EChartsUtil from "glaway-bi-component/src/util/EChartsUtil";
import EventsConfig from "glaway-bi-model/view/dashboard/EventsConfig";
import ChartUIService from "glaway-bi-component/src/interfaces/ChartUIService";

import handleChart from "./handleChart";
import ParamsConverter from "glaway-bi-component/src/util/ParamsConverter";
import DefaultTemplate from "glaway-bi-component/src/config/DefaultTemplate";
import echarts from "echarts";

/**
 * ECharts 业务层
 */
export default class EChartsService {
  /**
   * 将结果数据，解析为 ECharts 的 Option
   *
   * @param resultData 分析结果数据
   * @param dashboard 仪表盘
   *
   */
  public static getResultStyle(
    resultData: AnalysisResults,
    dashboard: Dashboard
  ): EChartsOption {
    // 获取当前的style对象
    if (ObjectUtil.isEmpty(resultData) || !resultData.length) {
      return new Object() as EChartsOption;
    }

    const resultStyle = handleChart(resultData, dashboard);

    return resultStyle as EChartsOption;
  }

  /**
   * 将图表数据的样式与分析结果合并为 ECharts 的 Option
   * @param dashboard {Dashboard} 仪表板的实例数据
   */
  public static mergEChartstyle(
    dashboard: Dashboard,
    result: AnalysisResults
  ): echarts.EChartOption {
    let style: EChartsOption = ObjectUtil.copy(dashboard.echarts),
      resultStyle: EChartsOption = this.getResultStyle(result, dashboard);

    // 获取当前的style对象
    if (!style) {
      throw "图表样式为null";
    }

    const mergedStyle = ObjectUtil.merge(
      resultStyle,
      style
    ) as echarts.EChartOption;

    return mergedStyle;
  }

  /**
   * 获取字段类型
   *
   * @param fieldName 字段名
   * @param analysis 分析类
   */
  public static getFieldType(
    fieldName: string,
    analysis: AnalysisData
  ): FieldType | undefined {
    for (const index in analysis.dimensions) {
      const tableInfo = analysis.dimensions[index];
      if (fieldName === tableInfo.alias || fieldName === tableInfo.columnName) {
        return FieldType.dimension;
      }
    }

    for (const index in analysis.measures) {
      const tableInfo = analysis.measures[index];
      if (fieldName === tableInfo.alias || fieldName === tableInfo.columnName) {
        return FieldType.measureY;
      }
    }
  }

  /**
   * 分析结果字段 行转列
   *
   * @param resultData 首行数据
   */
  public static splitFieldNames(
    resultData: AnalysisResult,
    dashboard: Dashboard
  ): SplitedFieldNames {
    let fieldNames: SplitedFieldNames = {
      dimensions: [],
      measures: []
    };

    for (const fieldName in resultData) {
      const fieldType: FieldType | undefined = this.getFieldType(
        fieldName,
        dashboard.analysis
      );

      // 如果未找到类型，跳过
      if (!fieldType) continue;

      switch (fieldType) {
        case FieldType.dimension: {
          fieldNames.dimensions.push(fieldName);
          break;
        }
        case FieldType.measureY: {
          fieldNames.measures.push(fieldName);
          break;
        }
      }
    }

    return fieldNames;
  }
}

/**
 * 请求后端，分析维度度量数据
 * 返回Promise 分析结果
 */
export function getAnalysisParam(
  thisDashboard: Dashboard,
  reactWhere: ReactWhere
): AnalysisDTO {
  // 分析参数
  let analysisDTO = ParamsConverter.getAnalysisDTO(thisDashboard);

  // 判断数据集是否一致
  if (thisDashboard.analysis.datasetId === reactWhere.datasetId) {
    ParamsConverter.setReactWhere(analysisDTO.where, reactWhere);
  }

  return analysisDTO;
}

/**
 * 联动更新时执行的方法
 *
 * @param thisDashboard 当前仪表盘
 * @param reactWhere 联动数据
 */
export function reactUpdate(
  thisDashboard: Dashboard,
  reactWhere: ReactWhere,
  callback: Function
): void {
  const notCurrent = thisDashboard.id !== reactWhere.dashboardId,
    isReact = thisDashboard.analysis.isReact,
    isCurrentDataset =
      thisDashboard.analysis.datasetId === reactWhere.datasetId;

  // 非当前图表 && 参与联动 && 同一个数据集
  if (notCurrent && isReact && isCurrentDataset) {
    callback();
  }
}

const triggerMethods = [
  "click",
  "dblclick",
  "mousedown",
  "mousemove",
  "mouseup",
  "mouseover",
  "mouseout"
];

/**
 * 绑定图表点击事件
 *
 * @param chartInstance Charts 实例
 * @param thisEvents 当前事件配置
 * @param triggerMethodCallback 触发方法回调
 * @param thisContext 当前组件上下文对象
 * @param eventMethodSelection 事件选项（传入则取消此前绑定的事件）
 */
export function bindEvents(
  chartInstance: echarts.ECharts,
  thisEvents: EventsConfig,
  triggerMethodCallback: Function,
  thisContext: ChartUIService
): void {
  // 传入，则先取消绑定事件
  offBindEvents(chartInstance);
  const nowTrigger = thisEvents.triggerMethod;
  if (nowTrigger && triggerMethodCallback) {
    chartInstance.on(
      nowTrigger,
      triggerMethodCallback.bind(thisContext, chartInstance)
    );
  }
}

export function offBindEvents(chartInstance: echarts.ECharts) {
  triggerMethods.forEach(method => {
    chartInstance.off(method);
  });
}

/**
 * 绘制图表
 *
 * @param chartInstace ECharts 实例
 * @param thisDashboard 当前仪表盘
 */
export function renderChart(
  chartInstace: echarts.ECharts,
  thisDashboard: Dashboard,
  result: AnalysisResults,
  selectIndex: string
): Promise<Dashboard> {
  try {
    let chartType = thisDashboard.visualData.type,
      defaultConfig = ObjectUtil.copy(
        DefaultTemplate.getDefaultConfig(chartType)
      );
    thisDashboard = ObjectUtil.merge(defaultConfig, thisDashboard);
    let echartsOption = EChartsService.mergEChartstyle(thisDashboard, result);

    const [dataIndex, seriesIndex] = selectIndex.split(",");

    // 保持选中状态
    dataIndex
      ? handleOpacity(chartInstace, { dataIndex, seriesIndex }, echartsOption)
      : resetOpacity(chartInstace, echartsOption);

    return Promise.resolve(thisDashboard);
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * 重置图表透明度
 *
 * @param chartInstance 图表实例
 * @param echartsOption 图表配置
 */
export function resetOpacity(
  chartInstance: echarts.ECharts,
  echartsOption?: echarts.EChartOption
): void {
  const option = echartsOption || ObjectUtil.copy(chartInstance.getOption());
  if (!option) return;
  option.series?.forEach((serieData: any) => {
    serieData.itemStyle = ObjectUtil.merge(serieData.itemStyle || {}, {
      opacity: "1"
    });
  });
  EChartsUtil.setOption(chartInstance, option);
}

/**
 * 处理透明度问题
 *
 * @param chartInstance 图表实例
 * @param echartsParams 点击参数
 * @param echartsOption 图表配置
 */
export function handleOpacity(
  chartInstance: echarts.ECharts,
  // 约束 必须有 dataIndex, seriesIndex
  echartsParams: {
    dataIndex: string;
    seriesIndex: string;
  },
  echartsOption?: echarts.EChartOption
): { reset: boolean; dataIndex: string; seriesIndex: string } {
  // 1, 0.4 可以后期选择抛出去，作为参数传递
  const itemOpacity = { opacity: "1" };
  const option = echartsOption || ObjectUtil.copy(chartInstance.getOption());
  const result = {
    // 是否重置
    reset: false,
    // 选中的数据小标
    dataIndex: `${echartsParams.dataIndex}`,
    seriesIndex: `${echartsParams.seriesIndex}`
  };
  const series: any = option.series;
  const seriesData = series[result.seriesIndex];

  if (seriesData.data[result.dataIndex]?.itemStyle?.opacity) {
    delete seriesData.data[result.dataIndex].itemStyle.opacity;
    result.reset = true;
    result.dataIndex = "";
    result.seriesIndex = "";
  } else {
    series?.forEach((serieData: any) => {
      serieData.data.forEach((serieItem: any, index: number) => {
        if (serieItem?.itemStyle) {
          delete serieItem.itemStyle.opacity;
        }
      });
    });
    seriesData.data[result.dataIndex].itemStyle = { opacity: "1" };
    itemOpacity.opacity = "0.4";
  }

  series?.forEach((serieData: any) => {
    serieData.itemStyle = Object.assign(
      serieData.itemStyle || {},
      itemOpacity
    );
  });

  EChartsUtil.setOption(chartInstance, option);

  return result;
}

/**
 * 绘制 JSON 静态图表
 *
 * @param chartInstance ECharts 实例
 * @param jsonString JSON 字符串
 */
export function renderChartByJSON(
  chartInstance: echarts.ECharts,
  jsonString: string
): Promise<void> {
  return ObjectUtil.parseJSON(jsonString)
    .then(option => {
      EChartsUtil.setOption(chartInstance, option);
      return Promise.resolve();
    })
    .catch(err => {
      EChartsUtil.setOption(chartInstance, {});
      return Promise.reject(err);
    });
}

/**
 * 分析结果字段名 按所属维度、度量划分
 */
export interface SplitedFieldNames {
  // 维度
  dimensions: Array<string>;

  // 度量
  measures: Array<string>;
}
