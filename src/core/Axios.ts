import {
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  PromiseAxiosResponse,
  RejectedFn,
  ResolvedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => PromiseAxiosResponse)
  rejected?: RejectedFn
}
export default class Axios {
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }
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

    config = mergeConfig(this.defaults, config)
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
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
