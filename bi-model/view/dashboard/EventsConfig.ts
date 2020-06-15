import { TriggerMethod, TriggerEvent } from "glaway-bi-model/enums/ChartEvents";

/**
 * 事件配置
 */
export default interface EventsConfig {
  /**
   * 触发方式
   */
  triggerMethod: TriggerMethod;

  /**
   * 触发事件
   */
  triggerEvent: TriggerEvent;

  /**
   * 触发事件选项
   */
  eventOptions: EventOptions;

}

/**
 * 触发事件选项
 */
export interface EventOptions {
  /**
   * 联动
   */
  react?: {};

  /**
   * 弹框
   */
  pop?: {
    url: string;
  };

  /**
   * 穿透(跳转页面)
   */
  jump?: {
    url: string;
  };
}
