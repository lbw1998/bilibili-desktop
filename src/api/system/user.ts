import { request } from '@/utils/axios';

interface Qrcode {
  url: string;
  oauthKey: string;
}
// 获取登录URL
export const getLoginUrlApi = () => {
  return request<Qrcode>({
    url: 'https://passport.bilibili.com/qrcode/getLoginUrl',
    method: 'get'
  })
}

interface LoginParams {
  oauthKey: string
  gourl?: string
}

interface LoginData {
  url: string;
}

// 登录
export const loginApi = (data:LoginParams) => {
  return request<LoginData>({
    url: 'https://passport.bilibili.com/qrcode/getLoginInfo',
    method: 'post',
    data
  })
}
export interface UserInfo {
  isLogin: boolean;
  email_verified: number;
  face: string;
  face_nft: number;
  level_info: Levelinfo;
  mid: number;
  mobile_verified: number;
  money: number;
  moral: number;
  official: Official;
  officialVerify: OfficialVerify;
  pendant: Pendant;
  scores: number;
  uname: string;
  vipDueDate: number;
  vipStatus: number;
  vipType: number;
  vip_pay_type: number;
  vip_theme_type: number;
  vip_label: Viplabel;
  vip_avatar_subscript: number;
  vip_nickname_color: string;
  vip: Vip;
  wallet: Wallet;
  has_shop: boolean;
  shop_url: string;
  allowance_count: number;
  answer_status: number;
}

interface Wallet {
  mid: number;
  bcoin_balance: number;
  coupon_balance: number;
  coupon_due_time: number;
}

interface Vip {
  type: number;
  status: number;
  due_date: number;
  vip_pay_type: number;
  theme_type: number;
  label: Viplabel;
  avatar_subscript: number;
  nickname_color: string;
  role: number;
  avatar_subscript_url: string;
}

interface Viplabel {
  path: string;
  text: string;
  label_theme: string;
  text_color: string;
  bg_style: number;
  bg_color: string;
  border_color: string;
}

interface Pendant {
  pid: number;
  name: string;
  image: string;
  expire: number;
  image_enhance: string;
  image_enhance_frame: string;
}

interface OfficialVerify {
  type: number;
  desc: string;
}

interface Official {
  role: number;
  title: string;
  desc: string;
  type: number;
}

interface Levelinfo {
  current_level: number;
  current_min: number;
  current_exp: number;
  next_exp: number;
}
// 获取侧边栏信息
export const getUserInfoApi = () => {
  return request<UserInfo>({
    url: 'https://api.bilibili.com/nav',
    method: 'get'
  })
}