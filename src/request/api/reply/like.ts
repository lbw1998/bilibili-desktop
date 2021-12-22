import { request } from "@/utils/axios"

export interface likeReplyParams {
  type: number
  oid: number // 目标评论区id
  rpid: number // 评论ID
  action: number // 操作码
  csrf: string
}
// 点赞/取消点赞
export const likeReplyApi = (params:likeReplyParams) => {
  return request({
    url: 'https://api.bilibili.com/x/v2/reply/action',
    method: 'post',
    params
  })
}