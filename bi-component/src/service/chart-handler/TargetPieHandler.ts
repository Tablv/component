import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import GaugeHandler from "./GaugeHandler";
import LabelHandler from '../option-handler/LabelHandler';

/**
 * 仪表盘处理
 */
export default class TargetPieHandler extends GaugeHandler {
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.series = [];
      return {};
    }

    style.series = this.getSeries();
    return style;
  }

  /**
   * @function 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];

    // 指示器这里 实际值 = 度量
    // 实际值必须唯一，
    const measures = this.fieldNames.measures[0];
    const actual = EChartDataUtil.getReduceSum(this.result, measures);
    // 对比值 = 维度 唯一
    const dimensions = this.fieldNames.dimensions[0];
    const comparison =
      EChartDataUtil.getReduceSum(this.result, dimensions) || actual || 100;

    if (this.sampleStyle.label.offset) {
      this.sampleStyle.label.offset.forEach((item: string | number) => {
        item = item + "%";
      });
    }

    if (this.sampleStyle.title?.offsetCenter) {
      this.sampleStyle.title.offsetCenter.forEach((item: string | number) => {
        item = item + "%";
      });
    }

    const colorList = this.dashboard.echarts.color || ["#fff000", "000fff"];
    let colorGroup = [
      [actual / comparison, colorList[1]],
      [1, colorList[0]]
    ];
    const decimals = this.sampleStyle.decimals.value;
    const seriesData = {
      type: "gauge",
      detail: LabelHandler.getTargetLabel(this.sampleStyle, comparison),
      // 坐标轴线
      axisLine: {
        // 属性lineStyle控制线条样式
        lineStyle: {
          width: this.sampleStyle.axisLine?.lineStyle.width,
          color: colorGroup
        }
      },
      title: this.sampleStyle.title,
      center: this.sampleStyle.center,
      radius: this.sampleStyle.radius + "%",
      splitNumber: 1,
      pointer: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      endAngle: "-269.99",
      startAngle: "90",
      max: comparison || 100,
      data: [
        {
          measure: {
            name: measures,
            value: actual
          },
          dimensions: [
            {
              name: measures,
              value: actual
            }
          ],
          name: measures,
          originalValue: actual,
          value: actual
        }
      ]
    } as any;
    series.push(seriesData);

    return series;
  }
}
