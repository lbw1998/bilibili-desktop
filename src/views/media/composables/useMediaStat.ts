import { getMediaStatApi, MediaStatParams } from "@/request/api/media/info";
import { MediaStatInfo } from "@/request/model/media/info";
import { reactive } from "vue";

export function useMediaStat() {
  const mediaStat = reactive(<MediaStatInfo>{
    coins: 0,
    likes: 0,
    danmakus: 0,
    views: 0,
    follow: 0
  })
  const getMediaStat = async (params:MediaStatParams) => {
    const { result } = await getMediaStatApi(params)
    mediaStat.coins = result!.coins
    mediaStat.likes = result!.likes
    mediaStat.danmakus = result!.danmakus
    mediaStat.views = result!.views
    mediaStat.follow = result!.follow
  }
  return { mediaStat, getMediaStat }
}