export interface HotData {
  list: HotInfo[];
  no_more: boolean;
}

export interface HotInfo {
  aid: number;
  videos: number;
  tid: number;
  tname: string;
  copyright: number;
  pic: string;
  title: string;
  pubdate: number;
  ctime: number;
  desc: string;
  state: number;
  duration: number;
  mission_id?: number;
  rights: Rights;
  owner: Owner;
  stat: Stat;
  dynamic: string;
  cid: number;
  dimension: Dimension;
  short_link: string;
  short_link_v2: string;
  first_frame: string;
  bvid: string;
  season_type: number;
  is_ogv: boolean;
  ogv_info?: any;
  rcmd_reason: Rcmdreason;
  up_from_v2?: number;
  season_id?: number;
}

interface Rcmdreason {
  content: string;
  corner_mark: number;
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
}