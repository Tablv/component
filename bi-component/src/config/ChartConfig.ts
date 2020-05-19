import { ChartType } from "glaway-bi-model/enums/ChartType";
import BarConfig from "./chart-config/Bar";
import BarStackConfig from "./chart-config/BarStack";
import BarPercentageConfig from "./chart-config/BarPercentage";
import HBarConfig from "./chart-config/HBar";
import HBarStackConfig from "./chart-config/HBarStack";
import LineConfig from "./chart-config/Line";
import PieConfig from "./chart-config/Pie";
import RPieConfig from "./chart-config/RPie";
import RosePieConfig from "./chart-config/RosePie";
import SunPieConfig from "./chart-config/SunPie";
import RadarConfig from "./chart-config/Radar";
import BiaxialConfig from "./chart-config/Biaxial";
import HBarPercentageConfig from "./chart-config/HBarPercentage";
import GuageConfig from "./chart-config/Gauge";
import TargetPieConfig from "./chart-config/TargetPie";

/**
 * 图表全部配置项
 */
export type ChartConfigItem = {
  /**
   * 图表样式模板
   */
  templates: any;

  /**
   * 图表菜单选项
   */
  menuOptions: any;

  /**
   * 创建菜单配置
   */
  createMenuConfig?: CreateMenuConfig;

  /**
   * 图表配置项
   */
  config: any;
};

/**
 * 创建菜单配置
 */
export type CreateMenuConfig = {
  iconClass: string;
  title: string;
  createType: ChartType;
  enable: boolean;
};

export default class ChartConfig {
  /**
   * 图表配置映射类
   */
  public static chartConfigMap: { [chartType: string]: ChartConfigItem } = {
    /**
     * 柱图部分
     */

    // 柱图
    bar: BarConfig,

    // 堆积柱图
    barStack: BarStackConfig,

    // 百分比堆积柱图
    barPercentage: BarPercentageConfig,

    // 条图
    hbar: HBarConfig,

    // 堆积条图
    hbarStack: HBarStackConfig,

    // 百分比堆积条图
    hbarPercentage: HBarPercentageConfig,

    /**
     * 饼图
     */
    pie: PieConfig,

    /**
     * 环形图
     */
    rpie: RPieConfig,

    /**
     * 玫瑰图
     */
    rosepie: RosePieConfig,

    /**
     * 旭日图
     */
    sunpie: SunPieConfig,

    /**
     * 雷达图
     */
    radar: RadarConfig,

    /**
     * 线图
     */
    line: LineConfig,

    /**
     * 组合图
     */
    biaxial: BiaxialConfig,

    /**
     * 仪表盘
     */
    guage: GuageConfig,

    /**
     * 指示器
     */
    targetpie: TargetPieConfig
  };

  /**
   * 获取样式模板
   *
   * @param chartType 图表类型
   */
  public static getTemplates(chartType: ChartType) {
    return this.chartConfigMap[chartType].templates;
  }

  /**
   * 获取菜单选项
   *
   * @param chartType 图表类型
   */
  public static getMenuOptions(chartType: ChartType) {
    return this.chartConfigMap[chartType].menuOptions;
  }

  /**
   * 获取图表配置
   *
   * @param chartType 图表类型
   */
  public static getConfig(chartType: ChartType) {
    return this.chartConfigMap[chartType].menuOptions;
  }

  /**
   * 获取所有样式模板
   */
  public static getAllTemplates() {
    return this.getSpecificMap("templates");
  }

  /**
   * 获取所有菜单选项
   */
  public static getAllMenuOptions() {
    return this.getSpecificMap("menuOptions");
  }

  /**
   * 获取所有菜单选项
   */
  public static getAllCreateMenuConfig(): Array<CreateMenuConfig> {
    return Object.values(this.chartConfigMap)
      .map(chartConfig => chartConfig.createMenuConfig)
      .filter(menuConfig => !!menuConfig) as Array<CreateMenuConfig>;
  }

  /**
   * 获取所有图表配置
   */
  public static getAllConfig() {
    return this.getSpecificMap("config");
  }

  /**
   * 获取指定属性的字典对象
   */
  private static getSpecificMap(propertyName: string) {
    return Object.entries(this.chartConfigMap).reduce(
      (resultMap: any, configEntries: any) => {
        const chartType = configEntries[0];
        const chartConfig = (configEntries[1] as any)[propertyName];

        // 不为空，添加到字典对象
        if (chartConfig) {
          resultMap[chartType] = chartConfig;
        }

        return resultMap;
      },
      {}
    );
  }
}
