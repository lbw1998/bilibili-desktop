import { RouteParamsRaw } from "vue-router";
import router from "@/router";
import { getVideoInfoApi } from "@/request/api/video/info";

interface ToVideoParams extends RouteParamsRaw {
  aid?: number
  bvid?: string
}
// 跳转到视频播放页面
export const toVideo = (query:ToVideoParams) => {
  router.push({name:'video', query})
}

// 不知道是Video页面还是Media页面
export const toVideoOrMedia = async (query:ToVideoParams) => {
  const { data: {redirect_url, cid} } = await getVideoInfoApi({aid: query.aid, bvid: query.bvid})
  // media页面会含有redirect_url属性
  if (redirect_url) {
    let ep_id = redirect_url.replace('https://www.bilibili.com/bangumi/play/ep', '')
    if (!/^[0-9]*$/.test(ep_id)) {
      ep_id = ep_id.split('?')[0]
    }
    toMedia({ep_id:ep_id as unknown as number, cid})
  } else {
    router.push({name:'video', query})
  }
}

interface ToMediaParams extends RouteParamsRaw {
  ep_id?: number,
  season_id?: number,
  cid?: number
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