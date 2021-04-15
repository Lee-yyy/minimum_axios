import { isObject } from './util'

export function processRequestHeaders(headers: any, data: any): any {
  normalizeHeaders(headers, 'Content-Type')

  if (isObject(data) && data !== null) {
    headers['Content-type'] = 'application/json;charset = utf-8'
  } else if (data === null) {
    delete headers['Content-Type']
  }
  return headers
}

function normalizeHeaders(headers: any, normalizeName: string): any {
  if (!headers) {
    return headers
  }

  Object.keys(headers).forEach(name => {
    if (normalizeName === name || normalizeName.toUpperCase() === name.toUpperCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export function processResponseHeader(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) return
    parsed[key] = value ? value.trim() : value
  })
  return parsed
}
