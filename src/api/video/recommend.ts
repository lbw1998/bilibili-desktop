import { request } from '@/utils/axios';
import { VideoInfo } from './info'

interface RecommendData {
  item: Item[];
  user_feature?: any;
  abtest: Abtest;
}

interface Abtest {
  group: string;
}

export interface Item {
  id: number;
  bvid: string;
  cid: number;
  goto: string;
  uri: string;
  pic: string;
  title: string;
  duration: number;
  pubdate: number;
  owner: Owner;
  stat: Stat;
  av_feature?: any;
}

interface Stat {
  view: number;
  like: number;
}

interface Owner {
  mid: number;
  name: string;
  face: string;
}

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
