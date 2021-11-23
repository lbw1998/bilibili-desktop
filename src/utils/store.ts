import { reactive } from "vue";

const store = reactive({
  isLogin: false,
  mid: 0,
  clearUserInfo: () => {
    store.isLogin = false
    store.mid = 0
  }
})
export default store