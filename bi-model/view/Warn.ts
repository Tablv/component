import ObjectUtil from "glaway-bi-util/ObjectUtil";
import UUID from "glaway-bi-util/UUID";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import { WarnDisplayType, WarnSymbolType } from "glaway-bi-model/enums/WarnType";

export const WARN_DEFAULT_VALUE = "NONE";

/**
 * 预警数据包
 */
export interface WarnDatapack {
  /**
   * 预警配置ID
   */
  id: string;

  /**
   * 预警配置名称
   */
  name: string;

  /**
   * 所属仪表盘ID
   */
  dashboardId: string;

  /**
   * 预警颜色
   */
  warnColor: string;

  /**
   * 预警信息显示类型
   *  - 0: 不显示预警信息
   *  - 1: 在图表右侧显示
   *  - 2: 在鼠标移入时显示 tooltip
   */
  warnDisplayType: WarnDisplayType;

  /**
   * 当前选择度量的预警配置
   */
  appliedConfigId: string;

  /**
   * 所有度量的预警配置
   */
  config: Array<WarnConfig>;
}

/**
 * 预警配置
 */
export interface WarnConfig {
  /**
   * 预警配置ID
   */
  id: string;

  /**
   * 数据包ID
   */
  datapackId: string;

  /**
   * 预警字段
   */
  warnField: {
    /**
     * 字段ID
     */
    id: string;

    /**
     * 字段数据
     */
    data: FieldDTO;
  };

  /**
   * 预警条件
   */
  conditions: Array<WarnCondition>;
}

/**
 * 预警条件
 */
export interface WarnCondition {
  /**
   * 判断符号（大于小于等）
   */
  symbol: WarnSymbolType;

  /**
   * 预警数值
   */
  value: number;
}

/**
 * 构建类
 */
export class WarnBuilder {
  /**
   * 构建 WarnDatapack
   *
   * @param dashboardId 仪表盘ID
   * @param currentLength 当前长度
   * @param currentMeasures 当前度量数据
   */
  public static buildWarnPack(
    dashboardId: string,
    currentLength: number,
    currentMeasures: Array<FieldDTO>
  ): WarnDatapack {
    const serialNo = currentLength + 1,
      datapackId = UUID.generate();

    return {
      id: datapackId,
      name: "预警 " + serialNo,
      dashboardId,
      warnColor: "#FF0000",
      warnDisplayType: WarnDisplayType.ON_CHART,
      appliedConfigId: "",
      config: this.buildWarnConfig(datapackId, currentMeasures)
    };
  }

  /**
   * 构建 WarnConfig
   *
   * @param datapackId 数据包ID
   * @param currentMeasures 当前度量数据
   */
  public static buildWarnConfig(
    datapackId: string,
    currentMeasures: Array<FieldDTO>
  ): Array<WarnConfig> {
    const warnConfig = currentMeasures.map(measure => {
      const configId = UUID.generate();
      return {
        id: configId,
        datapackId,
        warnField: {
          id: measure.id ? measure.id : "",
          data: ObjectUtil.copy(measure)
        },
        conditions: this.buildWarnConditions()
      };
    });

    return warnConfig;
  }

  /**
   * 构建 WarnCondition
   */
  public static buildWarnCondition(): WarnCondition {
    return {
      symbol: WarnSymbolType.GT,
      value: 0
    };
  }

  /**
   * 构建 WarnConditions
   */
  public static buildWarnConditions(): Array<WarnCondition> {
    return [this.buildWarnCondition()];
  }
}
