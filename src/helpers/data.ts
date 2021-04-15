import { isObject } from './util'

export function processRequestData(data: any): any {
  if (isObject(data) && data !== null) {
    data = JSON.stringify(data)
  }
  return data
}
