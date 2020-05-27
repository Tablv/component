import { ShareType } from "glaway-bi-model/enums/ShareType";

export default interface ShareVO {
  /**
   * - ID
   */
  id: string;

  /**
   * - 分享类型
   */
  type: ShareType;

  /**
   * - 指向分享的ID
   */
  shareId: string;

  /**
   * - 分享者
   */
  shareUser: string;

  /**
   * - 分享密码
   */
  sharePwd: string;

  /**
   * - 分享天数(0: 无限)
   */
  shareDay: number;

  /**
   * - 分享地址
   */
  shareURL: string;

  /**
   * - 分享状态
   */
  status: number;
}
