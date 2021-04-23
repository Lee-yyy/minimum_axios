import { processRequestData, processResponseData } from './helpers/data'
import { processRequestHeaders } from './helpers/headers'
import buildURL from './helpers/url'
import { AxiosRequestConfig, AxiosResponse, PromiseAxiosResponse } from './types'
import xhr from './xhr'

export default function axios(config: AxiosRequestConfig): PromiseAxiosResponse {
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponseData(response)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  let { url, params } = config
  return buildURL(url!, params)
}

function transformHeaders(config: AxiosRequestConfig): any {
  let { headers, data } = config
  return processRequestHeaders(headers, data)
}

function transformRequestData(config: AxiosRequestConfig): any {
  let { data } = config
  return processRequestData(data)
}

function transformResponseData(response: AxiosResponse): AxiosResponse {
  let { data } = response
  response.data = processResponseData(data)
  return response
}
