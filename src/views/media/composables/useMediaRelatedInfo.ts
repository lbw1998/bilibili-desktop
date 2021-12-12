import { getMediaRelatedInfoApi, MediaRelatedParams } from "@/request/api/media/related";
import { MediaRelatedInfo } from "@/request/model/media/related";
import { reactive } from "vue";

export function useMediaRelatedInfo() {
  const mediaRelatedInfo = reactive(<MediaRelatedInfo>{
    season: [{}]
  })
  const getMediaRelatedInfo = async (params:MediaRelatedParams) => {
    const {data} = await getMediaRelatedInfoApi(params)
    mediaRelatedInfo.season = data.season
  }
  return { mediaRelatedInfo, getMediaRelatedInfo }
}