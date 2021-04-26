import { creatError } from '../helpers/error'
import { processResponseHeader } from '../helpers/headers'
import { AxiosRequestConfig, PromiseAxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): PromiseAxiosResponse {
  return new Promise((resolve, reject) => {
    let { method = 'get', url, data = null, responseType, timeout, cancelToken } = config
    let request = new XMLHttpRequest()
    request.open(method, url!, true)
    if (responseType) {
      request.responseType = responseType
    }
    request.onreadystatechange = function() {
      if (request.readyState !== 4) return

      if (request.status === 0) return
      // 请求已经发出，但是由于服务器对接收到的请求并没有应答，因此我们并没有得到服务器的响应状态，并且服务器的处理状态我们也不得而知，

      let responseHeaders = processResponseHeader(request.getAllResponseHeaders())
      let responseData = responseType === 'text' ? request.responseText : request.response
      let response = {
        data: responseData,
        headers: responseHeaders,
        status: request.status,
        statusText: request.statusText,
        config,
        request
      }

      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(
          creatError(
            `response status is not allow,${request.statusText}`,
            config,
            request.status,
            request,
            response
          )
        )
      }
    }

    if (timeout) {
      request.timeout = timeout
    }
    request.ontimeout = function() {
      reject(new Error(`Timeout of ${timeout}ms`))
    }
    request.onerror = function() {
      reject(new Error('Network error'))
    }

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }
    request.send(data)
  })
}
