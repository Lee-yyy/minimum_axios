import { processRequestData, processResponseData } from '../helpers/data'
import { flattenHeaders, processRequestHeaders } from '../helpers/headers'
import buildURL, { combineURL, isAbsoluteURL } from '../helpers/url'
import { AxiosRequestConfig, AxiosResponse, PromiseAxiosResponse } from '../types'
import xhr from './xhr'
import transform from './transform'

export default function dispatchRequest(config: AxiosRequestConfig): PromiseAxiosResponse {
  throwIfCancellationRequested(config)
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

export function transformUrl(config: AxiosRequestConfig): string {
  let { url, params, paramsSerializer, baseURL } = config
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
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

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
