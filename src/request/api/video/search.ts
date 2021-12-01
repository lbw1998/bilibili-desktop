import { SearchData, SearchAllResult, SearchTypeResult } from "@/request/model/video/search"
import { request } from "@/utils/axios"

// 综合搜索
export interface SuggestParams {
  keyword: string
}
export const searchAllApi = (params:SuggestParams) => {
  return request<SearchAllResult>({
    url: 'https://api.bilibili.com/x/web-interface/search/all/v2',
    method: 'get',
    params
  })
}

// 搜索推荐列表
interface SearchSuggestParams {
  term: string
}
export const searchSuggestApi = (params:SearchSuggestParams) => {
  return request<SearchData>({
    url: 'http://s.search.bilibili.com/main/suggest',
    method: 'get',
    params
  })
}

// 分类搜索
export interface SearchTypeParams {
  search_type: 'video' | 'media_bangumi' | 'live_room' | 'article' | 'bili_user' 
  keyword: string
  order?: 'totalrank' | 'click' | 'pubdate' | 'dm'
  duration?: 0 | 1 | 2 | 3 | 4
  tids?: number
  page?: number
}
export const searchTypeApi = (params:SearchTypeParams) => {
  return request<SearchTypeResult>({
    url: 'https://api.bilibili.com/x/web-interface/search/type',
    method: 'get',
    params
  })
}