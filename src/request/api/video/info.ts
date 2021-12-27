import { VideoInfo } from '@/request/model/video/info';
import { request } from '@/utils/axios';


export interface VideoInfoParams {
  aid?: number,
  bvid?: string
}
// 获取视频基本信息
export const getVideoInfoApi = (params:VideoInfoParams) => {
  return request<VideoInfo>({
    url: 'https://api.bilibili.com/x/web-interface/view',
    method: 'get',
    params
  })
}

// 判断视频是否被点赞
export const getVideoLikeStateApi = (params:VideoInfoParams) => {
  return  request({
    url: 'https://api.bilibili.com/x/web-interface/archive/has/like',
    method: 'get',
    params
  })
}

// 判断视频是否被投币
export const getVideoCoinStateApi = (params:VideoInfoParams) => {
  return  request({
    url: 'https://api.bilibili.com/x/web-interface/archive/coins',
    method: 'get',
    params
  })
}

interface VideoParams {
  aid: number | string,
}
// 判断视频是否被收藏
export const getVideoFavouriteStateApi = (params:VideoParams) => {
  return  request({
    url: 'https://api.bilibili.com/x/v2/fav/video/favoured',
    method: 'get',
    params
  })
}