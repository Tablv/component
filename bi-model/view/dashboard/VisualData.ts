import { ChartType } from "glaway-bi-model/enums/ChartType";
import { EChartsSampleStyle } from "glaway-bi-model/view/dashboard/EChartsOption";
import Draggable from "glaway-bi-model/view/Draggable";

/**
 * 可视化数据
 */
export default interface VisualData extends Draggable {
  // 图表类型
  type: ChartType;

  // 网格尺寸
  grid: Array<number>;

  // 图表位置
  position: VisualLocation;

  // 宽度
  width: number;

  // 高度
  height: number;

  background?: string;

  borderWidth?: number;

  borderStyle?: string;

  borderColor?: string;

  borderRadius?: number;

  // 各图表样例样式
  // (适用于各图表Handler取值，生成带有样式的数据用)
  sampleStyle: EChartsSampleStyle;
}

/**
 * 可视化坐标定位
 */
interface VisualLocation {
  x: number;
  y: number;
  z: number;
}
