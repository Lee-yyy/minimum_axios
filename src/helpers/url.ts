import { isDate, isObject } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

export default function buildURL(url: string, params: any): string {
  if (!params) {
    return url
  }

  let parts = collectParams(params)

  let serializedParams = serializeParts(parts)

  processURL(url)

  return url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
}

function collectParams(params: any): string[] {
  let parts: string[] = []

  Object.keys(params).forEach(key => {
    let val = params[key]
    let values = []

    if (val === null || typeof val === 'undefined') return
    if (Array.isArray(val)) {
      values = val
      key = key + '[]'
    } else {
      values = [val]
    }

    values.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encode(key)}=${encode(value)}`)
    })
  })

  return parts
}

function serializeParts(parts: string[]): string {
  return parts.join('&')
}

function processURL(url: string): void {
  if (url.indexOf('#') !== -1) {
    url = url.slice(url.indexOf('#'))
  }
}

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode

  return {
    protocol,
    host
  }
}
