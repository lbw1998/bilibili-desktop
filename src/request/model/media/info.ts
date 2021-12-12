
export interface MediaInfo {
  activity: Activity;
  alias: string;
  areas: Area[];
  bkg_cover: string;
  cover: string;
  episodes: Episode[];
  evaluate: string;
  freya: Freya;
  jp_title: string;
  link: string;
  media_id: number;
  mode: number;
  new_ep: Newep;
  payment: Payment;
  positive: Positive;
  publish: Publish;
  rating: Rating;
  record: string;
  rights: Rights2;
  season_id: number;
  season_title: string;
  seasons: Season[];
  section: Section[];
  series: Series;
  share_copy: string;
  share_sub_title: string;
  share_url: string;
  show: Show;
  square_cover: string;
  stat: Stat3;
  status: number;
  subtitle: string;
  title: string;
  total: number;
  type: number;
  up_info: Upinfo;
  user_status: Userstatus;
}

export interface MediaStatInfo {
  coins: number;
  danmakus: number;
  follow: number;
  likes: number;
  series_follow: number;
  views: number;
}

interface Userstatus {
  area_limit: number;
  ban_area_show: number;
  follow: number;
  follow_status: number;
  login: number;
  pay: number;
  pay_pack_paid: number;
  sponsor: number;
}

interface Upinfo {
  avatar: string;
  follower: number;
  is_follow: number;
  mid: number;
  pendant: Pendant;
  theme_type: number;
  uname: string;
  verify_type: number;
  vip_label: Viplabel;
  vip_status: number;
  vip_type: number;
}

interface Viplabel {
  label_theme: string;
  path: string;
  text: string;
}

interface Pendant {
  image: string;
  name: string;
  pid: number;
}

interface Stat3 {
  coins: number;
  danmakus: number;
  favorite: number;
  favorites: number;
  likes: number;
  reply: number;
  share: number;
  views: number;
}

interface Show {
  wide_screen: number;
}

interface Series {
  series_id: number;
  series_title: string;
}

interface Section {
  episode_id: number;
  episodes: Episode2[];
  id: number;
  title: string;
  type: number;
}

interface Episode2 {
  aid: number;
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  bvid: string;
  cid: number;
  cover: string;
  dimension: Dimension;
  duration: number;
  from: string;
  id: number;
  is_view_hide: boolean;
  link: string;
  long_title: string;
  pub_time: number;
  pv: number;
  release_date: string;
  rights: Rights;
  share_copy: string;
  share_url: string;
  short_link: string;
  stat: Stat2;
  status: number;
  subtitle: string;
  title: string;
  vid: string;
}

interface Stat2 {
  coin: number;
  danmakus: number;
  likes: number;
  play: number;
  reply: number;
}

interface Season {
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  cover: string;
  media_id: number;
  new_ep: Newep2;
  season_id: number;
  season_title: string;
  season_type: number;
  stat: Stat;
}

interface Stat {
  favorites: number;
  series_follow: number;
  views: number;
}

interface Newep2 {
  cover: string;
  id: number;
  index_show: string;
}

interface Rights2 {
  allow_bp: number;
  allow_bp_rank: number;
  allow_download: number;
  allow_review: number;
  area_limit: number;
  ban_area_show: number;
  can_watch: number;
  copyright: string;
  forbid_pre: number;
  is_cover_show: number;
  is_preview: number;
  only_vip_download: number;
  resource: string;
  watch_platform: number;
}

interface Rating {
  count: number;
  score: number;
}

interface Publish {
  is_finish: number;
  is_started: number;
  pub_time: string;
  pub_time_show: string;
  unknow_pub_date: number;
  weekday: number;
}

interface Positive {
  id: number;
  title: string;
}

interface Payment {
  discount: number;
  pay_type: Paytype;
  price: string;
  promotion: string;
  tip: string;
  view_start_time: number;
  vip_discount: number;
  vip_first_promotion: string;
  vip_promotion: string;
}

interface Paytype {
  allow_discount: number;
  allow_pack: number;
  allow_ticket: number;
  allow_time_limit: number;
  allow_vip_discount: number;
  forbid_bb: number;
}

interface Newep {
  desc: string;
  id: number;
  is_new: number;
  title: string;
}

interface Freya {
  bubble_desc: string;
  bubble_show_cnt: number;
  icon_show: number;
}

export interface Episode {
  aid: number;
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  bvid: string;
  cid: number;
  cover: string;
  dimension: Dimension;
  duration: number;
  from: string;
  id: number;
  is_view_hide: boolean;
  link: string;
  long_title: string;
  pub_time: number;
  pv: number;
  release_date: string;
  rights: Rights;
  share_copy: string;
  share_url: string;
  short_link: string;
  status: number;
  subtitle: string;
  title: string;
  vid: string;
}

interface Rights {
  allow_demand: number;
  allow_dm: number;
  allow_download: number;
  area_limit: number;
}

interface Dimension {
  height: number;
  rotate: number;
  width: number;
}

export interface Badgeinfo {
  bg_color: string;
  bg_color_night: string;
  text: string;
}

interface Area {
  id: number;
  name: string;
}

interface Activity {
  head_bg_url: string;
  id: number;
  title: string;
}