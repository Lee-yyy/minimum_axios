import { AxiosRequestConfig } from '../types'

export class AxiosError extends Error {
  config: AxiosRequestConfig
  code?: number
  request?: any
  response?: any
  isAxiosError?: boolean
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: number,
    request?: any,
    response?: any
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true
  }
}

export function creatError(
  message: string,
  config: AxiosRequestConfig,
  code?: number,
  request?: any,
  response?: any
) {
  const error = new AxiosError(message, config, code, request, response)

  return error
}
