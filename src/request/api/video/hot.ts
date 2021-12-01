import { HotData } from "@/request/model/video/hot"
import { request } from "@/utils/axios"

// 热门视频参数
interface HotParams {
  pn?: number
  ps?: number
}
// 首页热门视频
export const getHotApi = (params?:HotParams) => {
  return request<HotData>({
    url: 'https://api.bilibili.com/x/web-interface/popular',
    method: 'get',
    params
  })
}