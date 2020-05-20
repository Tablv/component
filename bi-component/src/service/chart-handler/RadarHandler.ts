import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "glaway-bi-component/src/interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { RadarChartOption } from "glaway-bi-model/view/dashboard/chart/ChartOption";

/**
 * 雷达图处理
 */
export default class RadarHandler implements ChartHandler {
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
    public sampleStyle: RadarChartOption
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
      style.radar = {};
      return {};
    }

    style.legend = this.getLegend();
    style.series = this.getSeries();
    style.radar = this.getRadar();
    return style;
  }

  /**
   * 获取图例
   */
  public getLegend(): echarts.EChartOption.Legend {
    const legend = {
      data: this.fieldNames.measures
    };
    return legend;
  }

  /**
   * 获取radar坐标
   */
  getRadar(): echarts.EChartOption.SeriesRadar.DataObject {
    let radarData: any = {
      indicator: [],
      center: Object.values(this.sampleStyle.centerConfig)
    };
    this.fieldNames.dimensions.forEach(dimensionName => {
      this.result.forEach(data => {
        const radarObj = {
          name: data[dimensionName]
        };
        radarData.indicator.push(radarObj);
      });
    });
    return radarData as echarts.EChartOption.SeriesRadar.DataObject;
  }

  /**
   * 获取Series数据
   */
  public getSeries(): Array<echarts.EChartOption.SeriesRadar> {
    return [
      {
        type: "radar",
        label: {
          show: this.sampleStyle.label.show,
          position: this.sampleStyle.label.position,
          color: this.sampleStyle.label.color,
          fontSize: this.sampleStyle.label.fontSize,
          fontFamily: this.sampleStyle.label.fontFamily
        },
        data: this.fieldNames.measures.map(measureName =>
          EChartDataUtil.getRadarDataByAxisName(measureName, this.result)
        )
      }
    ] as Array<echarts.EChartOption.SeriesRadar>;
  }
}
