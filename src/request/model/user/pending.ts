export interface PendingData {
  count: number;
  list: PendingItem[];
}

export interface PendingItem {
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
  rights: Rights;
  owner: Owner;
  stat: Stat;
  dynamic: string;
  dimension: Dimension;
  short_link_v2: string;
  up_from_v2?: number;
  count: number;
  cid: number;
  progress: number;
  add_at: number;
  bvid: string;
  uri: string;
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