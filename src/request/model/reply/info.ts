export interface ReplyInfo {
  cursor: Cursor;
  hots?: any;
  notice?: any;
  replies: ReplyItem[];
  top: Top;
  top_replies: ReplyItem[];
  lottery_card?: any;
  folder: Folder;
  up_selection: Upselection;
  cm: Jumpurl;
  cm_info: Cminfo;
  effects: Effects;
  assist: number;
  blacklist: number;
  vote: number;
  lottery: number;
  config: Config;
  upper: Upper2;
  show_bvid: boolean;
  control: Control;
  note: number;
  callbacks?: any;
  root?: ReplyItem
}

interface Control {
  input_disable: boolean;
  root_input_text: string;
  child_input_text: string;
  giveup_input_text: string;
  bg_text: string;
  web_selection: boolean;
  answer_guide_text: string;
  answer_guide_icon_url: string;
  answer_guide_ios_url: string;
  answer_guide_android_url: string;
  show_type: number;
  show_text: string;
  disable_jump_emote: boolean;
}

interface Upper2 {
  mid: number;
}

interface Config {
  showadmin: number;
  showentry: number;
  showfloor: number;
  showtopic: number;
  show_up_flag: boolean;
  read_only: boolean;
  show_del_log: boolean;
}

interface Effects {
  preloading: string;
}

interface Cminfo {
  ads?: any;
}

interface Upselection {
  pending_count: number;
  ignore_count: number;
}

interface Top {
  admin?: any;
  upper: ReplyItem;
  vote?: any;
}

export interface ReplyItem {
  rpid: number;
  oid: number;
  type: number;
  mid: number;
  root: number;
  parent: number;
  dialog: number;
  count: number;
  rcount: number;
  state: number;
  fansgrade: number;
  attr: number;
  ctime: number;
  rpid_str: string;
  root_str: string;
  parent_str: string;
  like: number;
  action: number;
  member: Member;
  content: Content;
  replies: Reply[];
  assist: number;
  folder: Folder;
  up_action: Upaction;
  show_follow: boolean;
  invisible: boolean;
  reply_control: Replycontrol2;
  isTop: boolean
}

interface Replycontrol2 {
  sub_reply_entry_text: string;
  sub_reply_title_text: string;
  time_desc: string;
}

interface Reply {
  rpid: number;
  oid: number;
  type: number;
  mid: number;
  root: number;
  parent: number;
  dialog: number;
  count: number;
  rcount: number;
  state: number;
  fansgrade: number;
  attr: number;
  ctime: number;
  rpid_str: string;
  root_str: string;
  parent_str: string;
  like: number;
  action: number;
  member: Member2;
  content: Content2;
  replies?: any;
  assist: number;
  folder: Folder;
  up_action: Upaction;
  show_follow: boolean;
  invisible: boolean;
  reply_control: Replycontrol;
}

interface Replycontrol {
  time_desc: string;
}

interface Upaction {
  like: boolean;
  reply: boolean;
}

interface Folder {
  has_folded: boolean;
  is_folded: boolean;
  rule: string;
}

interface Content2 {
  message: string;
  plat: number;
  device: string;
  members: Member3[][];
  jump_url: Jumpurl;
  max_line: number;
  emote?: any;
}

interface Member3 {
  mid: string;
  uname: string;
  sex: string;
  sign: string;
  avatar: string;
  rank: string;
  DisplayRank: string;
  face_nft: number;
  level_info: Levelinfo;
  pendant: Pendant;
  nameplate: Nameplate;
  official_verify: Officialverify;
  vip: Vip;
}

interface Member2 {
  mid: string;
  uname: string;
  sex: string;
  sign: string;
  avatar: string;
  rank: string;
  DisplayRank: string;
  face_nft: number;
  level_info: Levelinfo;
  pendant: Pendant;
  nameplate: Nameplate;
  official_verify: Officialverify;
  vip: Vip;
  fans_detail?: any;
  following: number;
  is_followed: number;
  user_sailing: Usersailing2;
  is_contractor: boolean;
  contract_desc: string;
}

interface Usersailing2 {
  pendant?: (Pendant2 | null)[];
  cardbg?: (Cardbg | null)[];
  cardbg_with_focus?: any;
}

interface Content {
  message: string;
  plat: number;
  device: string;
  members: any[];
  jump_url: Jumpurl;
  max_line: number;
  emote?: any;
  topics?: string[];
  topics_uri?: any;
  topics_meta?: any;
}

interface Jumpurl {
}

interface Member {
  mid: string;
  uname: string;
  sex: string;
  sign: string;
  avatar: string;
  rank: string;
  DisplayRank: string;
  face_nft: number;
  level_info: Levelinfo;
  pendant: Pendant;
  nameplate: Nameplate;
  official_verify: Officialverify;
  vip: Vip;
  fans_detail?: any;
  following: number;
  is_followed: number;
  user_sailing: Usersailing;
  is_contractor: boolean;
  contract_desc: string;
}

interface Usersailing {
  pendant?: Pendant2;
  cardbg?: Cardbg;
  cardbg_with_focus?: any;
}

interface Cardbg {
  id: number;
  name: string;
  image: string;
  jump_url: string;
  fan: Fan;
  type: string;
}

interface Fan {
  is_fan: number;
  number: number;
  color: string;
  name: string;
  num_desc: string;
}

interface Pendant2 {
  id: number;
  name: string;
  image: string;
  jump_url: string;
  type: string;
  image_enhance: string;
  image_enhance_frame: string;
}

interface Vip {
  vipType: number;
  vipDueDate: number;
  dueRemark: string;
  accessStatus: number;
  vipStatus: number;
  vipStatusWarn: string;
  themeType: number;
  label: Label;
  avatar_subscript: number;
  avatar_subscript_url?: string;
  nickname_color: string;
}

interface Label {
  path: string;
  text: string;
  label_theme: string;
  text_color: string;
  bg_style: number;
  bg_color: string;
  border_color: string;
}

interface Officialverify {
  type: number;
  desc: string;
}

interface Nameplate {
  nid: number;
  name: string;
  image: string;
  image_small: string;
  level: string;
  condition: string;
}

interface Pendant {
  pid: number;
  name: string;
  image: string;
  expire: number;
  image_enhance: string;
  image_enhance_frame: string;
}

interface Levelinfo {
  current_level: number;
  current_min: number;
  current_exp: number;
  next_exp: number;
}

interface Cursor {
  all_count: number;
  is_begin: boolean;
  prev: number;
  next: number;
  is_end: boolean;
  mode: number;
  show_type: number;
  support_mode: number[];
  name: string;
}