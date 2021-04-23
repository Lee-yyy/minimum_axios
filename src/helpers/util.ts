export function isDate(value: any): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

export function isObject(value: any): value is object {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
