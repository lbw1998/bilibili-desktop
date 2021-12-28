import { LikeMeList, ReplyMeList } from '@/request/model/reply/info';
import { UserInfo, UserState } from '@/request/model/user/info';
import { request } from '@/utils/axios';

// 获取侧边栏信息
export const getUserInfoApi = () => {
  return request<UserInfo>({
    url: 'https://api.bilibili.com/nav',
    method: 'get'
  })
}


// 获取粉丝关注等数量
export const getUserStateApi = () => {
  return request<UserState>({
    url: 'https://api.bilibili.com/x/web-interface/nav/stat',
    method: 'get',
  })
}
// 获取回复我的评论
export const getReplyMeApi = () => {
  return request<ReplyMeList>({
    url: 'https://api.bilibili.com/x/msgfeed/reply',
    method: 'get',
  })
}
// 获取@我的
export const getAtMeApi = () => {
  return request<ReplyMeList>({
    url: 'https://api.bilibili.com/x/msgfeed/at',
    method: 'get',
  })
}
// 获取赞我的
export const getLikeMeApi = () => {
  return request<LikeMeList>({
    url: 'https://api.bilibili.com/x/msgfeed/like',
    method: 'get',
  })
}
