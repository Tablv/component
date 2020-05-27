/**
 * 触发方式
 */
export enum TriggerMethod {
  /**
   * 无触发方式
   */
  none = "",

  /**
   * 单击
   */
  click = "click",

  /**
   * 双击
   */
  dblclick = "dblclick",

  /**
   * 鼠标按下
   */
  mousedown = "mousedown",

  /**
   * 鼠标移动
   */
  mousemove = "mousemove",

  /**
   * 鼠标按下后抬起
   */
  mouseup = "mouseup",

  /**
   * 鼠标移入
   */
  mouseover = "mouseover",

  /**
   * 鼠标移出
   */
  mouseout = "mouseout"
}

/**
 * 触发事件
 */
export enum TriggerEvent {
  /**
   * 无触发事件
   */
  none = "",

  /**
   * 联动
   */
  react = "react",

  /**
   * 弹框
   */
  pop = "pop",

  /**
   * 穿透(跳转页面)
   */
  jump = "jump"
}
