import axios, { AxiosResponse } from 'axios'
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
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.19 Safari/537.36',
        },
      })
      return response.data
    } catch (err) {
      throw err
    }
  }
}
