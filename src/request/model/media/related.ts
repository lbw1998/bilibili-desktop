export interface MediaRelatedInfo {
  relates: Relate[];
  season: Season[];
}

interface Season {
  actor: string;
  badge: string;
  badge_info: Badgeinfo;
  badge_type: number;
  cover: string;
  from: number;
  new_ep: Newep;
  rating: Rating;
  report: Report;
  rights: Rights;
  season_id: number;
  season_type: number;
  stat: Stat;
  styles: Style[];
  subtitle: string;
  title: string;
  url: string;
  user_status: Userstatus;
}

interface Userstatus {
  follow: number;
}

interface Style {
  id: number;
  name: string;
}

interface Stat {
  danmaku: number;
  follow: number;
  view: number;
}

interface Rights {
  can_watch: number;
  resource: string;
}

interface Report {
  is_wtgt: number;
  seriesId: number;
}

interface Rating {
  count: number;
  score: number;
}

interface Newep {
  cover: string;
  index_show: string;
}

interface Badgeinfo {
  bg_color: string;
  bg_color_night: string;
  text: string;
}

interface Relate {
  desc1: string;
  desc2: string;
  item_id: number;
  pic: string;
  title: string;
  type: number;
  type_name: string;
  url: string;
}