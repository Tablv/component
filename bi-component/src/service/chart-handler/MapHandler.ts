import { SplitedFieldNames } from "../EChartsService";
import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import warnConfigure from "./configure/WarnConfigure";
import { WARN_DEFAULT_VALUE } from "glaway-bi-model/view/Warn";
import { ChartHandler } from "../../interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { MapChartOption } from "glaway-bi-model/view/dashboard/chart/MapChartOption";
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
    public sampleStyle: MapChartOption
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
      style.xAxis = [];
      style.yAxis = [];
      style.series = [];
      return {};
    }
    // 图表结构
    style.series = this.getSeries();

    // 视觉标注
    style.visualMap = this.getVisualMap();

    // 数据提示
    style.tooltip = this.getToolTip();

    // 地图组件
    style.geo = this.getGeo();

    // dataset
    style.dataset = this.getDataSet();

    return style;
  }

  /**
   * @function 获取地图组件
   */
  public getGeo(): Object {
    const mapList = this.sampleStyle.mapList as Array<string>;
    let geo: Object = {
      id: 0,
      map: mapList[mapList.length - 1],
      showLegendSymbol: false,
      // 宽高比
      aspectScale: 0.75,
      zoom: 1.2,
      itemStyle: {
        // 渐变色
        areaColor: {
          type: "radial",
          x: 1,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#abcdef" // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "#123456" // 50% 处的颜色
            },
            {
              offset: 1,
              color: "#abcdef" // 100% 处的颜色
            }
          ],
          global: true // 缺省为 false
        }
      },
      // 高亮
      emphasis: {
        itemStyle: {
          areaColor: "red"
        }
      }
    };
    return geo;
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
        geoIndex: 0,
        datasetIndex: 0
      },
      {
        type: chartTypeList[1],
        coordinateSystem: "geo",
        geoIndex: 0,
        datasetIndex: 1
      }
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

  public getVisualMap(): Array<echarts.EChartOption.VisualMap> {
    const visualMapList = [] as Array<echarts.EChartOption.VisualMap>;
    visualMapList.push({
      show: true,
      type: "piecewise",
      min: 800,
      max: 50000,
      // realtime: false,
      // calculable: false,
      inRange: {
        color: this.dashboard.echarts.sampleStyle.global.color
      }
    });
    return visualMapList;
  }

  public getToolTip(): echarts.EChartOption.Tooltip {
    return {
      trigger: "item",
      formatter: "{b}"
    };
  }
}
