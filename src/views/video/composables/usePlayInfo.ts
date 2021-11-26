import { getPlayInfoApi, PlayInfoParams, PlayInfo } from "@/api/video/playInfo";
import { reactive } from "vue";

export default function usePlayInfo() {
  const playInfo = reactive(<PlayInfo>{
    durl: [{}]
  })
  const getPlayInfo = (params:PlayInfoParams) => new Promise<void>( async resolve => {
      const { data } = await getPlayInfoApi(params)
      playInfo.durl = data.durl
      resolve()
  })
  return { playInfo, getPlayInfo}
}

