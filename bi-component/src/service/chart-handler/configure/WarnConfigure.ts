import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import AnalysisData from "glaway-bi-model/view/dashboard/AnalysisData";
import {
  WarnSymbolType,
  WarnDisplayType
} from "glaway-bi-model/enums/WarnType";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { thresholdComparators } from "glaway-bi-model/enums/ComparableSymbol";

/**
 * 预警部分 ECharts Option 的配置方法
 *  - 非函数式方法，将修改 option 的值
 *
 * @param dashboard 仪表盘
 * @param echartsOption ECharts 选项
 */
export default function warnConfigure(
  dashboard: Dashboard,
  echartsOption: echarts.EChartOption
) {
  // 仪表盘分析预警配置
  const warnConfig = dashboard.analysis.warn;

  // 配置预警线
  markLineConfigure(warnConfig, echartsOption);

  // 配置柱/点 颜色
  itemStyleConfigure(warnConfig, echartsOption);

  if (warnConfig.displayType === WarnDisplayType.ON_TOOLTIP) {
    // 配置鼠标移入时的 Tooltip
    tooltipConfigure(warnConfig, echartsOption);
  }
}

/**
 * 配置预警线
 *
 * @param warnConfig 仪表盘分析预警配置
 * @param echartsOption ECharts 选项
 */
function markLineConfigure(
  warnConfig: AnalysisData["warn"],
  echartsOption: echarts.EChartOption
) {
  (echartsOption.series as echarts.EChartOption.SeriesBar[])?.map(series => {
    /**
     * 配置 markLine 属性
     */
    series.markLine = {
      silent: false,
      lineStyle: {
        color: warnConfig.color,
        type: "dashed",
        width: 2
      },
      label: {
        // normal: {
        show: warnConfig.displayType === WarnDisplayType.ON_CHART,
        formatter(data: any) {
          return data.name + data.data.type + data.value;
        }
        // }
      },
      data: warnConfig.value.map(condition => {
        return {
          name: condition.seriesName,
          type: condition.symbol,
          yAxis: condition.value
        };
      }) as any
    };
  });
}

/**
 * 柱图、线图的 itemStyle 预警配置
 *  - 柱图改变 柱颜色
 *  - 线图改变 点颜色
 *
 * @param warnConfig 仪表盘分析预警配置
 * @param echartsOption ECharts 选项
 */
function itemStyleConfigure(
  warnConfig: AnalysisData["warn"],
  echartsOption: echarts.EChartOption
) {
  // 超过预警值显示预警色
  const colorHandler = function(params: any) {
    // 是否符合预警
    const overThreshold = isOverThreshold(warnConfig, params);

    if (overThreshold) {
      // 超过预警 返回预警颜色
      return warnConfig.color;
    }
  };

  /**
   * 配置柱图、线图的 itemStyle 预警配置
   */
  (echartsOption.series as echarts.EChartOption.SeriesBar[])?.map(series => {
    // 存在 itemStyle 则修改color，否则赋值 itemStyle
    if (series.itemStyle) {
      series.itemStyle.color = colorHandler as any;
    } else {
      series.itemStyle = {
        color: colorHandler as any
      };
    }
  });
}

/**
 *
 * @param warnConfig 仪表盘分析预警配置
 * @param echartsOption ECharts 选项
 */
function tooltipConfigure(
  warnConfig: AnalysisData["warn"],
  echartsOption: echarts.EChartOption
) {
  echartsOption.tooltip = {
    trigger: "axis",
    axisPointer: {
      type: "shadow"
    },
    formatter: function(params: echarts.EChartOption.Tooltip.Format[]) {
      const warnPrefix = "预警：<br>";

      let dataTexts: Array<string> = [],
        warnTexts: Array<string> = [];

      params.map(param => {
        // 数据部分
        dataTexts.push(
          `${param.seriesName}：<br>${param.name}：${param.data}<br><br>`
        );

        // 预警部分
        const conditions = warnConfig.value.filter(
          data => data.seriesName === param.seriesName
        );
        if (conditions.length) {
          conditions.map(condition => {
            warnTexts.push(
              `${param.seriesName} ${condition.symbol} ${condition.value}<br>`
            );
          });
        }
      });

      const tooltipText =
        dataTexts.join("") +
        (warnTexts.length ? warnPrefix + warnTexts.join("") : "");

      return tooltipText;
    } as echarts.EChartOption.Tooltip.Formatter
  };
}

/**
 * 是否超过预警值
 *
 * @param warnConfig 仪表盘分析预警配置
 * @param componentParams ECharts 组件回调参数
 */
function isOverThreshold(
  warnConfig: AnalysisData["warn"],
  componentParams: any
) {
  const yAxisVal = componentParams.data,
    conditions = warnConfig.value.filter(
      data => data.seriesName === componentParams.seriesName
    );

  // 判断值是否符合预警标准
  const compareResults = conditions.map(condition =>
    warnComparator(yAxisVal, condition.symbol, condition.value)
  );

  // 数组非空 && 条件全部满足 => 超出预警
  const isOverThreshold =
    !ObjectUtil.isEmptyArray(compareResults) &&
    compareResults.filter(bool => bool === false).length === 0;
  return isOverThreshold;
}

/**
 * 预警比较器
 */
function warnComparator(
  value: number,
  symbol: WarnSymbolType,
  threshold: number
): boolean {
  const handle = thresholdComparators[symbol];
  if (!handle) {
    console.error(`找不到比较方法: ${symbol}`);
    return false;
  }

  return handle(value, threshold);
}
