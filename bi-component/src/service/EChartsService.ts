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
    if (ObjectUtil.isEmpty(resultData)) {
      console.error("分析结果返回值为空");
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
  let notCurrent = thisDashboard.id !== reactWhere.dashboardId,
    isReact = thisDashboard.analysis.isReact,
    isCurrentDataset =
      thisDashboard.analysis.datasetId === reactWhere.datasetId;

  // 非当前图表 && 参与联动 && 同一个数据集
  if (notCurrent && isReact && isCurrentDataset) {
    callback();
  }
}

const triggerMethods = ["click", "dblclick", "mousedown", "mousemove", "mouseup", "mouseover", "mouseout"];

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
  triggerMethods.forEach(method => {
    chartInstance.off(method);
  })

  const nowTrigger = thisEvents.triggerMethod;
  if (nowTrigger && triggerMethodCallback) {
    chartInstance.on(nowTrigger, triggerMethodCallback.bind(thisContext));
  }
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
  result: AnalysisResults
): Promise<void> {
  try {
    let chartType = thisDashboard.visualData.type,
      defaultConfig = DefaultTemplate.getDefaultConfig(chartType);

    thisDashboard = ObjectUtil.merge(thisDashboard, defaultConfig);

    let echartsOption = EChartsService.mergEChartstyle(thisDashboard, result);
    EChartsUtil.setOption(chartInstace, echartsOption);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
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
