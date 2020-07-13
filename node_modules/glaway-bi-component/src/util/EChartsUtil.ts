import echarts from "echarts";

/**
 * ECharts 工具类
 */
export default class EChartsUtil {
  /**
   * 初始化 ECharts 实例
   *
   * @param echartContainer DOM 容器
   */
  public static init(echartContainer: HTMLElement): echarts.ECharts {
    return echarts.init(echartContainer as HTMLDivElement);
  }

  /**
   * 销毁 ECharts 实例
   *
   * @param echartsInstance ECharts 实例
   */
  public static destroy(echartsInstance: echarts.ECharts | null): void {
    if (echartsInstance) {
      echartsInstance.dispose();
    }
  }

  /**
   * 清空 ECharts 图表
   *
   * @param echartsInstance ECharts 实例
   */
  public static clear(echartsInstance: echarts.ECharts | null): void {
    if (echartsInstance) {
      echartsInstance.clear();
    }
  }

  /**
   * 设置图表选项
   *
   * @param echartsInstance ECharts 实例
   * @param echartsOption ECharts 选项
   */
  public static setOption(
    echartsInstance: echarts.ECharts,
    echartsOption: echarts.EChartOption
  ): void {
    echartsInstance.clear();
    echartsInstance.setOption(echartsOption);
  }

  /**
   * 调整 ECharts 尺寸
   *
   * @param echartsInstance ECharts 实例
   */
  public static resize(echartsInstance: echarts.ECharts): void {
    if (echartsInstance) {
      setTimeout(() => echartsInstance.resize(), 100);
    }
  }
}
