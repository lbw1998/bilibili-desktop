import { LoginData, Qrcode } from '@/request/model/system/login';
import { request } from '@/utils/axios';

// 获取登录二维码URL
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
// 登录
export const loginApi = (data:LoginParams) => {
  return request<LoginData>({
    url: 'https://passport.bilibili.com/qrcode/getLoginInfo',
    method: 'post',
    data
  })
}

interface LogoutParams {
  biliCSRF: string
}
// 注销
export const logoutApi = (data:LogoutParams) => {
  return request({
    url: 'https://passport.bilibili.com/login/exit/v2',
    method: 'post',
    data
  })
}