import { RouteParamsRaw } from "vue-router";
import router from "@/router";

interface ToVideoParams extends RouteParamsRaw {
  aid: number
}
// 跳转到视频详情页面
export const toVideo = (query:ToVideoParams) => {
  router.push({name:'video', query})
}

// 跳转到搜索情页面
export const toSearch = (query:RouteParamsRaw) => {
  router.push({name:'search', query})
}