import { AnalysisResults } from "glaway-bi-model/types/AnalysisResults";
import { SplitedFieldNames } from "../EChartsService";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import EChartsService from "../EChartsService";
import { ChartHandler } from "glaway-bi-component/src/interfaces/ChartHandler";
import EChartDataUtil from "glaway-bi-component/src/util/EChartDataUtil";
import { PieSeriesOption } from "glaway-bi-model/view/dashboard/chart/PieSeriesOption";
import LabelHandler from "../option-handler/LabelHandler";

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
    public sampleStyle: PieSeriesOption
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

    style.series = this.getSeries();
    style.radar = this.getRadar();
    return style;
  }

  /**
   * 获取radar坐标
   */
  getRadar(): echarts.EChartOption.SeriesRadar.DataObject {
    let radarData: any = {
      indicator: [],
      center: this.sampleStyle.center,
      radius:
        typeof this.sampleStyle.radius === "object"
          ? this.sampleStyle.radius.map(item => item + "%")
          : this.sampleStyle.radius
    };
    this.fieldNames.dimensions.forEach(dimensionName => {
      this.result.forEach((data: any) => {
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
        label: LabelHandler.getPieLabel(this.sampleStyle),
        data: this.fieldNames.measures.map(measureName =>
          EChartDataUtil.getRadarDataByAxisName(measureName, this.result)
        )
      }
    ] as Array<echarts.EChartOption.SeriesRadar>;
  }
}
