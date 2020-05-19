import qs from "qs";
// qs是一个url参数转化（parse和stringify）的js库
import axios, { Method, AxiosResponse } from "axios";

interface ResultJSON {
  code: string;

  message: string;

  success: boolean;

  result: any;
}

export default class AxiosUtil {

  private static basePath: string = "";

  /**
   * Get请求
   * @param url {string} 请求地址
   * @param data {any} 请求参数
   */
  public static async get(url: string, data?: any): Promise<ResultJSON> {
    return await axios
      .get(this.getBasePath() + url, {
        params: data
      })
      .then((result: AxiosResponse<ResultJSON>) =>
        Promise.resolve(result.data as ResultJSON)
      )
      .catch((err: Error) => Promise.reject(err));
  }

  /**
   * Post请求
   * @param url {string} 请求地址
   * @param data {any} 请求参数
   * @param isJSON {boolean} 是否为json格式
   */
  public static async post(
    url: string,
    data: any,
    isJSON?: boolean
  ): Promise<ResultJSON> {
    return await this.request(url, data, "POST", isJSON);
  }

  /**
   * 自定义请求
   * @param url {string} 请求地址
   * @param data {any} 请求参数
   * @param type {Method} 请求类型
   * @param isJSON {boolean} 是否为json格式
   */
  public static async request(
    url: string,
    data: any,
    type: Method,
    isJSON?: boolean
  ): Promise<ResultJSON> {
    return await axios({
      url: this.getBasePath() + url,
      method: type,
      data: isJSON ? data : qs.stringify(data),
      headers: {
        "Content-Type": isJSON
          ? "application/json"
          : "application/x-www-form-urlencoded"
      }
    })
      .then((result: AxiosResponse<ResultJSON>) =>
        Promise.resolve(result.data as ResultJSON)
      )
      .catch((err: Error) => Promise.reject(err));
  }

  // 获取基础路径
  public static getBasePath(): string {
    return AxiosUtil.basePath;
  }

  public static setBasePath(basePath: string) {
    AxiosUtil.basePath = basePath;
  }
}
