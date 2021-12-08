import { PlayInfo } from '@/request/model/media/playInfo';
import { request } from '@/utils/axios';

export interface PlayInfoParams {
  cid: number
}
export const getPlayInfoApi = (params:PlayInfoParams) => {
  return request<PlayInfo>({
    url: 'https://api.bilibili.com/pgc/player/web/playurl',
    method: 'get',
    params
  })
}