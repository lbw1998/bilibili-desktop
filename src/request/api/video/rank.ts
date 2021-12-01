import { RankInfo } from '@/request/model/video/rank';
import { request } from '@/utils/axios';

interface RankParams {
  rid: number
}
export const getRankingApi = (params?:RankParams) => {
  return request<RankInfo>({
    url: 'https://api.bilibili.com/x/web-interface/ranking',
    method: 'get',
    params
  })
}
