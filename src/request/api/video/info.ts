import { VideoInfo } from '@/request/model/video/info';
import { request } from '@/utils/axios';


export interface VideoInfoParams {
  aid?: number,
  bvid?: string
}

export const getVideoInfoApi = (params:VideoInfoParams) => {
  return request<VideoInfo>({
    url: 'https://api.bilibili.com/x/web-interface/view',
    method: 'get',
    params
  })
}
