import { AxiosRequestConfig ,PromiseAxiosResponse} from "./types";
import xhr from "./xhr"

export default function axios(config:AxiosRequestConfig):PromiseAxiosResponse{
    return xhr(config)
}