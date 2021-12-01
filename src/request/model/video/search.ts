
export interface SearchAllResult {
  seid: string;
  page: number;
  pagesize: number;
  numResults: number;
  numPages: number;
  suggest_keyword: string;
  rqt_type: string;
  cost_time: Costtime;
  exp_list: Explist;
  egg_hit: number;
  pageinfo: Pageinfo;
  top_tlist: Toptlist;
  show_column: number;
  show_module_list: string[];
  result: Result[];
}

export interface SearchTypeResult {
  seid: string;
  page: number;
  pagesize: number;
  numResults: number;
  numPages: number;
  suggest_keyword: string;
  rqt_type: string;
  cost_time: Costtime;
  exp_list: Explist;
  egg_hit: number;
  pageinfo: Pageinfo;
  top_tlist: Toptlist;
  show_column: number;
  show_module_list: string[];
  result: SearchItem[];
}

interface Result {
  result_type: string;
  data: (Datum | SearchItem)[];
}

export interface SearchItem {
  type: string;
  id: number;
  author: string;
  mid: number;
  typeid: string;
  typename: string;
  arcurl: string;
  aid: number;
  bvid: string;
  description: string;
  arcrank: string;
  pic: string;
  play: number;
  video_review: number;
  favorites: number;
  tag: string;
  review: number;
  pubdate: number;
  senddate: number;
  duration: string;
  badgepay: boolean;
  view_type: string;
  is_pay: number;
  is_union_video: number;
  rec_tags?: any;
  new_rec_tags: any[];
  rank_score: number;
  rec_reason: string;
  media_id: number;
  title: string;
  org_title: string;
  media_type: number;
  cv: string;
  staff: string;
  season_id: number;
  is_avid: boolean;
  hit_columns: string[];
  hit_epids: string;
  season_type: number;
  season_type_name: string;
  selection_style: string;
  ep_size: number;
  url: string;
  button_text: string;
  is_follow: number;
  is_selection: number;
  eps: Ep[];
  badges?: Badge[];
  cover: string;
  areas: string;
  styles: string;
  goto_url: string;
  desc: string;
  pubtime: number;
  media_mode: number;
  fix_pubtime_str: string;
  media_score: Mediascore;
  display_info?: Badge[];
  pgc_season_id: number;
  corner: number;
  rank_offset: number;
  uid: number;
  tags: string;
  live_time: string;
  cate_name: string;
  live_status: number;
  uname: string;
  uface: string;
  user_cover: string;
  short_id: number;
  area: number;
  online: number;
  is_live_room_inline: number;
  rank_index: number;
  roomid: number;
  attentions: number;
}


interface Mediascore {
  score: number;
  user_count: number;
}

interface Ep {
  id: number;
  cover: string;
  title: string;
  url: string;
  release_date: string;
  badges?: (Badge[] | Badge | null)[];
  index_title: string;
  long_title: string;
}

export interface Badge {
  text: string;
  text_color: string;
  text_color_night: string;
  bg_color: string;
  bg_color_night: string;
  border_color: string;
  border_color_night: string;
  bg_style: number;
}

interface Explist {
  '5504': boolean;
  '6605': boolean;
}

interface Costtime {
  params_check: string;
  illegal_handler: string;
  as_response_format: string;
  as_request: string;
  save_cache: string;
  deserialize_response: string;
  as_request_format: string;
  total: string;
  main_handler: string;
}

interface Datum {
  type: string;
  mid: number;
  uname: string;
  usign: string;
  fans: number;
  videos: number;
  upic: string;
  verify_info: string;
  level: number;
  gender: number;
  is_upuser: number;
  is_live: number;
  room_id: number;
  res: Re[];
  official_verify: Officialverify;
  hit_columns: any[];
  expand: Expand;
}

interface Expand {
  is_power_up: boolean;
  system_notice?: any;
}

interface Officialverify {
  type: number;
  desc: string;
}

interface Re {
  [key: string]: number | string
  aid: number;
  bvid: string;
  title: string;
  pubdate: number;
  arcurl: string;
  pic: string;
  play: string;
  dm: number;
  coin: number;
  fav: number;
  desc: string;
  duration: string;
  is_pay: number;
  is_union_video: number;
}

interface Toptlist {
  live_room: number;
  pgc: number;
  operation_card: number;
  tv: number;
  movie: number;
  special: number;
  live_master: number;
  bili_user: number;
  topic: number;
  upuser: number;
  live: number;
  video: number;
  user: number;
  bangumi: number;
  activity: number;
  media_ft: number;
  article: number;
  media_bangumi: number;
  card: number;
  live_user: number;
}

interface Pageinfo {
  live_room: Liveroom;
  pgc: Liveroom;
  operation_card: Liveroom;
  tv: Liveroom;
  movie: Liveroom;
  bili_user: Liveroom;
  live_master: Liveroom;
  live_all: Liveroom;
  topic: Liveroom;
  upuser: Liveroom;
  live: Liveroom;
  video: Liveroom;
  user: Liveroom;
  bangumi: Liveroom;
  activity: Liveroom;
  media_ft: Liveroom;
  article: Liveroom;
  media_bangumi: Liveroom;
  special: Liveroom;
  live_user: Liveroom;
}

interface Liveroom {
  numResults: number;
  total: number;
  pages: number;
}

interface Explist {
  '5504': boolean;
  '6605': boolean;
}

interface Costtime {
  params_check: string;
  'get upuser live status': string;
  illegal_handler: string;
  as_response_format: string;
  mysql_request: string;
  as_request: string;
  save_cache: string;
  as_request_format: string;
  deserialize_response: string;
  total: string;
  main_handler: string;
}

export interface SearchData {
  '0': _0;
  '1': _0;
  '2': _0;
  '3': _0;
  '4': _0;
  '5': _0;
  '6': _0;
  '7': _0;
  '8': _0;
  '9': _0;
}

interface _0 {
  value: string;
  term: string;
  ref: number;
  name: string;
  spid: number;
}
