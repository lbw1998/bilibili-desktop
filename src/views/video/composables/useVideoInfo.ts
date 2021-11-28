import { getVideoInfoApi, VideoInfoParams } from "@/api/video/info";
import { VideoInfo } from "@/api/video/info";
import { reactive } from "vue";

export default function useVideoInfo() {
  const videoInfo = reactive(<VideoInfo>{
    aid: 0,
    bvid: '',
    cid: 0,
    title: '',
    desc: '',
    owner: {},
    stat: {}
  })
  const getVideoInfo =  (params:VideoInfoParams) => new Promise<void>(async(resolve) => {
      const {data} = await getVideoInfoApi(params)
      videoInfo.aid = data.aid
      videoInfo.bvid = data.bvid
      videoInfo.cid = data.cid
      videoInfo.title = data.title
      videoInfo.desc = data.desc
      videoInfo.owner = data.owner
      videoInfo.stat = data.stat
      resolve()
  })
  return { videoInfo, getVideoInfo }
}