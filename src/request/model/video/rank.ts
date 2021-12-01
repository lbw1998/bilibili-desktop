export interface RankInfo {
  note: string;
  list: RankVideoInfo[];
}

export interface RankVideoInfo {
  aid: string;
  bvid: string;
  author: string;
  coins: number;
  duration: string;
  mid: number;
  pic: string;
  cid: number;
  play: number;
  pts: number;
  title: string;
  trend?: any;
  video_review: number;
  rights: Rights;
  others?: Other[];
}

interface Other {
  aid: number;
  bvid: string;
  play: number;
  video_review: number;
  coins: number;
  pts: number;
  title: string;
  pic: string;
  duration: string;
  rights: Rights;
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
