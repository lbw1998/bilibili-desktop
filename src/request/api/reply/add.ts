import { request } from "@/utils/axios"

export interface addReplyParams {
  type: number
  oid: number // 目标评论区id
  message: string
  root?: number // 根评论rpid
  parent?: number // 父评论rpid
}
// 获取一级评论列表
export const addReplyApi = (params:addReplyParams) => {
  return request({
    url: 'https://api.bilibili.com/x/v2/reply/add',
    method: 'post',
    params
  })
}