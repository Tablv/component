import { HandleType, AxisType } from "glaway-bi-model/enums/DraggablePropType"

export default interface Draggable {
  /**
   * 元素的初始宽度
   */
  w?: number;

  /**
   * 元素的初始高度
   */
  h?: number;

  /**
   * x坐标
   */
  x?: number;

  /**
   * y坐标
   */
  y?: number;

  /**
   * z坐标 zIndex
   */
  z?: number;

  /**
   * 元素的最小宽度
   */
  minw?: number;

  /**
   * 元素的最小高度
   */
  minh?: number;

  /**
   * 定义捕捉元素的网格
   */
  grid?: Array<number>;

  /**
   * 定义句柄数组以限制元素大小调整
   */
  handles?: Array<HandleType>;

  /**
   * 定义元素可拖动的轴
   */
  axis?: AxisType,

  /**
   * 将元素的移动和尺寸限制为父元素
   */
  parent?: boolean;

  /**
   * 定义应该用于拖动组件的选择器
   */
  dragHandle?: string;

  /**
   * 定义应该用于阻止拖动初始化的选择器
   */
  dragCancel?: string;

  /**
   * 是否允许组件在双击时填充其父级
   */
  maximize?: boolean;

  /**
   * 确定组件是否应处于活动状态
   */
  active?: boolean;

  /**
   * 定义组件应该是否可拖动
   */
  draggable?: boolean;
  
  /**
   * 定义组件是否可以调整大小
   */
  resizable?: boolean;

  /**
   * 是否开启冲突检测
   */
  isConflictCheck?: boolean;

  /**
   * 是否开启元素检测
   */
  snap?: boolean;

  /**
   * 开启元素检测是，元素间的对其像素
   */
  snapTolerance?: number;

}