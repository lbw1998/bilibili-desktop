import { getPlayInfoApi, PlayInfoParams } from "@/request/api/media/playInfo";
import { PlayInfo } from "@/request/model/media/playInfo";
import { reactive } from "vue";

export function useMediaPlayInfo() {
  const mediaPlayInfo = reactive(<PlayInfo>{
    durl: [{}],
    timelength: 0,
    accept_quality: [0],
    accept_description: ['']
  })
  const getMediaPlayInfo = (params:PlayInfoParams) => new Promise<void>( async (resolve, reject) => {
    const data = await getPlayInfoApi(params)
    const { result } = data
    mediaPlayInfo.durl = result.durl
    mediaPlayInfo.timelength = result.timelength
    mediaPlayInfo.accept_quality = result.accept_quality
    mediaPlayInfo.accept_description = result.accept_description
    resolve()
  })  
  return { mediaPlayInfo, getMediaPlayInfo }
}