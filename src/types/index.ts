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
  url: string
  method?: Method
  data?: any
  params?: any
  responseType?: string
  headers?: any
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
