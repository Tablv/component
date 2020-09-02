import { SplitedFieldNames } from "../EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "../../interfaces/ChartHandler";
import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
import echarts from "echarts";

/**
 * 柱图处理
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
      style.series = [];
      return {};
    }
    // 图表结构
    style.series = this.getSeries();

    // 数据提示
    style.tooltip = this.getToolTip();

    // dataset
    style.dataset = this.getDataSet();

    return style;
  }

  /**
   * @function 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.Series> {
    const chartTypeList = ["map", "scatter"];
    const mapList = this.sampleStyle.mapList as Array<string>;
    let series: Array<echarts.EChartOption.Series> = [
      {
        type: "map",
        map: mapList[mapList.length - 1],
        showLegendSymbol: false,
        geoIndex: 0,
        datasetIndex: 0
      }
      // {
      //   type: chartTypeList[1],
      //   coordinateSystem: "geo",
      //   geoIndex: 0,
      //   datasetIndex: 1
      // }
    ];
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
  
  public getToolTip(): echarts.EChartOption.Tooltip {
    return {
      trigger: "item",
      formatter: "{b}"
    };
  }
}
