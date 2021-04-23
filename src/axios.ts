import { deflate } from 'zlib'
import Axios from './core/Axios'
import defaults from './defaults'
import { extend } from './helpers/util'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context) //保证request函数在调用this时可以拿到

  extend(instance, context)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
