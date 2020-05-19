/**
 * Where 类型
 */
export enum WhereType {
  // 等于
  EQ = 1,

  // 不等于
  NEQ = 2,

  // 大于
  GT = 3,

  // 大于等于
  GE = 4,

  // 小于
  LT = 5,

  // 小于等于
  LE = 6,

  // 开头包含
  BW = 7,

  // 结尾包含
  EW = 8,

  // 包含
  IN = 9
}

export const WhereTypeMapping = [
  {
    value: 1,
    text: "等于"
  },
  {
    value: 2,
    text: "不等于"
  },
  {
    value: 3,
    text: "大于"
  },
  {
    value: 4,
    text: "大于等于"
  },
  {
    value: 5,
    text: "小于"
  },
  {
    value: 6,
    text: "小于等于"
  },
  {
    value: 7,
    text: "开头包含"
  },
  {
    value: 8,
    text: "结尾包含"
  },
  {
    value: 9,
    text: "包含"
  }
];
