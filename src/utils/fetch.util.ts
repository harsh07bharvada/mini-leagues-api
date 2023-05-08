import axios, { AxiosResponse } from 'axios'
import { makeid } from './common.utils'
export default class HTTPService {
  /**
   *
   * @param url
   * @param data
   * @returns
   */
  static async post(url: string, data: any) {
    try {
      let response: AxiosResponse = await axios.post(url, {
        method: 'POST',
        body: data,
      })
      return response.data
    } catch (err) {
      throw err
    }
  }

  /**
   *
   * @param url
   * @param data
   * @returns
   */
  static async get(url: string) {
    try {
      let response: AxiosResponse = await axios.get(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'PostmanRuntime/7.26.8',
          'Accept-Encoding': 'gzip, deflate, br',
          Connection: 'keep-alive',
          Accept: '*/*',
          'Cache-Control': 'no-cache',
        },
      })
      return response.data
    } catch (err) {
      throw err
    }
  }
}
