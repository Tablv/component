import { WarnDisplayType } from "glaway-bi-model/enums/WarnType";
import { SortType } from "glaway-bi-model/enums/SortType";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import ObjectUtil from "glaway-bi-util/ObjectUtil";
import Dashboard from "glaway-bi-model/view/dashboard/Dashboard";
import DashboardSet from "glaway-bi-model/view/DashboardSet";
import { BackgroundType } from "glaway-bi-model/enums/DashboardSet";
import { FILTER_DEFAULT_VALUE } from "glaway-bi-model/view/Filter";
import { SORT_DEFAULT_VALUE } from "glaway-bi-model/view/Sort";
import { WARN_DEFAULT_VALUE } from "glaway-bi-model/view/Warn";
import { LIMIT_DEFAULT_VALUE } from "glaway-bi-model/view/Limit";
import ChartConfig from "./ChartConfig";

/**
 * 仪表盘集通用初始化数据
 */
export const defaultDashboardSet: DashboardSet = {
  terminalType: 0,
  widthRatio: 16,
  heightRatio: 9,
  canvasSetting: {
    background: {
      type: BackgroundType.color,
      color: "#fff",
      url: ""
    }
  },
  tempParams: {
    ratio: 80, // 1 : 80px
    zoom: 1
  }
};

/**
 * 仪表盘通用初始化数据
 */
export const generalDataTemplate: any = {
  analysis: {
    datasetId: null,
    dimensions: [],
    measures: [],
    fromTable: null,
    where: [],
    order: [],
    isReact: false,
    joinRelation: [],
    resultStyle: {},
    filter: {
      id: FILTER_DEFAULT_VALUE,
      data: []
    },
    sort: {
      id: SORT_DEFAULT_VALUE,
      type: SortType.result,
      data: [],
      custom: []
    },
    limit: {
      id: LIMIT_DEFAULT_VALUE,
      data: []
    },
    warn: {
      id: WARN_DEFAULT_VALUE,
      color: "#FF0000",
      displayType: WarnDisplayType.NONE,
      value: []
    }
  },
  events: {
    triggerMethod: "",
    triggerEvent: "",
    eventOptions: {}
  },
  staticData: {
    json: {
      enable: false,
      data: ""
    },
    sql: {
      enable: false,
      data: ""
    }
  },
  visualData: {
    grid: [10, 10],
    width: 400,
    height: 300
  },
  echarts: {
    sampleStyle: {
      global: {
        color: [
          "#118DFF",
          "#12239E",
          "#E66C37",
          "#6B007B",
          "#E044A7",
          "#744EC2",
          "#D9B300",
          "#D64550"
        ],
        grid: {
          top: {
            value: 60,
            unit: ""
          },
          left: {
            value: 50,
            unit: ""
          },
          right: {
            value: 50,
            unit: ""
          },
          bottom: {
            value: 30,
            unit: ""
          }
        }
      }
    },
    animation: false,
    title: {
      text: "图表",
      left: "left",
      textStyle: {
        color: "#000",
        fontFamily: "Microsoft YaHei",
        fontSize: 18
      }
    },
    grid: {
      show: false,
      containLabel: true
    },
    legend: {
      show: true,
      orient: "horizontal",
      textStyle: {
        fontSize: 12
      },
      data: [],
      right: "10",
      top: "30"
    },
    tooltip: {
      show: false
    },
    series: []
  },
  tasks: {
    ratotionEnable: false,
    ratotionNumb: 1,
    ratotionId: null
  },
  newCreated: true
};

/**
 * 各类型仪表盘自定义初始化数据
 */
export const customDataTemplates: any = ChartConfig.getAllTemplates();

/**
 * 初始化模板类
 */
export default class DefaultTemplate {
  /**
   * 配置和选项缓存
   */
  private static configCache: Map<ChartType, Dashboard> = new Map();

  /**
   * 获取图表默认配置
   *
   * @param chartType 图表类型
   */
  public static getDefaultConfig(chartType: ChartType): Dashboard {
    // 读取缓存
    let cache = this.configCache.get(chartType);
    if (cache !== undefined) {
      return cache;
    }

    // 合并数据
    let generalData = ObjectUtil.copy(generalDataTemplate),
      // let generalData = generalDataTemplate,
      customData = customDataTemplates[chartType],
      defaultConfig: Dashboard = ObjectUtil.merge(generalData, customData);
    // 设置图表类型
    defaultConfig.visualData.type = chartType;

    // 保存缓存
    this.configCache.set(chartType, defaultConfig);
    return defaultConfig;
  }
}
