import { AxiosRequestConfig, Method, PromiseAxiosResponse } from '../types'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  //request , get , _requestMethodWithoutData 等均为原型方法
  request(url: any, config?: any): PromiseAxiosResponse {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }

  get(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithData('options', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithData('options', url, data, config)
  }
  pstch(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse {
    return this._requestMethodWithData('options', url, data, config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): PromiseAxiosResponse {
    return this.request(Object.assign(config || {}, method, url))
  }
  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): PromiseAxiosResponse {
    return this.request(Object.assign(config || {}, method, url, data))
  }
}
