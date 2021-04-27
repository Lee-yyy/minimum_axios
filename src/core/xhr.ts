import cookie from '../helpers/cookie'
import { creatError } from '../helpers/error'
import { processResponseHeader } from '../helpers/headers'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'
import { AxiosRequestConfig, AxiosResponse, PromiseAxiosResponse } from '../types'

export default function xhr(config: AxiosRequestConfig): PromiseAxiosResponse {
  return new Promise((resolve, reject) => {
    let {
      method = 'get',
      url,
      data = null,
      responseType,
      headers,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownLoadProgress,
      onUploadProgress,
      auth
    } = config
    let request = new XMLHttpRequest()
    request.open(method, url!, true)

    configureRequest()

    addEvents()

    processHeaders()

    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (timeout) {
        request.timeout = timeout
      }
      if (responseType) {
        request.responseType = responseType
      }
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    // function handleResponse(response: AxiosResponse):void{}

    function addEvents(): void {
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
      request.ontimeout = function() {
        reject(creatError(`Timeout of ${timeout}ms`, config, undefined, request))
      }
      request.onerror = function() {
        reject(creatError('Network error', config, undefined, request))
      }
      if (onDownLoadProgress) {
        request.onprogress = onDownLoadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        // request.withCredentials = withCredentials
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }
      if (auth) {
        headers['Authoirzation'] = 'Basic' + btoa(auth.username + ':' + auth.password)
      }
    }

    function processCancel(): void {
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
  })
}
