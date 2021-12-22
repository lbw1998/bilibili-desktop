import { ReplyInfo } from '@/request/model/reply/info';
import { request } from '@/utils/axios';

interface ReplyParams {
  type: number
  oid: number // 目标评论区id
  mode?: number // 0：仅按热度(默认) 1：按热度+时间 2：仅按时间
  next?: number
}
// 获取一级评论列表
export const getReplyInfoApi = (params:ReplyParams) => {
  return request<ReplyInfo>({
    url: 'https://api.bilibili.com/x/v2/reply/main',
    method: 'get',
    params
  })
}
interface SecondReplyParams {
  type: number
  oid: number // 目标评论区id
  root: number // 一级评论rpid
  pn?: number
  ps?: number
}
// 获取二级评论列表
export const getSecondReplyInfoApi = (params:SecondReplyParams) => {
  return request<ReplyInfo>({
    url: 'https://api.bilibili.com/x/v2/reply/reply',
    method: 'get',
    params
  })
}