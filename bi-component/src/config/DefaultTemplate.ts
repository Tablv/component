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
  grid: [10, 10],
  canvasSetting: {
    background: {
      show: true,
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
    joinRelation: [],
    where: [],
    order: [],
    isReact: false,
    fromTable: null,
    viewName: "",
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
  tableView: {
    fromTable: null,
    viewName: ""
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
    width: 400,
    height: 300,
    background: {
      enable: true,
      props: {
        type: BackgroundType.color,
        color: "#fff",
        url: ""
      }
    },
    border: {
      enable: false,
      props: {
        width: 1,
        style: "solid",
        color: "#000",
        radius: 0
      }
    },
    shadow: {
      enable: false,
      props: {
        h: 0,
        v: 0,
        blur: 10,
        spread: 0,
        color: "#00000033"
      }
    }
  },
  tasks: {
    ratotionEnable: false,
    ratotionNumb: 5,
    ratotionId: null
  },
  newCreated: true,
  echarts: {
    sampleStyle: {
      global: {}
    },
    animation: false,
    /**
     * 标题
     */
    title: {
      show: true,
      text: "图表",
      left: "left",
      right: 0,
      padding: [5, 5, 5, 5],
      textStyle: {
        color: "#000",
        fontFamily: "Microsoft YaHei",
        fontSize: 18
      }
    },
    /**
     * 图例
     */
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
    series: []
  }
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

    // 合并配置
    let generalData = ObjectUtil.copy(generalDataTemplate),
      // 自定义配置
      customData = customDataTemplates[chartType],
      // 合并后的默认配置
      defaultConfig: Dashboard = ObjectUtil.merge(generalData, customData);

    // 设置图表类型
    defaultConfig.visualData.type = chartType;

    // 保存缓存
    this.configCache.set(chartType, defaultConfig);
    return defaultConfig;
  }
}
