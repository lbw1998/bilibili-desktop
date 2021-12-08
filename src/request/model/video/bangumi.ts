export interface BangumiInfo {
  has_next: number;
  jump_module_id: number;
  modules: Module[];
  report: Report5;
  style: Style;
}

export interface BangumiTimeline {
  area: string;
  arealimit: number;
  attention: number;
  bangumi_id: number;
  bgmcount: string;
  cover: string;
  danmaku_count: number;
  ep_id: number;
  favorites: number;
  is_finish: number;
  lastupdate: number;
  lastupdate_at: string;
  new: boolean;
  play_count: number;
  pub_time: string;
  season_id: number;
  season_status: number;
  spid: number;
  square_cover: string;
  title: string;
  viewRank: number;
  weekday: number;
}

export interface BangumiFollow {
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  cover: string;
  new_ep: Newep;
  progress: Progress;
  season_id: number;
  season_type: number;
  season_type_name: string;
  title: string;
}

interface Progress {
  index_show: string;
  last_ep_id: number;
  last_time: number;
}

interface Newep {
  cover: string;
  id: number;
  index_show: string;
  is_new: number;
}

interface Style {
  pinned: number;
  status_bar_color_type: number;
  tab_text_select_color: string;
  tab_text_unselect_color: string;
  top_color: string;
}

interface Report5 {
  page_id: string;
}

interface Module {
  attr: Attr;
  headers: Header[];
  items: BangumiItems;
  module_id: number;
  report?: Report4;
  size: number;
  style: string;
  sub_title: string;
  title: string;
  type: number;
  wid: number[];
}

type BangumiItems = (Item | Banner | Items3 | HotBangumi | Items5 | Items6 | Items7 | Items8 | Items9)[]

interface Report4 {
  module_id: string;
  module_type: string;
}

interface Items9 {
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  blink: string;
  cover: string;
  cursor: string;
  is_new: number;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  report: Report3;
  score: number;
  title: string;
  wid: number;
}

interface Items8 {
  badge_info: Badgeinfo;
  blink: string;
  cover: string;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  report: Report3;
  score: number;
  title: string;
  wid: number;
  check?: string;
}

interface Items7 {
  aid: number;
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  blink: string;
  cid: number;
  cover: string;
  desc: string;
  episode_id: number;
  has_next: number;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  new_ep: Newep;
  oid: number;
  report: Report3;
  score: number;
  season_id: number;
  season_styles: string;
  season_type: number;
  stat: Stat2;
  title: string;
  type: string;
  wid: number;
}

interface Items6 {
  badge?: string;
  badge_info?: Badgeinfo;
  badge_type?: number;
  blink: string;
  cover: string;
  desc: string;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  new_ep: Newep;
  oid: number;
  report: Report3;
  score: number;
  season_id: number;
  season_styles: string;
  season_type: number;
  stat: Stat2;
  title: string;
  type: string;
  wid: number;
}

interface Items5 {
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  blink: string;
  cover: string;
  desc: string;
  is_auto: number;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  new_ep: Newep;
  oid: number;
  report: Report3;
  score: number;
  season_id: number;
  season_styles: string;
  season_type: number;
  stat: Stat2;
  title: string;
  type: string;
  wid: number;
}

export interface HotBangumi {
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  blink: string;
  cover: string;
  desc: string;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  new_ep: Newep;
  oid: number;
  report: Report3;
  score: number;
  season_id: number;
  season_styles: string;
  season_type: number;
  stat: Stat2;
  title: string;
  type: string;
  wid: number;
}

export interface Items3 {
  badge_info: Badgeinfo;
  blink: string;
  cover: string;
  cursor: string;
  is_new: number;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  oid: number;
  playlist_id: number;
  report: Report3;
  score: number;
  title: string;
  type: string;
  wid: number;
}

export interface Banner {
  aid?: number;
  badge?: string;
  badge_info: Badgeinfo;
  badge_type?: number;
  blink: string;
  cid?: number;
  cover: string;
  cursor: string;
  desc: string;
  episode_id?: number;
  is_preview: number;
  item_id: number;
  link: string;
  link_type: number;
  link_value: number;
  new_ep?: Newep;
  oid?: number;
  report: Report3;
  score: number;
  season_id?: number;
  season_styles?: string;
  season_type?: number;
  stat?: Stat2;
  title: string;
  type?: string;
  wid: number;
}

interface Stat2 {
  danmaku: number;
  follow: number;
  follow_view: string;
  view: number;
}

interface Report3 {
  card_type: string;
  index: string;
  item_id: string;
  module_id: string;
  module_type: string;
  oid: string;
  playlist_id: string;
  position_id: string;
  season_type: string;
}

interface Item {
  cards: Card[];
  is_preview: number;
  item_id: number;
  link: string;
  report: Report2;
  score: number;
  title: string;
}

interface Report2 {
  tab_id: string;
}

interface Card {
  badge: string;
  badge_info?: Badgeinfo;
  badge_type: number;
  can_watch: number;
  cover: string;
  link: string;
  new_ep?: Newep;
  oid: number;
  pts: string;
  report: Report;
  season_styles?: string;
  season_type: number;
  stat: Stat;
  title: string;
  type: string;
}

interface Stat {
  danmaku: number;
  follow: number;
  view: number;
}

interface Report {
  index: string;
  item_id: string;
  module_id: string;
  module_type: string;
  oid: string;
  season_type: string;
  tab_id: string;
}

interface Newep {
  cover: string;
  id: number;
  index_show: string;
}

export interface Badgeinfo {
  bg_color: string;
  bg_color_night: string;
  text: string;
  text_size: number;
}

interface Header {
  icon: string;
  title: string;
  url: string;
}

interface Attr {
  auto: number;
  follow: number;
  header: number;
  random: number;
}