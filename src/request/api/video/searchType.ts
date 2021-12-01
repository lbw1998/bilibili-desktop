import { request } from "@/utils/axios"


interface SearchTypeParams {
  search_type: 'video' | 'media_bangumi' | 'live_room' | 'article' | 'bili_user' 
  keyword: string
  order?: 'totalrank' | 'click' | 'pubdate' | 'dm'
  duration?: 0 | 1 | 2 | 3 | 4
  tids?: number
  page?: number
}

export const searchTypeApi = (params:SearchTypeParams) => {
  return request({
    url: 'https://api.bilibili.com/x/web-interface/search/type',
    method: 'get',
    params
  })
}