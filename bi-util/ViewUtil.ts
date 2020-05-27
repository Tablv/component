/**
 * 视图工具类
 */
export default class ViewUtil {
  /**
   * 获取视图尺寸
   */
  public static getViewportSize(): ViewportSize {
    return {
      width: this.getViewportWidth(),
      height: this.getViewportHeight()
    };
  }

  /**
   * 获取视图宽度
   */
  public static getViewportWidth(): number {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  }

  /**
   * 获取视图高度
   */
  public static getViewportHeight(): number {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  }
}

/**
 * 视图尺寸
 */
interface ViewportSize {
  width: number;
  height: number;
}
