import { getUserInfoApi } from "@/api/system/user";
import { UserInfo } from "@/api/system/user";
import { reactive } from "vue";

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
  
  const getUserInfo = async () => {
    const res = await getUserInfoApi()
    if (res.code == 0) {
      userInfo.face = res.data.face
      userInfo.vipStatus = res.data.vipStatus
      userInfo.vipType = res.data.vipType
      userInfo.vip = res.data.vip
      userInfo.uname = res.data.uname
      userInfo.vip_nickname_color = res.data.vip_nickname_color
      userInfo.level_info = res.data.level_info
      userInfo.money = res.data.money
      userInfo.wallet = res.data.wallet
    }
    userInfo.isLogin = res.data.isLogin
  }
  return {userInfo, getUserInfo}
}

