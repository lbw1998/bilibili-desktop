import { request } from '@/utils/axios';

interface ReplyParams {
  type: 1 | 2
  oid: number
  sort?: 0 | 1 | 2
}
export const getReplyInfo = (params:ReplyParams) => {
  return request({
    url: 'https://api.bilibili.com/x/web-interface/view',
    method: 'get',
    params
  })
}