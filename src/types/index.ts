export type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'head'
  | 'delete'
  | 'options'
  | 'connect'
  | 'patch'
  | 'GET'
  | 'POST'
  | 'HEAD'
  | 'OPTIONS'
  | 'PUT'
  | 'PATCH'
  | 'Delete'
  | 'CONNECT'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  responseType?: XMLHttpRequestResponseType
  headers?: any
  timeout?: number
}

export interface AxiosResponse {
  headers: any
  data: any
  status: number
  statusText: string
  config: AxiosRequestConfig
  request: any
}

export interface PromiseAxiosResponse extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: number
  request?: any
  response?: any
  isAxiosError: boolean
}

export interface Axios {
  request(config: AxiosRequestConfig): PromiseAxiosResponse
  get(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse
  delete(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse
  head(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse
  options(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse
  post(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse
  put(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse
  patch(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): PromiseAxiosResponse
  (url: string, config?: AxiosRequestConfig): PromiseAxiosResponse
}
