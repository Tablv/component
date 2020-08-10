// 字体
export interface IFont {
  color: string;

  fontStyle: EFontStyle;

  fontWeight: EFontWeight;

  fontFamily: string;

  fontSize: number;
}

// 边框
export interface IBorder {
  borderColor: string;

  borderWidth: number;

  borderRadius: number | number[];
}

// 文本边框
export interface ITextBorder {
  textBorderColor: string;

  textBorderWidth: number;
}

// 文本阴影
export interface ITextShadow {
  textShadowColor: string;

  textShadowBlur: string;

  textShadowOffsetX: number;

  textShadowOffsetY: number;
}

// 阴影
export interface IShadow {
  shadowBlur: string;
  shadowColor: string;
  shadowOffsetX: number;
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