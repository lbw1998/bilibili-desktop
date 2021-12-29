import { request } from "@/utils/axios"
import { FavoriteData, FavoriteDetailData } from "@/request/model/user/favorite"

interface FavoriteParams {
  up_mid: number // 目标用户midz
  type?: number // 目标内容属性	默认为全部 0：全部 2：视频稿件
  rid?: number // 目标内容id 视频稿件：视频稿件avid
}
// 获取用户收藏夹
export const getFavoriteApi = (params:FavoriteParams) => {
  return request<FavoriteData>({
    url: 'https://api.bilibili.com/x/v3/fav/folder/created/list-all',
    method: 'get',
    params
  })
}
interface FavoriteDetailParams {
  media_id: number
  ps: number
  pn?: number
}
// 获取收藏夹内详细列表
export const getFavoriteDetailApi = (params:FavoriteDetailParams) => {
  return request<FavoriteDetailData>({
    url: 'https://api.bilibili.com/x/v3/fav/resource/list',
    method: 'get',
    params
  })
}