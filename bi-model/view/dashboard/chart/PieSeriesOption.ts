import { SeriesOption } from "./SeriesOption";
import * as baseOption from "./ChartBaseOption";

export interface PieSeriesOption extends SeriesOption, Partial<{
  /**
   * 组件id
   */
  id: string;

  /**
   * 系列名称
   */
  name: string;

  /**
   * 是否启用图例hover的联动高亮
   */
  legendHoverLink: boolean;

  /**
   * 是否开启 hover 在扇区上的放大动画效果
   */
  hoverAnimation: boolean;

  /**
   * 高亮扇区的偏移距离
   */
  hoverOffset: number;

  /**
   * 选中模式，表示是否支持多个选中，默认关闭
   */
  selectedMode: boolean | string;

  /**
   * 选中扇区的偏移距离
   */
  selectedOffset: number;

  /**
   * 饼图的扇区是否是顺时针排布
   */
  clockwise: boolean;

  /**
   * 起始角度，支持范围[0, 360]
   */
  startAngle: number;

  /**
   * 最小的扇区角度（0 ~ 360）
   */
  minAngle: number;

  /**
   * 小于这个角度（0 ~ 360）的扇区
   * 不显示标签（label 和 labelLine）
   */
  minShowLabelAngle: number;

  /**
   * 是否展示成南丁格尔图，通过半径区分数据大小
   * 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小
   * 'area' 所有扇区圆心角相同，仅通过半径展现数据大小
   */
  roseType: boolean | string;

  /**
   * 是否启用防止标签重叠策略，默认开启
   * 例如圆环图中需要强制所有标签放在中心位置，可以将该值设为 false
   */
  avoidLabelOverlap: boolean;

  /**
   * 是否在数据和为0（一般情况下所有数据为0） 的时候不显示扇区
   */
  stillShowZeroSum: boolean;

  /**
   * 鼠标悬浮时在图形元素上时鼠标的样式是什么
   * 同 CSS 的 cursor
   */
  cursor: string;

  /**
   * 所有图形的 zlevel 值
   * zlevel用于 Canvas 分层
   * 不同zlevel值的图形会放置在不同的 Canvas 中
   * Canvas 分层是一种常见的优化手段
   * zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面
   */
  zlevel: number;

  /**
   * 组件的所有图形的z值
   * 控制图形的前后顺序
   * z值小的图形会被z值大的图形覆盖
   * z相比zlevel优先级更低，而且不会创建新的 Canvas
   */
  x: number;

  /**
   * 漏斗图组件离容器左侧的距离。
   */
  left: number | string;

  /**
   * 组件离容器上侧的距离
   */
  top: number | string;

  /**
   * 组件离容器右侧的距离。
   */
  right: number | string;

  /**
   * 组件离容器下侧的距离
   */
  bottom: number | string;

  /**
   * 组件的宽度
   * 默认自适应。
   */
  width: string | number;

  /**
   * 漏斗图组件的高度
   * 默认自适应
   */
  height: string | number;

  /**
   * 饼图图形上的文本标签
   */
  lable: Partial<{
    show: boolean;

    position: baseOption.EPosition;

    formatter: string | Function;

    /**
     * 标签旋转
     * 如果为 true，则为径向排布
     * 如果为 number ，旋转指定角度
     * 从 -90 度到 90 度。正值是逆时针
     */
    rotate: boolean | number;
    
    align: baseOption.EAlign;

    verticalAlign: baseOption.EVerticalAlign;

    lineHeight: number;

    backgroundColor: string; // object放弃

    padding: number | number[];

    width: number | string;

    height: number | string;

    rich: object;
  } & baseOption.IFont & baseOption.IBorder & baseOption.ITextBorder & baseOption.ITextShadow & baseOption.IShadow>;

  /**
   * 标签的视觉引导线样式
   */
  labelLine: Partial<{
    show: boolean;
    length: number;
    length2: number;
    smooth: boolean | number;
    lineStyle: Partial<{
      color: string;
      width: number;
      type: baseOption.ELineType;
    } & baseOption.IShadow>
  }>;

  /**
   * 图形样式
   */
  lineStyle: Partial<{
    color: string;
    opacity: number;
  } & baseOption.IBorder & baseOption.IShadow>;

  /**
   * 饼图的中心（圆心）坐标
   */
  center: Array<string | number | {
    value: number | string,
    unit: string;
  }>;

  /**
   * 饼图的半径
   */
  radius: number | string | Array<string | number>;
   
  /**
   * 指定 dataset 中用行还是列对应到系列上
   */
  seriesLayoutBy: baseOption.ESeriesLayoutBy;

  /**
   * 指定本系列使用那个 dataset
   */
  datasetIndex: number;

  /**
   * 定义 series.data 或者 dataset.source 的每个维度的信息
   */
  dimensions: any[];

  /**
   * 定义 data 的哪个维度被编码成什么
   */
  encode: any[];

  data: Array<Partial<{
    name: string;
    value: string;
    selected: boolean;
    lable: PieSeriesOption["label"];
    labelLine: PieSeriesOption["labelLine"];
    itemStyle: PieSeriesOption["lineStyle"];
    tooltip: PieSeriesOption["tooltip"];
  }>>;

  /**
   * 提示信息
   */
  tooltip: Partial<{
    position: string | Array<number | string> | Function;
    formatter: string | Function;
    backgroundColor: string;
    padding: number | number[];
    textStyle: Partial<{
      lineHeight: number;
      width: number;
      height: number;
    } & baseOption.IFont & baseOption.ITextShadow>;
    extraCssText: string;
  } & baseOption.IBorder>;

  /**
   * 图形是否不响应和触发鼠标事件
   */
  silent: boolean;

  barWidth: number;
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
}> {
  type: string;
}