import ObjectUtil from "glaway-bi-util/ObjectUtil";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import { OrderType } from "glaway-bi-model/enums/OrderType";
import LimitDTO from "glaway-bi-model/params/LimitDTO";
import UUID from "glaway-bi-util/UUID";

export const LIMIT_DEFAULT_VALUE = "NONE";

/**
 * 排名数据包
 */
export interface LimitDatapack {
  /**
   * 排名配置ID
   */
  id: string;

  /**
   * 排名配置名称
   */
  name: string;

  /**
   * 所属仪表盘ID
   */
  dashboardId: string;

  /**
   * 排名配置
   */
  config: LimitConfig;
}

/**
 * 排名配置
 */
export interface LimitConfig {
  /**
   * 排名配置ID
   */
  id: string;

  /**
   * 数据包ID
   */
  datapackId: string;


  orderData: Array<ResultLimit>;

  limit: string;

  order: ResultLimit;

}


export interface ResultLimit {
  /**
   * 字段数据
   */
  fieldData: FieldDTO;

  /**
   * order 类型
   */
  orderType: OrderType;
}


export interface ResultOrder {
  /**
   * 字段数据
   */
  fieldData: FieldDTO;

  /**
   * order 类型
   */
  orderType: OrderType;
}



/**
 * 构建类
 */
export class LimitBuilder {
  /**
   * 构建 LimitDatapack
   *
   * @param dashboardId 仪表盘ID
   * @param currentLength 当前长度
   * @param currentMeasures 当前度量数据
   * @param limitNumber 当前limit数量
   */
  public static buildLimitPack(
    dashboardId: string,
    currentLength: number,
    currentMeasures: Array<FieldDTO>,
    limitNumber: string,
  ): LimitDatapack {
    const serialNo = currentLength + 1,
      datapackId = UUID.generate();

    return {
      id: datapackId,
      name: "排名 " + serialNo,
      dashboardId,
      config: this.buildLimitConfig(datapackId, currentMeasures, limitNumber)
    };
  }

  /**
   * 构建 LimitConfig
   *
   * @param datapackId 数据包ID
   * @param currentMeasures 当前度量数据
   */
  public static buildLimitConfig(
    datapackId: string,
    currentMeasures: Array<FieldDTO>,
    limit: string
  ): LimitConfig {
    const configId = UUID.generate();

    return {
      id: configId,
      datapackId,
      orderData: this.buildResultOrders(currentMeasures),
      limit,
      order: this.buildResultOrders(currentMeasures)[0] || null
    };
  }

  /**
   * 构建 ResultLimit
   * @param measures 当前度量数据
   */
  public static buildResultOrders(
    measures: Array<FieldDTO>
  ): Array<ResultOrder> {
    return measures.map(measure => {
      return {
       fieldData: ObjectUtil.copy(measure),
       orderType: OrderType.ASC
     }
    })
  }

  public static buildLimitByResult(resultList: ResultLimit, limit: string): LimitDTO | null {
    const limitDTO: LimitDTO = {
      alias: resultList.fieldData.alias,
      sort: resultList.orderType,
      limit
    }
    return limitDTO;
  }

}
