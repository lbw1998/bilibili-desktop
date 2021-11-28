import { ref } from "vue";
import { relatedApi, RelagedParams } from "@/api/video/recommend";
import { VideoInfo } from "@/api/video/info";

export default function usePlayInfo() {
  const relatedInfo = ref<VideoInfo[]>([])
  const getRelatedInfo = async (params:RelagedParams) => {
      const { data } = await relatedApi(params)
      relatedInfo.value = data
  }
  return { relatedInfo, getRelatedInfo}
}

