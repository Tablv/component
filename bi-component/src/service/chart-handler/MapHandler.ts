import { SplitedFieldNames } from "../EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
import echarts from "echarts";
import LabelHandler from "../option-handler/LabelHandler";

/**
 * 地图处理
 * 同时处理 挂载geo后，其他点在这里的显示情况
 */
export default class MapHandler implements ChartHandler {
  /**
   * @name 分析字段
   */
  public fieldNames: SplitedFieldNames;
  /**
   * @function 构造函数
   * 后面有其他的设置也加入到这里
   * @param result 分析结果
   * @param dashboard 仪表盘数据
   * @param sampleStyle 样例样式
   */
  constructor(
    public result: AnalysisResults,
    public dashboard: Dashboard,
    public sampleStyle: MapSeriesOption
  ) {
    this.fieldNames = EChartsService.splitFieldNames(
      this.result[0],
      this.dashboard
    );
  }

  /**
   * @function 获取图表的处理结果
   */
  public getStyle(): echarts.EChartOption {
    let style: echarts.EChartOption = {};

    if (ObjectUtil.isEmpty(this.result)) {
      style.dataset = [];
      style.series = [];
      return {};
    }
    // 图表结构
    style.series = this.getSeries();

    // dataset
    style.dataset = this.getDataSet();

    return style;
  }

  /**
   * @function 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    const eoption = this.dashboard.echarts;
    const mapList = this.sampleStyle.mapList as Array<string>;
    let series: Array<echarts.EChartOption.Series> = [
      {
        type: "map",
        name: "地图",
        map: mapList[mapList.length - 1],
        geoIndex: this.sampleStyle.geoIndex,
        datasetIndex: 0,
        showLegendSymbol: false,
        label: LabelHandler.getMapLabel(this.sampleStyle.label) as any,
        itemStyle: this.sampleStyle.itemStyle,
        emphasis: this.sampleStyle.emphasis,
        zlevel: 1,
      }
    ];
    if (eoption.effectScatter && eoption.effectScatter.show) {
      series.push(this.getEffectScatterSeries())
    } else {
      series.push(this.getScatterSeries())
    }
    if (eoption.lines) {
      series.push(this.getLines())
    }
    return series;
  }

  public getScatterSeries(): echarts.EChartOption.Series {
    const series: echarts.EChartOption.Series = {
      type: "scatter",
      name: "散点",
      geoIndex: this.sampleStyle.geoIndex,
      datasetIndex: 1,
      coordinateSystem: 'geo',
      symbol: this.dashboard.echarts.effectScatter.symbol,
      symbolRotate: this.dashboard.echarts.effectScatter.symbolRotate,
      symbolSize: this.dashboard.echarts.effectScatter.symbolSize,
      itemStyle: this.dashboard.echarts.effectScatter.itemStyle,
      label: LabelHandler.getMapLabel(this.sampleStyle.label) as any,
      zlevel: 2,
    }
    return series;
  }

  /**
   * 涟漪散点
   */
  public getEffectScatterSeries(): echarts.EChartOption.Series {
    const series: echarts.EChartOption.Series = {
      type: "effectScatter",
      name: "涟漪散点",
      geoIndex: this.sampleStyle.geoIndex,
      datasetIndex: 1,
      coordinateSystem: 'geo',
      symbol: this.dashboard.echarts.effectScatter.symbol,
      symbolRotate: this.dashboard.echarts.effectScatter.symbolRotate,
      symbolSize: this.dashboard.echarts.effectScatter.symbolSize,
      itemStyle: this.dashboard.echarts.effectScatter.itemStyle,
      rippleEffect: this.dashboard.echarts.effectScatter.rippleEffect,
      label: LabelHandler.getMapLabel(this.sampleStyle.label) as any,
      zlevel: 3,
    }
    return series;
  }

  /**
   * 路径
   */
  public getLines(): echarts.EChartOption.Series {
    const series: echarts.EChartOption.Series =  {
      type: "lines",
      name: "路径",
      zlevel: 4,
      geoIndex: this.sampleStyle.geoIndex,
      coordinateSystem: 'geo',
      symbol: this.dashboard.echarts.lines.symbol,
      symbolSize: this.dashboard.echarts.lines.symbolSize,
      lineStyle: this.dashboard.echarts.lines.lineStyle,
      effect: this.dashboard.echarts.lines.effect,
      label: LabelHandler.getMapLabel(this.sampleStyle.label) as any,
      data: [
        {
          name: 'No.1',
          coords: [
            [116.096385, 35.389503], [116.045792, 34.799773]
          ]
        },
        {
          name: 'No.2',
          coords: [
            [116.096385, 35.389503], [115.369691, 35.400801]
          ]
        },
        {
          name: 'No.3',
          coords: [
            [116.096385, 35.389503], [115.495792, 35.490801]
          ]
        },
        {
          name: 'No.4',
          coords: [
            [116.096385, 35.389503], [114.495792, 34.799773]
          ]
        },
        {
          name: 'No.5',
          coords: [
            [116.096385, 35.389503], [115.495792, 34.709773]
          ]
        },
      ]
    }
    return series;
  }

  /**
   * @function 处理数据
   */
  public getDataSet() {
    return [
      {
        source: [
          { name: "东明县", value: 20057.34 },
          { name: "牡丹区", value: 15477.48 },
          { name: "郓城县", value: 31686.1 },
          { name: "定陶区", value: 6992.6 },
          { name: "曹县", value: 44045.49 },
          { name: "单县", value: 40689.64 },
          { name: "成武县", value: 37659.78 },
          { name: "巨野县", value: 45180.97 },
          { name: "鄄城县", value: 20900.26 }
        ]
      },
      {
        source: [
          { lng: 116.096385, lat: 35.389503, value: 9000 },
          { lng: 116.045792, lat: 34.799773, value: 2000 },
          { lng: 115.369691, lat: 35.400801, value: 900 }
        ]
      }
    ];
  }
}
