import { ChartOption } from "./ChartOption";
import * as baseOption from "./ChartBaseOption";

export interface MapChartOption extends ChartOption, Partial<{
  /**
   * 图表类型
   * 地图
   */
  type: string;

  /**
   * id
   */
  id: string;

  /**
   * name
   * 用于tooltip显示，legend的图例筛选
   * 在setOption 更新数据和配置项时用于指定对应的系列
   */
  name: string;

  /**
   * map 地图类型
   */
  map: string;

  /**
   * 是否 开启鼠标缩放和平移漫游
   * 默认不开启
   * 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
   */
  roam: boolean | string;

  /**
   * 当前视角的中心点，用经纬度表示
   */
  center: any[];

  /**
   * scale地图的长宽比
   */
  aspectScale: number;

  /**
   * 定义定位的左上角以及右下角分别对应的经纬度
   */
  boundingCoords: any[];

  /**
   * 当前视角的缩放比例
   */
  zoom: number;

  /**
   * 滚轮缩放的极限控制
   * 通过min max 最小和最大的缩放值，默认的缩放为1
   */
  scaleLimit: IScaleLimite;

  /**
   * 自定义地图的名称映射
   */
  nameMap: { [key: string]: string };

  /**
   * 针对GeoJSON要素的自定义属性名称
   * 用于关联数据点和 GeoJSON地理要素
   */
  nameProperty: string;

  /**
   * 选中模式，表示是否支持多个选中，默认关闭
   * 字符串 single 表示单选， multiple 表示多选
   */
  selectedMode: boolean | string;

  // 地图区域的多边形 图形样式
  itemStyle: Partial<IItemStyle>;

  // 高亮状态下的多边形和标签样式
  emphasis: {
    label: Partial<baseOption.ILabel>,
    itemStyle: Partial<IItemStyle>;
  }

  // 所有图形的 zlevel 值
  zlevel: number;

  // 组件所有图形的z值
  z: number;

  left: string | number;
  top: string | number;
  right: string | number;
  bottom: string | number;

  layoutCenter: Array<number | string>;
  layoutSize: number | string;
  geoIndex: number;

  // 多个拥有相同地图类型的系列会使用同一个地图展示
  mapValueCalculation: string;

  // 在图例相应区域显示图例的颜色标识（系列标识的小圆点），存在 legend 组件时生效。
  showLegendSymbol: boolean;

  seriesLayoutBy: string;

  datasetIndex: number;

  // 图形是否不响应和触发鼠标事件，默认为false
  silent: boolean;

  // 本系列特定的tooltip设定
  // tooltip: {
  //   position: string | Array<number | string> | Function;
  //   formatter: string | Function;
  // }
}>{}

interface IScaleLimite {
  min: number;
  max: number;
}

interface IItemStyle {
  // 地图区域的颜色
  areaColor: string;
  // 图形的颜色
  color: string;
  // 图形的描边颜色
  borderColor: string;
  // 描边宽度
  borderWidth: number;
  // 柱条的描边类型
  borderType: string;
  // 图形阴影的模糊大小
  shadowBlur: number;
  // 阴影颜色
  shadowColor: string;
  // 阴影水平方向上的偏移距离
  shadowOffsetX: number;
  // 阴影垂直方向上的偏移距离
  shadowOffsetY: number;
  // 图形透明度
  opacity: number;
}