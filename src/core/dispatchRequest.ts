import { processRequestData, processResponseData } from '../helpers/data'
import { flattenHeaders, processRequestHeaders } from '../helpers/headers'
import buildURL from '../helpers/url'
import { AxiosRequestConfig, AxiosResponse, PromiseAxiosResponse } from '../types'
import xhr from '../xhr'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): PromiseAxiosResponse {
  processConfig(config)
  return xhr(config).then(response => {
    return transformResponseData(response)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
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
  response.data = transform(response.data, response.headers, response.config.transformResponse)
  return response
}
