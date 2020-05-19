import VisualData from "./VisualData";
import EChartsOption from "./EChartsOption";
import StaticData from "./StaticData";
import AnalysisData from "./AnalysisData";
import EventsConfig from "./EventsConfig";

/**
 * 仪表盘 数据模型
 */
export default interface Dashboard {
  /**
   * Dashboard编号
   */
  id: string;

  /**
   * 可视化数据
   * (当前元素的大小、坐标等)
   */
  visualData: VisualData;

  /**
   * ECharts 样式
   */
  echarts: EChartsOption;

  /**
   * 静态数据信息
   */
  staticData: StaticData;

  /**
   * 分析数据信息
   * （数据集ID、维度、度量等）
   */
  analysis: AnalysisData;

  /**
   * 事件
   */
  events: EventsConfig;

  /**
   * 是否新创建
   */
  newCreated: boolean;
}
