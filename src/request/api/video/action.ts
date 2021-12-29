import { RankInfo } from '@/request/model/video/rank';
import { request } from '@/utils/axios';

interface LikeParams {
  aid?: number
  bvid?: string
  like: number
}
export const likeVideoApi = (params:LikeParams) => {
  return request({
    url: 'https://api.bilibili.com/x/web-interface/archive/like',
    method: 'post',
    params
  })
}

interface CoinParams {
  aid?: number
  bvid?: string
  multiply: number // 投币数量，上限为2
}
export const coinVideoApi = (params:CoinParams) => {
  return request({
    url: 'https://api.bilibili.com/x/web-interface/coin/add',
    method: 'post',
    params
  })
}

interface FavoriteParams {
  rid: number
  type: number, // 必须为2
  add_media_ids?: string,
  del_media_ids?: string
}
export const favoriteVideoApi = (params:FavoriteParams) => {
  return request({
    url: 'https://api.bilibili.com/medialist/gateway/coll/resource/deal',
    method: 'post',
    params
  })
}
