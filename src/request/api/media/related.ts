import { MediaRelatedInfo } from '@/request/model/media/related';
import { request } from '@/utils/axios';

interface MediaRelatedParams {
  season_id: number
}
export const getMediaRelatedInfoApi = (params:MediaRelatedParams) => {
  return request<MediaRelatedInfo>({
    url: 'https://api.bilibili.com/pgc/season/web/related/recommend',
    method: 'get',
    params
  })
}