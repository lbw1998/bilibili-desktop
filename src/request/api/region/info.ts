import { RegionInfo, RegionNewInfo } from "@/request/model/region/info";
import { request } from "@/utils/axios";

interface RegionInfoParams {
  rid: number
}
export const getRegionInfoApi = (params:RegionInfoParams) => {
  return request<RegionInfo>({
    url: 'https://app.bilibili.com/x/v2/region/dynamic?appkey=4409e2ce8ffd12b8&build=5520400',
    method: 'get',
    params
  })
}

export const getRegionNewInfoApi = (params:RegionInfoParams) => {
  return request<RegionNewInfo>({
    url: 'https://api.bilibili.com/x/web-interface/dynamic/region?ps=20',
    method: 'get',
    params
  })
}