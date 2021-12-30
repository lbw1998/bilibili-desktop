import { reactive } from "vue";

const store = reactive({
  user: {
    isLogin: false,
    mid: 0,
    csrf: ""
  },
  system: {
    isFullScreen: false
  },
  clearUserInfo: () => {
    store.user.isLogin = false
    store.user.mid = 0
  }
})
export default store