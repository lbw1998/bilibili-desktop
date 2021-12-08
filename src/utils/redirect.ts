import { RouteParamsRaw } from "vue-router";
import router from "@/router";

interface ToVideoParams extends RouteParamsRaw {
  aid: number
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


// 跳转到搜索情页面
export const toSearch = (query:RouteParamsRaw) => {
  router.push({name:'search', query})
}