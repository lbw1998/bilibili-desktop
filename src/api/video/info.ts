import { request } from '@/utils/axios';

export interface VideoInfo {
  aid?: number;
  bvid?: string;
  videos: number;
  tid: number;
  tname: string;
  copyright: number;
  pic: string;
  title: string;
  pubdate: number;
  ctime: number;
  desc: string;
  desc_v2: Descv2[];
  state: number;
  duration: number;
  mission_id: number;
  rights: Rights;
  owner: Owner;
  stat: Stat;
  dynamic: string;
  cid: number;
  dimension: Dimension;
  no_cache: boolean;
  pages: Page[];
  subtitle: Subtitle;
  user_garb: Usergarb;
  honor_reply: Honorreply;
}

interface Honorreply {
  honor: Honor[];
}

interface Honor {
  aid: number;
  type: number;
  desc: string;
  weekly_recommend_num: number;
}

interface Usergarb {
  url_image_ani_cut: string;
}

interface Subtitle {
  allow_submit: boolean;
  list: any[];
}

interface Page {
  cid: number;
  page: number;
  from: string;
  part: string;
  duration: number;
  vid: string;
  weblink: string;
  dimension: Dimension;
  first_frame: string;
}

interface Dimension {
  width: number;
  height: number;
  rotate: number;
}

interface Stat {
  aid: number;
  view: number;
  danmaku: number;
  reply: number;
  favorite: number;
  coin: number;
  share: number;
  now_rank: number;
  his_rank: number;
  like: number;
  dislike: number;
  evaluation: string;
  argue_msg: string;
}

interface Owner {
  mid: number;
  name: string;
  face: string;
}

interface Rights {
  bp: number;
  elec: number;
  download: number;
  movie: number;
  pay: number;
  hd5: number;
  no_reprint: number;
  autoplay: number;
  ugc_pay: number;
  is_cooperation: number;
  ugc_pay_preview: number;
  no_background: number;
  clean_mode: number;
  is_stein_gate: number;
  is_360: number;
  no_share: number;
}

interface Descv2 {
  raw_text: string;
  type: number;
  biz_id: number;
}

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
