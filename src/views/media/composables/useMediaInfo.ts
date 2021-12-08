import { getMediaInfoApi, MediaInfoParams } from "@/request/api/media/info";
import { MediaInfo } from "@/request/model/media/info";
import { reactive } from "vue";

export function useMediaInfo() {
  const mediaInfo = reactive(<MediaInfo>{
    cover: ''
  })
  const getMediaInfo = (params:MediaInfoParams) => new Promise<MediaInfo>( async (resolve) => {
    const { result } = await getMediaInfoApi(params)
    mediaInfo.cover = result!.cover
    mediaInfo.title = result!.title
    mediaInfo.stat = result!.stat
    mediaInfo.rating = result!.rating
    mediaInfo.new_ep = result!.new_ep
    mediaInfo.evaluate = result!.evaluate
    resolve(result!)
  })
  return {mediaInfo, getMediaInfo}
}