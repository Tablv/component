/**
 * Order 类型
 */
export enum OrderType {
  // 正序
  ASC = "ASC",

  // 倒序
  DESC = "DESC"
}

export const OrderTypeMapping = [
  {
    value: "ASC",
    text: "正序"
  },
  {
    value: "DESC",
    text: "倒序"
  }
];
