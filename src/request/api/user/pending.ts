import { request } from "@/utils/axios"
import { PendingData } from "@/request/model/user/pending"

// 获取用户稍后再看列表
export const getPendingApi = () => {
  return request<PendingData>({
    url: 'https://api.bilibili.com/x/v2/history/toview',
    method: 'get'
  })
}