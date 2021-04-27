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
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownLoadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void

  [propName: string]: any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
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
  defaults: AxiosRequestConfig
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

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  throwIfRequested(): void
}

export interface Canceler {
  (message?: string): void
}

export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken
  source(): CancelTokenSource
}
