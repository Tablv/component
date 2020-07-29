import { ChartOption } from "./ChartOption";

/**
 * 漏斗图配置
 */
export interface FunnelChartOption extends ChartOption, Partial<{
  /**
   * 数据最小值
   */
  min: number;

  /**
   * 数据最大值
   */
  max: number;

  /**
   * 数据最小值 min 映射的宽度
   */
  minSize: string;

  /**
   * 数据最大值 max 映射的宽度。
   */
  maxSize: string;

  /**
   *  数据排序 'ascending'，'descending'，'none'
   * 
  */
  sort: string;

  /**
    * 水平方向对齐布局类型
    */
  funnelAlign: string;

  /**
    * 数据图形间距
    */
  gap: number;

  /**
   * 漏斗图组件离容器左侧的距离。
   */
  left: number | string;

  /**
   * 漏斗图组件离容器上侧的距离
   */
  top: number | string;

  /**
   * 漏斗图组件离容器右侧的距离。
   */
  right: number | string;

  /**
   * 漏斗图组件离容器下侧的距离
   */
  bottom: number | string;

  // top left 配置集合
  centerConfig: {
    xAxias: string;
    yAxias: string;
  }

  /**
   * 漏斗图组件的宽度。 默认自适应。
   */
  width: string | number;

  /**
   * 漏斗图组件的高度。默认自适应。
   */
  height: string | number;

  /**
   * 图形样式
   */
  itemStyle: Partial<{
    orderColor: string;
    borderWidth: number;
    borderType: string;
    shadowBlur: string;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    opacity: number
  }>;

  /**
   * 标签的视觉引导线样式
   */
  labelLine: {
    show: boolean;
    length?: number;
    lineStyle: Partial<{
      color: string;
      width: number;
      type: string;
      shadowBlur: string;
      shadowColor: string;
      shadowOffsetX: number;
      shadowOffsetY: number;
      opacity: number;
    }>;
  };

  /**
   * 所有图形的 zlevel 值。
   */
  zlevel?: number;

  /**
   * 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖。
   * z相比zlevel优先级更低，而且不会创建新的 Canvas。
   */
  z?: number;
  
}> {}