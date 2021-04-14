import buildURL from './helpers/url'
import { AxiosRequestConfig, PromiseAxiosResponse } from './types'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): PromiseAxiosResponse {
  return xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url, params)
}
