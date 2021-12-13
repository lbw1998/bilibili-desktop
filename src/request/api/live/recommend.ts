import { LiveRecommendInfo } from "@/request/model/live/recommend";
import { request } from "@/utils/axios";

// 首页推荐接口
export const getLiveRecommendApi = () => {
  return request<LiveRecommendInfo>({
    url: "https://api.live.bilibili.com/xlive/web-interface/v1/index/getList?platform=web",
    method: 'get'
  })
}
// https://api.live.bilibili.com/room/v2/Index/getNavigate 父分区接口
// https://api.live.bilibili.com/xlive/web-interface/v1/second/getList?platform=web&parent_area_id=2&area_id=0&page=2 分区动态接口

