
export interface RegionInfo {
  banner: Banner;
  card: Card2[];
  cbottom: number;
  ctop: number;
  recommend: RegionRecommend[];
  new: RegionNew[];
}

export interface RegionNewInfo {
  page: Page;
  archives: Archive[];
}

export interface Archive {
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
  season_id?: number;
  short_link: string;
  short_link_v2: string;
  bvid: string;
  season_type: number;
  is_ogv: boolean;
  ogv_info?: any;
  rcmd_reason: string;
  first_frame?: string;
  up_from_v2?: number;
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

interface Page {
  num: number;
  size: number;
  count: number;
}

export interface RegionNew {
  title: string;
  cover: string;
  uri: string;
  param: string;
  goto: string;
  name: string;
  face: string;
  play: number;
  favourite: number;
  pubdate: number;
  duration: number;
  rid: number;
  rname: string;
  like: number;
  danmaku?: number;
  reply?: number;
}

export interface RegionRecommend {
  title: string;
  cover: string;
  uri: string;
  param: string;
  goto: string;
  name: string;
  face: string;
  play: number;
  danmaku: number;
  reply: number;
  favourite: number;
  pubdate: number;
  duration: number;
  rid: number;
  rname: string;
  like: number;
}

interface Card2 {
  card_id: number;
  title: string;
  type: string;
  date?: number;
  uri?: string;
  goto?: string;
  param?: string;
  body: Body[];
}

interface Body {
  title: string;
  cover: string;
  uri: string;
  param: string;
  goto: string;
  name?: string;
  face?: string;
  play?: number;
  danmaku?: number;
  reply?: number;
  favourite?: number;
  pubdate: number;
  duration?: number;
  rid?: number;
  rname?: string;
  reid?: number;
  desc: string;
  like?: number;
}

interface Banner {
  top: RegionBanner[];
}

export interface RegionBanner {
  id: number;
  title: string;
  image: string;
  hash: string;
  uri: string;
  resource_id: number;
  request_id: string;
  is_ad: boolean;
  cm_mark: number;
  index: number;
  server_type: number;
  creative_id?: number;
  src_id?: number;
  is_ad_loc?: boolean;
  ad_cb?: string;
  client_ip?: string;
  extra?: Extra;
}

interface Extra {
  layout: string;
  use_ad_web_v2: boolean;
  show_urls: any[];
  click_urls: any[];
  download_whitelist: any[];
  open_whitelist: string[];
  card: Card;
  report_time: number;
  sales_type: number;
  special_industry: boolean;
  special_industry_tips: string;
  preload_landingpage: number;
  share_info: Shareinfo;
  upzone_entrance_type: number;
  upzone_entrance_report_id: number;
  click_area: number;
  shop_id: number;
  up_mid: number;
  track_id: string;
  enable_store_direct_launch: number;
  enable_double_jump: boolean;
  store_callup_card: boolean;
  enable_h5_alert: boolean;
  special_industry_style: number;
  macro_replace_priority: number;
  feedback_panel_style: number;
  product_id: number;
  landingpage_download_style: number;
}

interface Shareinfo {
}

interface Card {
  card_type: number;
  title: string;
  covers: Cover[];
  jump_url: string;
  desc: string;
  callup_url: string;
  long_desc: string;
  ad_tag: string;
  extra_desc: string;
  universal_app: string;
  duration: string;
  adver: Adver;
  extreme_team_status: boolean;
  support_transition: boolean;
  under_player_interaction_style: number;
  referral_pop_active_time: number;
  grade_denominator: number;
  star_level: number;
  ad_tag_style: Adtagstyle;
  feedback_panel: Feedbackpanel;
  fold_time: number;
  live_room_popularity: number;
  live_tag_show: boolean;
  quality_infos: any[];
  dynamic_text: string;
  grade_level: number;
}

interface Feedbackpanel {
  panel_type_text: string;
  feedback_panel_detail: any[];
  toast: string;
  close_rec_tips: string;
  open_rec_tips: string;
}

interface Adtagstyle {
  type: number;
  text: string;
  text_color: string;
  bg_border_color: string;
  bg_color: string;
  border_color: string;
}

interface Adver {
  adver_id: number;
  adver_type: number;
}

interface Cover {
  url: string;
  loop: number;
  image_height: number;
  image_width: number;
  gif_tag_show: boolean;
}