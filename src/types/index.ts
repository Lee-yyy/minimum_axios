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

export interface AxiosResponse<T = any> {
  headers: any
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  request: any
}

export interface PromiseAxiosResponse<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: number
  request?: any
  response?: any
  isAxiosError: boolean
}

export interface Axios {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): PromiseAxiosResponse<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): PromiseAxiosResponse<T>
  <T = any>(url: string, config?: AxiosRequestConfig): PromiseAxiosResponse<T>
}

export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number
  eject(id: number): void
}
export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
