import { RouteParamsRaw } from "vue-router";
import router from "@/router";

interface ToVideoParams extends RouteParamsRaw {
  aid?: number
  bvid?: string
}
// 跳转到视频播放页面
export const toVideo = (query:ToVideoParams) => {
  router.push({name:'video', query})
}

interface ToMediaParams extends RouteParamsRaw {
  ep_id: number,
  season_id: number,
  bgmcount?: string
}
// 跳转到番剧/影视播放页面
export const toMedia= (query:ToMediaParams) => {
  router.push({name:'media', query})
}

interface toRegionParams extends RouteParamsRaw {
  code: string
}
// 跳转到分区页面
export const toRegion= (query:toRegionParams) => {
  router.push({name:'region', query})
}

// 跳转到搜索情页面
export const toSearch = (query:RouteParamsRaw) => {
  router.push({name:'search', query})
}