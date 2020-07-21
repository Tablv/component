import { TerminalType, BackgroundType } from "glaway-bi-model/enums/DashboardSet";

/**
 * 仪表盘集 数据模型
 */
export default interface DashboardSet {
  /**
   * 终端类型
   */
  terminalType: TerminalType;

  /**
   * 宽度比例
   */
  widthRatio: number;

  /**
   * 高度比例
   */
  heightRatio: number;

  /**
   * 画布设置
   */
  canvasSetting: {
    background: {
      show: boolean,
      type: BackgroundType;
      color: string; // color: HEX-Color-Value
      url: string; // url: IMG-URL
    };
  };

  /**
   * 临时参数
   */
  tempParams: {
    ratio: number;
    zoom: number;
  };
}
