export interface ILabel extends IFont, IBorder, IShadow, ITextShadow, ITextBorder  {
  show: boolean;
  // 'top' 'left' 'right' 'bottom' 'inside'
  // map 支持：top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
  position: string | number[];
  // 显示数值
  isShowNumber: boolean;
  // 隐藏定位
  hidePosition: boolean;
  // 距离图形元素的距离 map
  distance: number;
  // 标签旋转 从 -90 度到 90 度。正值是逆时针 map
  rotate: number;
  // 是否对文字进行偏移
  offset: string[] | number[];
  // 标签内容格式器
  formatter: string | Function;
  // 文字水平对齐方式，默认自动
  algin: string;
  // 文字垂直对齐方式，默认自动
  verticalAlgin: string;
  // 行高
  lineHeight: number;
  // 文字块背景色
  backgroundColor: string;
  // 文字块的内边距
  padding: number | number[];
  // 文字块的宽度
  width: number | string;
  // 文字块的高度
  height: number | string;
  
  offsetCenter: string[] | number[];
  // 富文本
  rich: object;
};

// 字体
export interface IFont {
  // 文字的颜色
  // 可以设置 auto
  color: string;
  // 文字字体的风格
  fontStyle: string;
  // 文字字体的粗细
  fontWeight: string | number;
  // 文字字体系列
  fontFamily: string;
  // 文字的字体大小
  fontSize: number;
}

// 边框
export interface IBorder {
  // 文字块边框颜色
  borderColor: string;
  // 文字块边框宽度
  borderWidth: string;
  // 文字块的圆角
  borderRadius: number | any[];
}

// 文本边框
export interface ITextBorder {
  // 文字本身的描边颜色
  textBorderColor: string;
  // 文字本身的描边宽度
  textBorderWidth: number;
}

// 文本阴影
export interface ITextShadow {
  // 文字本身的阴影颜色
  textShadowColor: string;
  // 文字本身的阴影长度
  textShadowBlur: string;
  // 文字本身的阴影 X 偏移
  textShadowOffsetX: number;
  // 文字本身的阴影 Y 偏移
  textShadowOffsetY: number;
}

// 阴影
export interface IShadow {
  // 文字块的背景阴影颜色
  shadowColor: string;
  // 文字块的背景阴影长度
  shadowBlur: string;
  // 文字块的背景阴影X偏移
  shadowOffsetX: number;
  // 文字块的背景阴影Y偏移
  shadowOffsetY: number;
}

// 标签定位
export enum EPosition {
  // 饼图扇区外侧
  outside = "outside",

  // 饼图扇区内部
  inside = "inside",

  inner = "inside",

  // 在饼图中心位置
  center = "center"
}

// 字体风格
export enum EFontStyle {
  normal = "normal",
  italic = "italic",
  oblique = "oblique"
}

// 字体粗细
export enum EFontWeight {
  normal = "normal",
  bold = "bold",
  bolder = "bolder",
  lighter = "lighter"
}

// export enum EFontFamily {
//   'sans-serif' = "sans-serif",
//   bold = "bold",
//   bolder = "bolder",
//   lighter = "lighter"
// }

export enum EAlign {
  left = "left",
  center = "center",
  right = "right"
}

export enum EVerticalAlign {
  top = "top",
  middle = "middle",
  bottom = "bottom"
}

export enum ELineType {
  solid = "solid",
  dashed = "dashed",
  dotted = "dotted"
}

export enum ESeriesLayoutBy {
  column = "column",
  row = "row"
}