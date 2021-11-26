import { getVideoInfoApi, VideoInfoParams } from "@/api/video/info";
import { VideoInfo } from "@/api/video/info";
import { reactive } from "vue";

export default function useVideoInfo() {
  const videoInfo = reactive(<VideoInfo>{
    avid: '',
    bvid: '',
    cid: 0
  })
  const getVideoInfo =  (params:VideoInfoParams) => new Promise<void>(async(resolve) => {
      const {data} = await getVideoInfoApi(params)
      videoInfo.avid = data.avid
      videoInfo.bvid = data.bvid
      videoInfo.cid = data.cid
      resolve()
  })
  return { videoInfo, getVideoInfo }
}