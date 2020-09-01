import { MapSeriesOption } from "glaway-bi-model/view/dashboard/chart/MapSeriesOption";
import { GEO } from "@/interfaces/options/GEO";

export default class GEOHandler {
  /**
   * @function 获取地图组件
   */
  public static getGEO(sampleStyle: MapSeriesOption): GEO {
    const mapList = sampleStyle.mapList as Array<string>;
    let geo: GEO = {
      id: 0,
      map: mapList[mapList.length - 1],
      // 宽高比
      aspectScale: 0.75,
      zoom: 1.2,
      itemStyle: {
        // 渐变色
        areaColor: {
          type: "radial",
          x: 1,
          y: 1,
          x2: 0,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#abcdef" // 0% 处的颜色
            },
            {
              offset: 0.5,
              color: "#123456" // 50% 处的颜色
            },
            {
              offset: 1,
              color: "#abcdef" // 100% 处的颜色
            }
          ],
          global: true // 缺省为 false
        }
      },
      // 高亮
      emphasis: {
        itemStyle: {
          areaColor: "red"
        }
      }
    };
    return geo;
  }
}
