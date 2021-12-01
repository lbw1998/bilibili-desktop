import { UserInfo, UserState } from '@/request/model/system/user';
import { request } from '@/utils/axios';

// 获取侧边栏信息
export const getUserInfoApi = () => {
  return request<UserInfo>({
    url: 'https://api.bilibili.com/nav',
    method: 'get'
  })
}


// 获取粉丝关注登数量
export const getUserStateApi = () => {
  return request<UserState>({
    url: 'https://api.bilibili.com/x/web-interface/nav/stat',
    method: 'get',
  })
}
