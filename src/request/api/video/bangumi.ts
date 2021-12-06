import { BangumiFollow, BangumiInfo, BangumiTimeline } from "@/request/model/video/bangumi"
import { request } from "@/utils/axios"


interface BangumiInfoParams {
  tab_id: number
}
export const getBangumiInfoApi = (params:BangumiInfoParams) => {
  return request<BangumiInfo>({
    url: 'https://api.bilibili.com/pgc/page',
    method: 'get',
    params
  })

}
export const getBangumiTimelineApi = () => {
  return request<BangumiTimeline[]>({
    url: 'https://bangumi.bilibili.com/api/timeline_v2_global?',
    method: 'get',
    
  })
}

export const getBangumiFollowApi = () => {
  return request<BangumiFollow[]>({
    url: 'https://api.bilibili.com/pgc/web/follow/list?season_type=1&ps=20&pn=1',
    method: 'get',
    
  })
}