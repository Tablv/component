import { PieChartOption } from "./ChartOption";

export interface GaugeChartOption extends PieChartOption, Partial<{
  /**
   * 组件 ID
   */
  id: string;

  /**
   * 系列名称
   */
  name: string;

  /**
   * 仪表盘标题。
   */
  title: Partial<{
    show: boolean;
    offsetCenter: Array<string | number>;
  }> & Partial<Itext>;

  /**
   * 仪表盘半径
   */
  radius: string;

  /**
   * 是否启用图例 hover 时的联动高亮。
   */
  legendHoverLink: boolean;
  /**
   * 仪表盘刻度是否是顺时针增长。
   */
  clockwise: boolean;

   /**
   * 数据最小值
   */
  min: number;

  /**
   * 数据最大值
   */
  max: number;

  detail: { 
    show: boolean;
  } & Partial<Itext>;

  /**
   * 仪表盘刻度的分割段数。
   */
  splitNumber: number;

  /**
   * 分隔线样式。
   */
  splitLine: {
    show: boolean;
    length: string;
    lineStyle: Partial<IlineStyle>;
  };

  /**
   * 仪表盘轴线相关配置。
   */
  axisLine: {
    show: boolean;
    lineStyle: Partial<IlineStyle>;
  }
  
  /**
   * 仪表盘指针。
   */
  pointer: {
    show: boolean;
    length: number;
    width: number;
  };

  /**
   * 刻度样式。
   */
  axisTick: {
    show: boolean;
    splitNumber?: number;
    length?: number;
    lineStyle?: Partial<IlineStyle>;
  };

  axisLabel: Partial<{
    show: boolean;
    distance: number;
    formatter: string | Function;
    opacity: number;
  }> & Partial<Itext>;

  /**
   * 仪表盘结束角度
   */
  endAngle: number;

  /**
   * 仪表盘起始角度
   */
  startAngle: number;
}> {};

interface Itext {
  color: string;
  fontStyle: string;
  fontWeight: string | number;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  backgroundColor: string | object;
  borderColor: string;
  borderWidth: number;
  borderRadius: number | number[];
  padding: number | number[];
  shadowColor: string;
  shadowBlur: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  width: string | number;
  height: string | number;
  textBorderColor: string;
  textBorderWidth: number;
  textShadowColor: string;
  textShadowBlur: string;
  textShadowOffsetX: number;
  textShadowOffsetY: number;
  rich: object;
}

interface IlineStyle {
  color: string;
  width: number;
  type: string;
  shadowBlur: string;
  shadowColor: string;
  shadowOffsetX: number;
  shadowOffsetY: number;
  opacity: number;
}