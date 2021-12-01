import { PlayInfo } from '@/request/model/video/playInfo';
import { request } from '@/utils/axios';

export interface PlayInfoParams {
  avid?: number,
  bvid?: string,
  cid: number
}

export const getPlayInfoApi = (params:PlayInfoParams) => {
  return request<PlayInfo>({
    url: 'https://api.bilibili.com/x/player/playurl',
    method: 'get',
    params
  })
}
