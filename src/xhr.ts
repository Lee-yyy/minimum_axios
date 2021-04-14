import { AxiosRequestConfig ,PromiseAxiosResponse} from "./types";

export default function xhr(config:AxiosRequestConfig):PromiseAxiosResponse{
    return new Promise((resolve, reject) =>{

        let {method = 'get', url, data = null,responseType} = config;
        let request = new XMLHttpRequest();
        request.open(method, url, true);
        request.onreadystatechange = function(){
            if(request.readyState !== 4) return;

            if(request.status >= 200 && request.status < 300){
                let responseHeaders = request.getAllResponseHeaders();
                let responseData = responseType === 'text' ? request.responseText : request.response
                let response = {
                    data: responseData,
                    headers: responseHeaders,
                    status: request.status,
                    statusText: request.statusText,
                    config,
                    request
                }
                resolve(response)
            }else{
                reject(`${request.status} ${request.statusText}`)
            }
        }
        request.onerror = function(){
            reject(new Error('Network error'))
        }
        request.send(data)
    })
}