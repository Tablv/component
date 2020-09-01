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
import EChartsOption from "glaway-bi-model/view/dashboard/chart/EChartsOption";

export default class GEOHandler {
  /**
   * @function 获取地图组件
   */
  public static getGEO(echarts: EChartsOption): GEO {
    const geoEvent: GEO = echarts.geo as GEO;
    const mapList = geoEvent.mapList as Array<string>;
    let geo: GEO = {
      id: 0,
      map: mapList[mapList.length - 1],
      // 宽高比
      aspectScale: 0.75,
      zoom: 1.2
      // zoom: geoEvent.zoom,
      // itemStyle: geoEvent.itemStyle
    };
    return geo;
  }
}
