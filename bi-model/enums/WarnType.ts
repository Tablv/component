/**
 * 预警判断条件
 */
export enum WarnSymbolType {
  // 大于
  GT = ">",

  // 大于等于
  GE = ">=",

  // 小于
  LT = "<",

  // 小于等于
  LE = "<="
}

/**
 * 类型映射
 */
export const WarnSymbolTypeMapping = [
  {
    value: ">",
    text: "大于"
  },
  {
    value: ">=",
    text: "大于等于"
  },
  {
    value: "<",
    text: "小于"
  },
  {
    value: "<=",
    text: "小于等于"
  }
];

/**
 * 预警信息显示类型
 */
export enum WarnDisplayType {
  /**
   * 预警信息显示类型
   *  - 0:
   *  - 1: 在图表右侧显示
   *  - 2: 在鼠标移入时显示 tooltip
   */

  // 不显示预警信息
  NONE,

  // 在图表右侧显示
  ON_CHART,

  // 在鼠标移入时显示 tooltip
  ON_TOOLTIP
}

/**
 * 类型映射
 */
export const WarnDisplayTypeMapping = [
  {
    value: 0,
    text: "不显示"
  },
  {
    value: 1,
    text: "图表右侧"
  },
  {
    value: 2,
    text: "鼠标移入时"
  }
];
