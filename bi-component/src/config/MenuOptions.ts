import ObjectUtil from "glaway-bi-util/ObjectUtil";
import { ChartType } from "glaway-bi-model/enums/ChartType";
import { ComparableSymbol } from "glaway-bi-model/enums/ComparableSymbol";
import ChartConfig from "./ChartConfig";

/**
 * 菜单通用可选配置
 */
export const generalMenuOptions: any = {
  title: {
    size: {
      selection: [
        { text: "16", value: 16 },
        { text: "17", value: 17 },
        { text: "18", value: 18 },
        { text: "19", value: 19 },
        { text: "20", value: 20 },
        { text: "21", value: 21 },
        { text: "22", value: 22 }
      ]
    },
    fontFamily: {
      selection: [
        { text: "微软雅黑", value: "Microsoft YaHei" },
        { text: "黑体", value: "SimHei" },
        { text: "宋体", value: "SimSun" }
      ]
    },
    left: {
      selection: [
        { text: "左", value: "left" },
        { text: "中", value: "center" },
        { text: "右", value: "right" }
      ]
    },
    color: {
      selection: [
        { text: "黑色", value: "#000" },
        { text: "红色", value: "#f00" },
        { text: "绿色", value: "#0f0" },
        { text: "蓝色", value: "#00f" }
      ]
    }
  },
  color: {
    selection: [
      {
        name: "默认",
        colors: [
          "#118DFF",
          "#12239E",
          "#E66C37",
          "#6B007B",
          "#E044A7",
          "#744EC2",
          "#D9B300",
          "#D64550"
        ]
      },
      {
        name: "高层建筑",
        colors: [
          "#499195",
          "#00acfc",
          "#c4b07b",
          "#f18f49",
          "#326633",
          "#f1c716",
          "#d8d7bf",
          "#224624"
        ]
      },
      {
        name: "主管",
        colors: [
          "#3257a8",
          "#37a794",
          "#8b3d88",
          "#de657a",
          "#6b91c9",
          "#f5c869",
          "#77c4a8",
          "#dfa5cf"
        ]
      },
      {
        name: "边界",
        colors: [
          "#426871",
          "#d2b04c",
          "#a3623a",
          "#c25a3d",
          "#c39b6a",
          "#016e51",
          "#bebbb7",
          "#ffa500"
        ]
      },
      {
        name: "创新",
        colors: [
          "#70b0e0",
          "#fcb714",
          "#2878bd",
          "#0eb194",
          "#108372",
          "#af916d",
          "#c4b07b",
          "#f15628"
        ]
      },
      {
        name: "开花",
        colors: [
          "#8250c4",
          "#5ecbc8",
          "#438fff",
          "#ff977e",
          "#eb5757",
          "#5b2071",
          "#ec5a96",
          "#a43b76"
        ]
      }
    ]
  },
  grid: {
    unit: {
      selection: [
        { text: "px", value: "" },
        { text: "%", value: "%" }
      ]
    }
  },
  legend: {
    orient: {
      selection: [
        { text: "水平方向", value: "horizontal" },
        { text: "垂直方向", value: "vertical" }
      ]
    },
    fontSize: {
      selection: [
        { text: "10", value: 10 },
        { text: "11", value: 11 },
        { text: "12", value: 12 },
        { text: "13", value: 13 },
        { text: "14", value: 14 },
        { text: "15", value: 15 }
      ]
    }
  },
  events: {
    method: {
      selection: [
        { text: "无", value: "" },
        { text: "单击", value: "click" },
        { text: "双击", value: "dblclick" },
        { text: "鼠标按下", value: "mousedown" },
        { text: "鼠标移动", value: "mousemove" },
        { text: "鼠标按下后抬起", value: "mouseup" },
        { text: "鼠标移入", value: "mouseover" },
        { text: "鼠标移出", value: "mouseout" }
      ]
    },
    event: {
      selection: [
        { text: "无", value: "" },
        { text: "联动", value: "react" },
        { text: "弹框", value: "pop" },
        { text: "穿透", value: "jump" }
      ]
    }
  },
  label: {
    size: {
      selection: [
        { text: "12", value: 12 },
        { text: "13", value: 13 },
        { text: "14", value: 14 },
        { text: "15", value: 15 },
        { text: "16", value: 16 },
        { text: "17", value: 17 },
        { text: "18", value: 18 }
      ]
    },
    fontFamily: {
      selection: [
        { text: "微软雅黑", value: "Microsoft YaHei" },
        { text: "黑体", value: "SimHei" },
        { text: "宋体", value: "SimSun" }
      ]
    },
    color: {
      selection: [
        { text: "黑色", value: "#000" },
        { text: "红色", value: "#f00" },
        { text: "绿色", value: "#0f0" },
        { text: "蓝色", value: "#00f" }
      ]
    },
    position: {
      selection: [
        { text: "顶部", value: "top" },
        { text: "内部", value: "inside" }
      ]
    }
  }
};

/**
 * 各类型图表额外可选配置
 */
export const customMenuOptions: any = ChartConfig.getAllMenuOptions();

/**
 * 各类型图表的功能配置
 *  - 定义是否可预警、是否为双度量、图表切换条件等
 */
export const customChartFunctionalOptions: ChartFunctionalOptions = ChartConfig.getAllConfig();

/**
 * 初始化模板类
 */
export default class MenuOptions {
  /**
   * 选项缓存
   */
  private static optionCache: Map<ChartType, any> = new Map();

  /**
   * 获取指定图表类型的样式配置
   *
   * @param chartType 图表类型
   */
  public static getChartStyleOptions(chartType: ChartType): any {
    // 读取缓存
    let cache = this.optionCache.get(chartType);
    if (cache !== undefined) {
      return cache;
    }

    // 合并选项
    let generalOptions = generalMenuOptions,
      customOptions = customMenuOptions[chartType],
      options = ObjectUtil.merge(customOptions, generalOptions);

    // 保存缓存
    this.optionCache.set(chartType, options);

    return options;
  }

  /**
   * 获取指定图表类型的功能配置
   *
   * @param chartType 图表类型
   */
  public static getChartFunctionalOptions(chartType: ChartType): any {
    return customChartFunctionalOptions[chartType];
  }
}

/**
 * 图表功能性配置项集合
 *  - 数据格式：
 *     {
 *       bar: {},
 *       pie: {}
 *     }
 */
export type ChartFunctionalOptions = {
  [key: string]: ChartFunctionalOption;
};

/**
 * 各个图表功能性配置项
 */
export type ChartFunctionalOption = {
  /**
   * 是否可预警
   *  - 未定义时为 不可预警
   */
  warnable?: boolean;

  /**
   * 是否为双度量
   *  - 未定义时为单度量
   */
  doubleMeasures?: boolean;

  /**
   * 图表切换功能
   *  - 切换到该图表的限制条件
   *  - 为数组形式，各数组为 OR 关系，满足其一即可切换
   */
  changeLimit: Array<{
    // 维度、度量条件为 AND
    /**
     * 维度条件
     *  - 为数组形式，各数组为 AND 关系，必须满足所有判断
     */
    dimensions: Array<{
      symbol: ComparableSymbol;
      value: number;
    }>;
    /**
     * 度量条件
     *  - 为数组形式，各数组为 AND 关系，必须满足所有判断
     */
    measures: Array<{
      symbol: ComparableSymbol;
      value: number;
    }>;
  }>;
};
