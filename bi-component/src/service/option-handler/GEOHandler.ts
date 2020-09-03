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

import { GEO } from "@/interfaces/options/GEO";
import EChartsOption, {
  EChartsSampleStyle
} from "glaway-bi-model/view/dashboard/chart/EChartsOption";
import { ChartType } from "glaway-bi-model/enums/ChartType";

export default class GEOHandler {
  /**
   * @function 获取地图组件
   */
  public static getGEO(echarts: EChartsOption): GEO {
    const geoEvent: GEO = echarts.geo as GEO;
    const mapList = geoEvent.mapList as Array<string>;
    let geo: GEO = {
      show: geoEvent.show,
      map: mapList[mapList.length - 1],
      // 宽高比
      aspectScale: <number>geoEvent.aspectScale / 100,
      zoom: <number>geoEvent.zoom,
      layoutCenter: geoEvent.layoutCenter,
      layoutSize: 100,
      itemStyle: geoEvent.itemStyle
    };
    return geo;
  }
}
