import PieHandler from "./PieHandler";

/**
 * 指示器处理
 */
export default class TargetPieHandler extends PieHandler {
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = super.getStyle() as echarts.EChartOption;

    style.series = this.getSeries();

    style.angleAxis = this.getAngleAxis();

    style.radiusAxis = this.getRadiusAxis();

    style.legend = this.getLegend();

    style.polar = this.getPolar();

    style.tooltip = this.getTooltips();

    return style;
  }

  public getAngleAxis(): any {
    const dimensions = this.fieldNames.dimensions[0];
    const measureName = this.fieldNames.measures[0];
    const maxName = dimensions || measureName;
    return {
      max: this.result[0][maxName] || 100,
      show: false
    };
  }

  public getRadiusAxis(): any {
    const dimensions = this.fieldNames.dimensions[0];
    const measureName = this.fieldNames.measures[0];
    const measValue = this.result[0][measureName] || 0;
    const dimevalue = this.result[0][dimensions] || measValue || 100;
    let result = `${((Number(measValue) / Number(dimevalue)) * 100).toFixed(
      this.sampleStyle.decimals.value
    )}%`;
    if (this.sampleStyle.label.isShowNumber) {
      result = ` ${Number(measValue).toFixed(
        this.sampleStyle.decimals.value
      )} / ${Number(dimevalue).toFixed(this.sampleStyle.decimals.value)} `;
    }
    return {
      type: "category",
      show: this.sampleStyle.label.show,
      name: result,
      nameLocation: "start",
      nameTextStyle: {
        align: "center",
        verticalAlign: "middle",
        color: this.sampleStyle.label.color,
        fontFamily: this.sampleStyle.label.fontFamily,
        fontSize: this.sampleStyle.label.fontSize
      },
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    };
  }

  public getPolar(): any {
    return {
      radius: Object.values(this.sampleStyle.radiusConfig).map(
        item => item + "%"
      ),
      center: Object.values(this.sampleStyle.centerConfig)
    };
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    let series: Array<echarts.EChartOption.Series> = [];
    const measureName = this.fieldNames.measures[0];
    const seriesData = {
      type: "bar",
      roundCap: true,
      barWidth: this.sampleStyle.radiusConfig.axisLineWidth,
      showBackground: true,
      coordinateSystem: "polar",
      name: measureName,
      data: [
        {
          name: measureName,
          value: this.result[0][measureName]
        }
      ]
    } as echarts.EChartOption.Series;
    series.push(seriesData);
    return series;
  }

  public getLegend(): any {
    return {
      data: this.fieldNames.measures
    };
  }

  public getTooltips(): any {
    const dimensions = this.fieldNames.dimensions[0];
    const dimevalue = this.result[0][dimensions];
    return {
      formatter: (params: any) => {
        return `
          对比值: ${dimevalue}
          \n
          实际值: ${params.value}
        `;
      }
    };
  }
}
