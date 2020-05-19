import ChartConfig from "./ChartConfig";

/**
 * 编辑器部分
 */

// 可选图表选项
export const chartCreateOptions = ChartConfig.getAllCreateMenuConfig();

/**
 * 仪表盘集
 */
export const dashboardSetOptions: any = {
  terminalType: {
    selection: [
      { text: "PC", value: 0 },
      { text: "大屏幕", value: 1 },
      { text: "手机", value: 2 }
    ]
  }
};
