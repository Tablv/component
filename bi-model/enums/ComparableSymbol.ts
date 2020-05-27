/**
 * 可比较的符号
 */
export enum ComparableSymbol {
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
export const ComparableSymbolMapping = [
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
 * 比较方法
 */
export const thresholdComparators = {
  ">": (value: number, threshold: number) => value > threshold,
  ">=": (value: number, threshold: number) => value >= threshold,
  "<": (value: number, threshold: number) => value < threshold,
  "<=": (value: number, threshold: number) => value <= threshold
};
