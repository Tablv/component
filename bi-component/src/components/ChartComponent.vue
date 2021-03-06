<template>
  <div class="chart-wrapper">
    <div class="chart-container" ref="echartsContainer"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Emit, Watch } from "vue-property-decorator";
import echarts from "echarts";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import ChartUIService from "glaway-bi-component/src/interfaces/ChartUIService";
import AnalysisData from "glaway-bi-model/view/dashboard/AnalysisData";
import EventsConfig from "glaway-bi-model/view/dashboard/EventsConfig";
import ReactWhere from "glaway-bi-model/view/ReactWhere";
import UUID from "glaway-bi-util/UUID";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { SortType } from "glaway-bi-model/enums/SortType";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import {
  AnalysisResult,
  AnalysisResults
} from "glaway-bi-model/types/AnalysisResults";
import EChartsService, {
  bindEvents,
  offBindEvents,
  handleOpacity,
  resetOpacity,
  renderChart,
  renderChartByJSON
} from "glaway-bi-component/src/service/EChartsService";
import EChartsUtil from "glaway-bi-component/src/util/EChartsUtil";
import WhereDTO from "glaway-bi-model/params/WhereDTO";
import JsonData from "../map/index";

for (const [key, value] of JsonData.JsonData) {
  echarts.registerMap(key, value);
}

@Component
export default class ChartComponent extends Vue implements ChartUIService {
  // 图表数据及所在下标
  @Prop()
  dashboard!: Dashboard;

  @Prop()
  analysisdata!: AnalysisResults;

  // 联动数据
  @Prop({
    default: () => {
      return {};
    }
  })
  reactWhere!: ReactWhere;

  get thisAnalysisData(): AnalysisResults {
    return this.analysisdata;
  }

  set thisAnalysisData(analysisdata: AnalysisResults) {
    this.$emit("update:analysisdata", analysisdata);
  }

  get thisDashboard() {
    return this.dashboard;
  }

  set thisDashboard(dashboard: Dashboard) {
    this.$emit("update:dashboard", dashboard);
  }

  // 设置联动
  @Emit("setReact")
  setReact(reactWhere: ReactWhere) {
    return reactWhere;
  }

  // 设置联动
  @Emit("resetReact")
  resetReact() {}

  @Emit("error")
  onError(errorPart: string, error: Error) {
    return {
      errorPart,
      error
    };
  }
  // 图表实例
  // echartsInstance: echarts.ECharts | null = null;

  /**
   * Getter
   */
  get thisAnalysis(): AnalysisData {
    return this.thisDashboard.analysis;
  }

  /**
   * 接口实现方法
   */

  /**
   * 初始化
   */
  public initChart(): void {
    // 存在实例时，忽略初始化
    if (!this.$data.echartsInstance) {
      let echartsContainer = this.$refs.echartsContainer as HTMLDivElement;
      // 阻止事件
      echartsContainer.oncontextmenu = () => {
        return false;
      };

      this.$data.echartsInstance = EChartsUtil.init(echartsContainer);
    }
  }

  /**
   * 销毁
   */
  public destoryChart(): void {
    EChartsUtil.destroy(this.$data.echartsInstance);
    this.$data.echartsInstance = null;
  }

  /**
   * 清空
   */
  public clearChart(): void {
    EChartsUtil.clear(this.$data.echartsInstance);
  }

  /**
   * 调整尺寸
   */
  public resizeChart(): void {
    if (this.$data.echartsInstance) {
      EChartsUtil.resize(this.$data.echartsInstance);
    }
  }

  /**
   * 绑定事件
   */
  public bindChartEvents(clearEvent: boolean, thisEvents: EventsConfig): void {
    // 事件选项
    let triggerCallback = this.getEventMethod(thisEvents);

    offBindEvents(this.$data.echartsInstance);

    // 绑定事件
    triggerCallback &&
      this.$data.echartsInstance &&
      bindEvents(
        this.$data.echartsInstance, // 实例
        thisEvents, // 事件配置
        triggerCallback, // 回调方法
        this // 回调上下文
      );

    resetOpacity(this.$data.echartsInstance);
  }

  /**
   * 绘制图表
   */
  public renderChart(result?: AnalysisResults, dashboard?: Dashboard): void {
    // JSON 配置
    const JSONConfig = this.thisDashboard.staticData.json;

    if (!this.$data.echartsInstance) {
      this.initChart();
    }

    if (!this.$data.echartsInstance) {
      this.onError("INIT", new Error("初始化图表出错"));
      return;
    }

    // 绘制 JSON 静态数据
    if (JSONConfig.enable) {
      renderChartByJSON(this.$data.echartsInstance, JSONConfig.data).catch(
        err => {
          this.onError("JSON", new Error("解析 JSON 出错，请检查格式"));
        }
      );
    } else {
      result = result || this.thisAnalysisData;

      let selectedIndex = "";
      if (this.thisDashboard.id === this.reactWhere.dashboardId) {
        selectedIndex = this.reactWhere.selectedIndex as string;
      }
      renderChart(
        this.$data.echartsInstance,
        this.thisDashboard,
        result,
        selectedIndex
      )
        .then(result => {
          this.thisDashboard = result;
        })
        .catch(err => {
          console.error("rendererr", err);
        });
    }
  }

  /**
   * 重置图表透明度
   */
  public resetOpacity(): void {
    resetOpacity(this.$data.echartsInstance);
  }

  /**
   * 获取事件回调方法
   */
  private getEventMethod(eventsConfig: EventsConfig): Function | null {
    return this.eventMethod[eventsConfig.triggerEvent] || null;
  }

  /**
   * 事件方法回调
   */
  private eventMethod: any = {
    /**
     * 联动
     */
    react: (chartInstance: any, echartsParams: any) => {
      // 点击后 实现select效果
      const { reset, dataIndex, seriesIndex } = handleOpacity(
        chartInstance,
        echartsParams
      );

      // 判断是否需要重置
      if (reset) {
        this.resetReact();
        return;
      }
      const reactWhere: ReactWhere = {
        selectedIndex: [dataIndex, seriesIndex].join(","),
        oldDashboardId: this.reactWhere.dashboardId,
        rotationTask: this.thisDashboard.tasks,
        dashboardId: this.thisDashboard.id,
        datasetId: this.thisAnalysis.datasetId,
        where: echartsParams.data.dimensions.map((whe: any) => {
          return {
            id: UUID.generate(),
            tableAlias: this.thisAnalysis.measures[0].tableAlias,
            columnName: whe.name,
            w: [
              {
                type: 1,
                value: whe.value
              }
            ]
          };
        })
      };
      this.setReact(reactWhere);
    },

    /**
     * 弹框
     */
    pop(echartsParams: any) {},

    /**
     * 穿透(跳转页面)
     */
    jump(echartsParams: any) {}
  };
}
</script>

<style lang="scss">
.chart-wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;

  .chart-container {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
}
</style>
