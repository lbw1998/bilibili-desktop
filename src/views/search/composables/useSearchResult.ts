import { searchAllApi, searchTypeApi, SuggestParams, SearchTypeParams } from "@/request/api/video/search";
import { SearchAllResult, SearchTypeResult } from "@/request/model/video/search";
import { rejects } from "assert";
import { reactive, ref } from "vue";

export default function useSearchResult() {
  const resultAllResult = reactive(<SearchAllResult>{
    top_tlist: {}
  })
  const searchAllResult = async (params:SuggestParams) =>  {
      const { data } = await searchAllApi(params)
      resultAllResult.top_tlist = data.top_tlist
  }
  const searchTypeResult = (params:SearchTypeParams) => new Promise<SearchTypeResult>(async(resolve, reject) =>{
    const { data, code } = await searchTypeApi(params)
    if (code == 0) {
      resolve(data)
    } else {
      reject()
    }
  })  
  return {  resultAllResult, searchAllResult, searchTypeResult}
}

