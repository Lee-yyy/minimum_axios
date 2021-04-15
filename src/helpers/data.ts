import { isObject } from './util'

export function processRequestData(data: any): any {
  if (isObject(data) && data !== null) {
    data = JSON.stringify(data)
  }
  return data
}

export function processResponseData(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {}
  }
  return data
}
