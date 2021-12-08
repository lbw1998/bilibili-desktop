import { MediaInfo, MediaStatInfo } from '@/request/model/media/info';
import { request } from '@/utils/axios';

export interface MediaInfoParams {
  ep_id: number
}
export const getMediaInfoApi = (params:MediaInfoParams) => {
  return request<MediaInfo>({
    url: 'https://api.bilibili.com/pgc/view/web/season',
    method: 'get',
    params
  })
}
export interface MediaStatParams {
  season_id: number
}
export const getMediaStatApi = (params:MediaStatParams) => {
  return request<MediaStatInfo>({
    url: 'https://api.bilibili.com/pgc/web/season/stat',
    method: 'get',
    params
  })
}