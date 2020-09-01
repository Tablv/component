/**
 * 地理坐标系组件
 * 
 * {
    componentType: 'geo',
    // Geo 组件在 option 中的 index
    geoIndex: number,
    // 点击区域的名称，比如"上海"
    name: string,
    // 传入的点击区域的 region 对象，见 geo.regions
    region: Object
  }
 * 
 */
import * as baseOption from "glaway-bi-model/view/dashboard/chart/ChartBaseOption";

export interface GEO
  extends Partial<{
    /**
     * id
     */
    id: string | number;

    show: boolean;

    /**
     * map 地图类型
     */
    map: string;

    mapList: string[];

    /**
     * 是否 开启鼠标缩放和平移漫游
     * 默认不开启
     * 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
     */
    roam: boolean | ERoam;

    /**
     * 当前视角的中心点，用经纬度表示
     */
    center: number[];

    /**
     * scale地图的长宽比
     */
    aspectScale: number;

    /**
     * 定义定位的左上角以及右下角分别对应的经纬度
     */
    boundingCoords: Array<Array<number>>;

    /**
     * 当前视角的缩放比例
     */
    zoom: number;

    /**
     * 滚轮缩放的极限控制
     * 通过min max 最小和最大的缩放值，默认的缩放为1
     */
    scaleLimit: {
      min: number;
      max: number;
    };

    /**
     * 自定义地图的名称映射
     */
    nameMap: Map<string, string>;

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

    label: Partial<baseOption.ILabel>;

    // 地图区域的多边形 图形样式
    itemStyle: Partial<IItemStyle>;

    // 高亮状态下的多边形和标签样式
    emphasis: Partial<{
      label: Partial<baseOption.ILabel>;
      itemStyle: Partial<IItemStyle>;
    }>;

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

    // 图形是否不响应和触发鼠标事件，默认为false
    silent: boolean;

    /**
     * regions
     */
    regions: {
      name: string;
      selected: boolean;
      itemStyle: Partial<IItemStyle>;
      label: Partial<baseOption.ILabel>;
      // 高亮状态下的多边形和标签样式
      emphasis: {
        label: Partial<baseOption.ILabel>;
        itemStyle: Partial<IItemStyle>;
      };
    };
  }> {}

enum ERoam {
  scale = "scale",
  move = "move"
}

interface IItemStyle {
  // 地图区域的颜色
  areaColor: string | Object;
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
