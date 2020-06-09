import ObjectUtil from "glaway-bi-util/ObjectUtil";
import FieldDTO from "glaway-bi-model/params/FieldDTO";
import { SortType } from "glaway-bi-model/enums/SortType";
import { OrderType } from "glaway-bi-model/enums/OrderType";
import TableInfoVO from "glaway-bi-model/results/TableInfoVO";
import OrderDTO from "glaway-bi-model/params/OrderDTO";
import UUID from "glaway-bi-util/UUID";

export const SORT_DEFAULT_VALUE = "NONE";

/**
 * 排序数据包
 */
export interface SortDatapack {
  /**
   * 排序配置ID
   */
  id: string;

  /**
   * 排序配置名称
   */
  name: string;

  /**
   * 所属仪表盘ID
   */
  dashboardId: string;

  /**
   * 排序配置
   */
  config: SortConfig;
}

/**
 * 排序配置
 */
export interface SortConfig {
  /**
   * 排序配置ID
   */
  id: string;

  /**
   * 数据包ID
   */
  datapackId: string;

  /**
   * 排序类型
   */
  type: SortType;

  /**
   * 计算结果
   */
  data: Array<ResultOrder> | Array<CustomField>;

  /**
   * 自定义顺序
   */
  custom: CustomOrder | null;

}

/**
 * 计算结果
 */
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
 * 自定义字段
 */
export interface CustomField {
  /**
   * 字段ID
   */
  fieldId: string;

  /**
   * 字段数据
   */
  fieldData: TableInfoVO | null;

  /**
   * order 类型
   */
  orderType: OrderType;
}

/**
 * 自定义顺序
 */
export interface CustomOrder {
  /**
   * 字段ID
   */
  fieldId: string;

  /**
   * 字段数据
   */
  fieldData: TableInfoVO | null;

  /**
   * 引用数据
   */
  refData: Array<string>;
}

/**
 * 构建类
 */
export class SortBuilder {
  /**
   * 构建 SortDatapack
   *
   * @param dashboardId 仪表盘ID
   * @param currentLength 当前长度
   * @param currentMeasures 当前度量数据
   */
  public static buildSortPack(
    dashboardId: string,
    currentLength: number,
    currentMeasures: Array<FieldDTO>
  ): SortDatapack {
    const serialNo = currentLength + 1,
      datapackId = UUID.generate();

    return {
      id: datapackId,
      name: "排序 " + serialNo,
      dashboardId,
      config: this.buildSortConfig(datapackId, currentMeasures)
    };
  }

  /**
   * 构建 SortConfig
   *
   * @param datapackId 数据包ID
   * @param currentMeasures 当前度量数据
   */
  public static buildSortConfig(
    datapackId: string,
    currentMeasures: Array<FieldDTO>
  ): SortConfig {
    const configId = UUID.generate();

    return {
      id: configId,
      datapackId,
      type: SortType.result,
      data: this.buildResultOrders(currentMeasures),
      custom: this.buildCustomOrder()
    };
  }

  /**
   * 构建 ResultOrder
   * @param measures 当前度量数据
   */
  public static buildResultOrders(
    measures: Array<FieldDTO>
  ): Array<ResultOrder> {
    const resultOrders = measures.map(measure =>
      this.buildResultOrder(measure)
    );
    return resultOrders;
  }

  /**
   * 通过字段 构建计算结果排序
   *
   * @param field 字段VO
   */
  private static buildResultOrder(field: FieldDTO): ResultOrder {
    return {
      fieldData: ObjectUtil.copy(field),
      orderType: OrderType.ASC
    };
  }

  /**
   * 构建 CustomField
   */
  public static buildCustomField(): CustomField {
    return {
      fieldId: "",
      fieldData: null,
      orderType: OrderType.ASC
    };
  }

  /**
   * 构建 CustomOrder
   */
  public static buildCustomOrder(): CustomOrder {
    return {
      fieldId: "",
      fieldData: null,
      refData: []
    };
  }

  /**
   * 通过 ResultOrder 构建 WhereDTO
   */
  public static buildOrderByResult(resultOrder: ResultOrder): OrderDTO | null {
    const orderDTO: OrderDTO = {
      alias: resultOrder.fieldData.alias,
      sort: resultOrder.orderType
    };
    return orderDTO;
  }

  /**
   * 通过 ResultOrder 构建 WhereDTO
   */
  public static buildOrderByCustomField(
    customField: CustomField
  ): OrderDTO | null {
    if (!customField.fieldData) return null;

    const tableInfo = customField.fieldData,
      orderDTO: OrderDTO = {
        tableAlias: tableInfo.tableAlias,
        columnName: tableInfo.columnName,
        sort: customField.orderType
      };
    return orderDTO;
  }
}
