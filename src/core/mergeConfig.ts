import { AxiosRequestConfig } from '../types'

const strats = Object.create(null)

function defaultStrata(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strata(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const strataKeysFromVal2 = ['url', 'params', 'data']

strataKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strata
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strata = strats[key] || defaultStrata
    config[key] = strata(config1[key], config2![key])
  }
}