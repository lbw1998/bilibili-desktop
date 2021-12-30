import { reactive } from "vue";
import store from "@/utils/store";
import { getBiliCSRF } from "@/utils/cookie";
import { getUserInfoApi, getUserStateApi } from "@/request/api/user/info";
import { UserInfo, UserState } from "@/request/model/user/info";

export default function useUserInfo() {
  const userInfo = reactive(<UserInfo>{
    isLogin: false,
    face: '',
    uname: '',
    vipStatus: 0,
    vipType: 0,
    vip: {},
    vip_nickname_color: '',
    level_info: {},
    money: 0,
    wallet: {},
  })
  const userState = reactive(<UserState>{
    follower: 0,
    following: 0,
    dynamic_count: 0
  })
  const getUserInfo = async () => {
    const csrf = getBiliCSRF()
    if (!csrf) return
    const resInfo = await getUserInfoApi()
    const resState = await getUserStateApi()
    if (resState?.code == 0) {
      userState.follower= resState.data.follower
      userState.following= resState.data.following
      userState.dynamic_count= resState.data.dynamic_count
    }
    if (resInfo?.code == 0) {
      store.user.mid = resInfo.data.mid
      userInfo.face = resInfo.data.face
      userInfo.vipStatus = resInfo.data.vipStatus
      userInfo.vipType = resInfo.data.vipType
      userInfo.vip = resInfo.data.vip
      userInfo.uname = resInfo.data.uname
      userInfo.vip_nickname_color = resInfo.data.vip_nickname_color
      userInfo.level_info = resInfo.data.level_info
      userInfo.money = resInfo.data.money
      userInfo.wallet = resInfo.data.wallet
    }
    store.user.isLogin = resInfo.data.isLogin
    store.user.mid = resInfo.data.mid
    store.user.csrf = csrf
  }
  return {userInfo, userState, getUserInfo}
}

