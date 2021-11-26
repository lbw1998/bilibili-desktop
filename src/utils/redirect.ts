import { RouteParamsRaw } from "vue-router";
import router from "@/router";

// 跳转到视频详情页面
export const toVideo = (params:RouteParamsRaw) => {
  router.push({name:'video', params})
}