import { processRequestData } from './helpers/data'
import { processRequestHeaders } from './helpers/headers'
import buildURL from './helpers/url'
import { AxiosRequestConfig, PromiseAxiosResponse } from './types'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): PromiseAxiosResponse {
  processConfig(config)
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  let { headers, data } = config
  return processRequestHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  return processRequestData(data)
}
