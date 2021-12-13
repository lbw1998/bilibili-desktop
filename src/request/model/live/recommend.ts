export interface LiveRecommendInfo {
  area_entrance_v2: Areaentrancev2;
  room_list: Roomlist[];
  activity_card_v2?: any;
  recommend_room_list: Recommendroomlist[];
  banner: Banner[];
}

interface Banner {
  id: number;
  title: string;
  location: string;
  position: number;
  pic: string;
  link: string;
  weight: number;
  room_id: number;
  up_id: number;
  parent_area_id: number;
  area_id: number;
  live_status: number;
  av_id: number;
}

interface Recommendroomlist {
  area_v2_id: number;
  area_v2_parent_id: number;
  area_v2_name: string;
  area_v2_parent_name: string;
  cover: string;
  link: string;
  online: number;
  roomid: number;
  title: string;
  uname: string;
  face: string;
  rec_status: number;
  show_callback: string;
  click_callback: string;
  session_id: string;
  group_id: number;
  special_id: number;
  pk_id: number;
  up_id: number;
  new_switch_info: Newswitchinfo;
}

interface Newswitchinfo {
  'room-recommend-live_off': number;
  'room-player-watermark': number;
}

interface Roomlist {
  module_info: Moduleinfo;
  list: List2[];
}

interface List2 {
  head_box?: Headbox;
  area_v2_id: number;
  area_v2_parent_id: number;
  area_v2_name: string;
  area_v2_parent_name: string;
  broadcast_type: number;
  cover: string;
  link: string;
  online: number;
  pendant_Info: PendantInfo;
  roomid: number;
  title: string;
  uname: string;
  face: string;
  verify: Verify;
  uid: number;
  keyframe: string;
  is_auto_play: number;
  head_box_type: number;
  flag: number;
  session_id: string;
  group_id: number;
  show_callback: string;
  click_callback: string;
  special_id: number;
}

interface Verify {
  role: number;
  desc: string;
  type: number;
}

interface PendantInfo {
  '1'?: _1;
  '2'?: _1;
}

interface _1 {
  type: string;
  name: string;
  position: number;
  text: string;
  bg_color: string;
  bg_pic: string;
  pendant_id: number;
  priority: number;
  created_at: number;
}

interface Headbox {
  name: string;
  value: string;
  desc: string;
}

interface Moduleinfo {
  id: number;
  link: string;
  pic: string;
  title: string;
  type: number;
  sort: number;
  count: number;
}

interface Areaentrancev2 {
  list: List[];
}

interface List {
  id: number;
  link: string;
  pic: string;
  title: string;
  area_v2_id: number;
  area_v2_parent_id: number;
  tag_type: number;
  is_hot: number;
}