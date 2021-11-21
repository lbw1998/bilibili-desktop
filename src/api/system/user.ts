import { request } from '@/utils/axios';

interface Qrcode {
  url: string;
  oauthKey: string;
}

interface LoginParams {
  oauthKey: string
  gourl?: string
}

interface Data {
  url: string;
}

export const getLoginUrlApi = () => {
  return request<Qrcode>({
    url: 'https://passport.bilibili.com/qrcode/getLoginUrl',
    method: 'get'
  })
}

export const loginApi = (data:LoginParams) => {
  return request<Data>({
    url: 'https://passport.bilibili.com/qrcode/getLoginInfo',
    method: 'post',
    data
  })
}