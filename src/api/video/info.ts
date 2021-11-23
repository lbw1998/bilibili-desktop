import { request } from '@/utils/axios';

interface VideoInfoParams {
  aid?: number,
  bvid?: string
}

export const getVideoInfoApi = (params:VideoInfoParams) => {
  return request({
    url: 'https://api.bilibili.com/x/web-interface/view',
    method: 'get',
    params
  })
}
