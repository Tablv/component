import { SeriesOption } from "./SeriesOption";
import * as baseOption from "./ChartBaseOption";

export interface GaugeSeriesOption extends SeriesOption, Partial<{
  type: string;

  /**
   * 组件 ID
   */
  id: string;

  /**
   * 系列名称
   */
  name: string;

  /**
   * 仪表盘半径
   */
  radius: string | number;

  /**
   * 仪表盘的中心（圆心）坐标
   */
  center: Array<string | number | baseOption.IValueUnit>;

  /**
   * 是否启用图例hover时的联动高亮
   */
  legendHoverLink: boolean;

  /**
   * 仪表盘结束角度
   */
  endAngle: number;

  /**
   * 仪表盘起始角度
   */
  startAngle: number;
  
  /**
   * 仪表盘刻度是否是顺时针增长。
   */
  clockwise: boolean;

  
  data: any;

  /**
   * 数据最小值
   */
  min: number;

  /**
   * 数据最大值
   */
  max: number;
  
  /**
   * 仪表盘刻度的分割段数
   */
  splitNumber: number;

  /**
   * 仪表盘轴线相关配置
   */
  axisLine: {
    show: boolean;
    lineStyle: Partial<IlineStyle>;
  }

  /**
   * 分隔线样式
   */
  splitLine: {
    show: boolean;
    length: string;
    lineStyle: Partial<IlineStyle>;
  };

  /**
   * 刻度样式
   */
  axisTick: {
    show: boolean;
    splitNumber?: number;
    length?: number;
    lineStyle?: Partial<IlineStyle>;
  };

  /**
   * 刻度标签
   */
  axisLabel: Partial<{
    distance: number;
    formatter: string | Function;
    opacity: number;
  }> & Partial<baseOption.ItextStyle>;
  
  /**
   * 仪表盘指针
   */
  pointer: {
    show: boolean;
    length: number;
    width: number;
  };

  /**
   * 仪表盘指针样式
   */
  itemStyle: Partial<{
    opacity: number;
  } & baseOption.IBorder & baseOption.IShadow>;
  
  /**
   * 仪表盘标题。
   */
  title: Partial<{
    offsetCenter: Array<string | number>;
  }> & Partial<baseOption.ItextStyle>;


  detail: Partial<baseOption.ItextStyle>;

  silent: boolean;

  /**
   * 提示信息
   */
  tooltip: Partial<{
    position: string | Array<number | string> | Function;
    formatter: string | Function;
    backgroundColor: string;
    padding: number | number[];
    extraCssText: string;
    textStyle: Partial<{
      lineHeight: number;
      width: number;
      height: number;
    } & baseOption.IFont & baseOption.ITextShadow>;
  } & baseOption.IBorder>;

  /**
   * 
   */
  centerConfig: {
    xAxias: string;
    yAxias: string;
  };

  /**
   * 
   */
  radiusConfig: {
    inside: string | number;
    outside: string | number;
    axisLineWidth: string | number;
  };
  
}> {};

interface IlineStyle extends baseOption.IShadow {
  color: any[];
  width: number;
  type: string;
  opacity: number;
}