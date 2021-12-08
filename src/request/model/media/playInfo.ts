export interface PlayInfo {
  accept_format: string;
  code: number;
  seek_param: string;
  is_preview: number;
  fnval: number;
  video_project: boolean;
  fnver: number;
  type: string;
  bp: number;
  result: string;
  seek_type: string;
  from: string;
  video_codecid: number;
  durl: Durl[];
  no_rexcode: number;
  format: string;
  support_formats: Supportformat[];
  message: string;
  accept_quality: number[];
  quality: number;
  timelength: number;
  has_paid: boolean;
  clip_info_list: any[];
  accept_description: string[];
  status: number;
}

interface Supportformat {
  display_desc: string;
  superscript: string;
  need_login?: boolean;
  format: string;
  description: string;
  need_vip?: boolean;
  quality: number;
  new_description: string;
}

interface Durl {
  size: number;
  ahead: string;
  length: number;
  vhead: string;
  backup_url: any[];
  url: string;
  order: number;
  md5: string;
}