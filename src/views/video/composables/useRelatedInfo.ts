import { RelagedParams, relatedApi } from "@/request/api/video/recommend";
import { VideoInfo } from "@/request/model/video/info";
import { ref } from "vue";

export default function usePlayInfo() {
  const relatedInfo = ref<VideoInfo[]>([])
  const getRelatedInfo = async (params:RelagedParams) => {
      const { data } = await relatedApi(params)
      relatedInfo.value = data
  }
  return { relatedInfo, getRelatedInfo}
}

