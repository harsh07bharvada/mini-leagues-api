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
          'User-Agent': makeid(10),
        },
      })
      return response.data
    } catch (err) {
      throw err
    }
  }
}
