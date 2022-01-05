
import { getPlayInfoApi, PlayInfoParams } from "@/request/api/video/playInfo";
import { PlayInfo } from "@/request/model/video/playInfo";
import { reactive } from "vue";

export default function usePlayInfo() {
  const playInfo = reactive(<PlayInfo>{
    durl: [{}],
    timelength: 0,
    accept_quality: [0],
    accept_description: ['']
  })
  const getPlayInfo = (params:PlayInfoParams) => new Promise<void>( async resolve => {
      const { data } = await getPlayInfoApi(params)
      playInfo.durl = data.durl
      playInfo.timelength = data.timelength
      playInfo.accept_quality = data.accept_quality
      playInfo.accept_description = data.accept_description
      resolve()
  })
  return { playInfo, getPlayInfo}
}

