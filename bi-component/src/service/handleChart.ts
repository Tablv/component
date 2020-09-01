import { SeriesOption } from "glaway-bi-model/view/dashboard/chart/SeriesOption";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import GlobalHandler from "./chart-handler/GlobalHandler";
import handlerRegistry from "./HandlerRegistry";

export default function handleChart(
  result: AnalysisResults,
  dashboard: Dashboard
) {
  // 仪表板类型
  const chartType = dashboard.visualData.type;
  // 仪表板对应的处理对象
  const CustomizedHandler = handlerRegistry[chartType];

  if (!CustomizedHandler) {
    throw new Error("找不到对应图表类型的处理方法");
  }

  // 对应的独立配置
  const sampleStyle = dashboard.echarts.sampleStyle[chartType] as SeriesOption;
  const styleCustomized = new CustomizedHandler(
    result,
    dashboard,
    sampleStyle
  ).getStyle();

  // 全局配置
  const styleGlobal = GlobalHandler(result, dashboard);

  // 结果配置
  const resultStyle = ObjectUtil.merge(styleCustomized, styleGlobal);

  /**
   * 关闭动画
   */
  resultStyle.animation = false;

  return resultStyle;
}
