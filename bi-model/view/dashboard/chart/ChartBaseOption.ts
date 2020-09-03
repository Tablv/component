export interface ILabel extends ItextStyle {
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
  offsetCenter: string[] | number[];
};

export interface ItextStyle extends 
  IFont, 
  IHWL, 
  IBorder,
  IShadow,
  ITextShadow,
  ITextBorder {
  show: boolean;
  backgroundColor: string | object;
  padding: number | number[];
  rich: object;
}

export interface IScaleLimite {
  min: number;
  max: number;
}

export interface IValueUnit {
  value: number | string,
  unit: string;
}

// 定位
export interface IPosition {
  left: number | string;
  top: number | string;
  bottom: number | string;
  right: number | string;
}

// 高度 宽度 行高
export interface IHWL {
  // 文字块的宽度
  width: number | string;
  // 文字块的高度
  height: number | string;
  // 行高
  lineHeight: number;
}

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
  // 边框颜色
  borderColor: string;
  // 边框宽度
  borderWidth: string;
  // 圆角
  borderRadius: number | any[];
  // 边框类型
  borderType: ELineType;
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
  textShadowBlur: number;
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
  shadowBlur: number;
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

// 水平对齐
export enum EAlign {
  auto = "auto",
  left = "left",
  center = "center",
  right = "right"
}

// 垂直对齐
export enum EVerticalAlign {
  auto = "auto",
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

export enum ETarget {
  self = "self",
  blank = "blank"
}