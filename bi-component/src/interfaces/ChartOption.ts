/**
 * 对每个图表的挂载的组件加一个控制
 */
export interface ChartOption {
  title: {
    id: string;
    show: boolean;
    text: string;
    link: string;
    target: ETarget;
    textStyle: {
      color: string;
      fontStyle: string;
      fontWeight: string;
      fontFamily: string;
      fontSize: string;
      lineHeight: number;
      width: number | string;
      height: number | string;
      textBorderColor: string;
      textBorderWidth: number;
      textShadowColor: string;
      textShadowBlur: number;
      textShadowOffsetX: number;
      textShadowOffsetY: number;
      rich: object;
    };
  };
}
enum ETarget {
  "self" = "self",
  "blank" = "blank"
}
