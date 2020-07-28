import { ChartType } from "glaway-bi-model/enums/ChartType";
import { EChartsSampleStyle } from "glaway-bi-model/view/dashboard/EChartsOption";
import Draggable from "glaway-bi-model/view/Draggable";
import { BackgroundType } from "glaway-bi-model/enums/DashboardSet";

/**
 * 可视化数据
 */
export default interface VisualData extends Draggable {
  // 图表类型
  type: ChartType;

  // 图表位置
  position: VisualLocation;

  // 宽度
  width: number;

  // 高度
  height: number;

  background: {
    enable: boolean,
    props: {
      type: BackgroundType;
      color: string; // color: HEX-Color-Value
      url: string; // url: IMG-URL
    }
  };

  border: {
    enable: boolean;
    props: {
      width: number;
      style: "dotted" | "solid" | "double" | "dashed";
      color: string; // Hex
      radius: number;
    } | null;
  };

  shadow: {
    enable: boolean;
    props: {
      // 水平阴影的位置
      h: number;
      
      // 垂直阴影的位置
      v: number;
      
      // 模糊距离
      blur: number;

      // 阴影大小
      spread: number;

      // 阴影颜色
      color: string; // Hex
    } | null;
  };

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
