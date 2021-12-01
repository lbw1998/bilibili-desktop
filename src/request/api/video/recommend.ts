import { VideoInfo } from '@/request/model/video/info';
import { RecommendData } from '@/request/model/video/recommend';
import { request } from '@/utils/axios';

// 首页推荐视频
export const refreshAllApi = () => {
  return request<RecommendData>({
    url: 'https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3',
    method: 'get'
  })
}

export interface RelagedParams {
  aid?: number,
  bvid?: string
}
// 单个视频推荐
export const relatedApi = (params:RelagedParams) => {
  return request<VideoInfo[]>({
    url: 'https://api.bilibili.com/x/web-interface/archive/related',
    method: 'get',
    params
  })
}
