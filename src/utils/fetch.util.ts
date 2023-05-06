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
            'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
          'sec-ch-ua': `"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"`,
          'sec-ch-ua-mobile': `?1`,
          'sec-ch-ua-platform': 'Android',
        },
      })
      return response.data
    } catch (err) {
      throw err
    }
  }
}
