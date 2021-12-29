export interface FavoriteData {
  count: number;
  list: FavoriteItem[];
  season?: any;
}

export interface FavoriteItem {
  id: number;
  fid: number;
  mid: number;
  attr: number;
  title: string;
  fav_state: number;
  media_count: number;
}

export interface FavoriteDetailData {
  info: Info;
  medias: FavoriteMedia[];
  has_more: boolean;
}

export interface FavoriteMedia {
  id: number;
  type: number;
  title: string;
  cover: string;
  intro: string;
  page: number;
  duration: number;
  upper: Upper2;
  attr: number;
  cnt_info: Cntinfo2;
  link: string;
  ctime: number;
  pubtime: number;
  fav_time: number;
  bv_id: string;
  bvid: string;
  season?: any;
  ogv?: any;
  ugc: Ugc;
}

interface Ugc {
  first_cid: number;
}

interface Cntinfo2 {
  collect: number;
  play: number;
  danmaku: number;
}

interface Upper2 {
  mid: number;
  name: string;
  face: string;
}

interface Info {
  id: number;
  fid: number;
  mid: number;
  attr: number;
  title: string;
  cover: string;
  upper: Upper;
  cover_type: number;
  cnt_info: Cntinfo;
  type: number;
  intro: string;
  ctime: number;
  mtime: number;
  state: number;
  fav_state: number;
  like_state: number;
  media_count: number;
}

interface Cntinfo {
  collect: number;
  play: number;
  thumb_up: number;
  share: number;
}

interface Upper {
  mid: number;
  name: string;
  face: string;
  followed: boolean;
  vip_type: number;
  vip_statue: number;
}