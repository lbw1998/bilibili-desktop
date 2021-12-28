export interface HistoryData {
  cursor: Cursor;
  tab: Tab[];
  list: HistoryItem[];
}

export interface HistoryItem {
  title: string;
  long_title: string;
  cover: string;
  covers?: any;
  uri: string;
  history: History;
  videos: number;
  author_name: string;
  author_face: string;
  author_mid: number;
  view_at: number;
  progress: number;
  badge: string;
  show_title: string;
  duration: number;
  current: string;
  total: number;
  new_desc: string;
  is_finish: number;
  is_fav: number;
  kid: number;
  tag_name: string;
  live_status: number;
}

interface History {
  oid: number;
  epid: number;
  bvid: string;
  page: number;
  cid: number;
  part: string;
  business: string;
  dt: number;
}

interface Tab {
  type: string;
  name: string;
}

interface Cursor {
  max: number;
  view_at: number;
  business: string;
  ps: number;
  is_end: boolean;
}