export interface PlayInfo {
  from: string;
  result: string;
  message: string;
  quality: number;
  format: string;
  timelength: number;
  accept_format: string;
  accept_description: string[];
  accept_quality: number[];
  video_codecid: number;
  seek_param: string;
  seek_type: string;
  durl: Durl[];
  support_formats: Supportformat[];
  high_format?: any;
}

interface Supportformat {
  quality: number;
  format: string;
  new_description: string;
  display_desc: string;
  superscript: string;
}

interface Durl {
  order: number;
  length: number;
  size: number;
  ahead: string;
  vhead: string;
  url: string;
  backup_url: string[];
}