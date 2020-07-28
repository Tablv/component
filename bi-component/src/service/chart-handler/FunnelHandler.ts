import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { FunnelChartOption } from "glaway-bi-model/view/dashboard//chart/ChartOption";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";

/**
 * 仪表盘处理
 */
export default class FunnelHandler implements ChartHandler {
  /**
   * 分析字段
   */
  public fieldNames: SplitedFieldNames;

  /**
   * 数据设置
   * 后面有其他的设置也加入到这里
   * @param result 分析结果
   * @param dashboard 仪表盘数据
   * @param sampleStyle 样例样式
   */
  constructor(
    public result: AnalysisResults,
    public dashboard: Dashboard,
    public sampleStyle: FunnelChartOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.series = [];
      return {};
    }

    style.series = this.getSeries();
    style.tooltip = this.getTooltips();

    style.legend = this.getLegend();

    return style;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];

    // 指示器这里 实际值 = 度量
    // 实际值必须唯一，
    const seriesData = {
      type: "funnel",
      label: {
        show: this.sampleStyle.label.show,
        color: this.sampleStyle.label.color,
        fontFamily: this.sampleStyle.label.fontFamily,
        fontSize: this.sampleStyle.label.fontSize,
        position: this.sampleStyle.label.position
      },
      itemStyle: {
        borderColor: '#fff000',
        borderWidth: 10
      },
      data: [
        {value: 60, name: '访问'},
        {value: 30, name: '咨询'},
        {value: 10, name: '订单'},
        {value: 80, name: '点击'},
        {value: 100, name: '展现'}
    ]
    } as any;
    series.push(seriesData);

    return series;
  }

  // 提示信息
  getTooltips() {
    return {
      trigger: 'item',
      formatter: "{b} : {c}%"
    };
  }
  getLegend() {
    return {
      data:  ['展现','点击','访问','咨询','订单']
    };
  }
}
