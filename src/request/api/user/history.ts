import { request } from "@/utils/axios"
import { HistoryData } from "@/request/model/user/history"

interface HistoryParams {
  max: number
  view_at: number
}
// 获取用户历史记录
export const getHistoryApi = (params:HistoryParams) => {
  return request<HistoryData>({
    url: 'https://api.bilibili.com/x/web-interface/history/cursor',
    method: 'get',
    params
  })
}