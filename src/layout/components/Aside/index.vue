<template>
  <el-menu default-active="/recommend" class="aside" :router="true" :collapse="true">
    <div class="logo-wrap">
      <img src="@/assets/img/logo.png" alt="" width="48">
    </div>
    <el-menu-item index="/recommend">
      <el-icon>
        <svg-icon name="house" size="24" />
      </el-icon>
      <template #title>推荐</template>
    </el-menu-item>
    <el-menu-item index="/hot">
      <el-icon>
        <svg-icon name="hot" size="24" />
      </el-icon>
      <template #title>热门</template>
    </el-menu-item>
    <el-menu-item index="/ranking">
      <el-icon>
        <svg-icon name="trophy" size="24" />
      </el-icon>
      <template #title>排行榜</template>
    </el-menu-item>
    <el-menu-item index="/partition">
      <el-icon>
        <svg-icon name="partition" size="24" />
      </el-icon>
      <template #title>分区</template>
    </el-menu-item>
    <el-menu-item index="/bangumi?code=anime">
      <el-icon>
        <svg-icon name="bangumi" size="24" />
      </el-icon>
      <template #title>番剧</template>
    </el-menu-item>
    <el-menu-item index="/bangumi?code=guochuang">
      <el-icon>
        <svg-icon name="guochuang1" size="24" />
      </el-icon>
      <template #title>国创</template>
    </el-menu-item>
    <!-- <el-menu-item index="/live">
      <el-icon><VideoCamera /></el-icon>
      <template #title>直播</template>
    </el-menu-item> -->
    <el-menu-item index="/dynamic">
      <el-icon>
        <svg-icon name="dynamic" size="24" />
      </el-icon>
      <template #title>动态</template>
    </el-menu-item>
    <div class="user">
      <el-avatar :size="38" v-if="!store.user?.isLogin" @click="showDialog">
        <svg-icon name="user" />
      </el-avatar>
      <el-avatar :size="38" v-else :src="userInfo.face" @click="userDialog = true" ></el-avatar>
    </div>
    <UserInfoVue
      :visible="userDialog"
      :user-info="userInfo"
      :user-state="userState"
      @changeVisible="(visible) => userDialog = visible"
      @logout="logout"
    >
    </UserInfoVue>
    <el-dialog
      v-model="loginDialog"
      title="扫码登录"
      width="350px"
      :close-on-click-modal="false"
      @close="clearTimer"
    >
      <div class="dialog-contain">
        <div v-loading="loading" class="qrcode-wrap">
          <qrcode-vue  :value="loginUrl" :size="250" level="L" />
        </div>
        <span>请使用移动客户端扫描上方二维码</span>
      </div>
    </el-dialog>
  </el-menu>
</template>

<script setup lang="ts">
import qs from 'qs'
import { ref } from "vue";
import store from "@/utils/store"
import QrcodeVue from 'qrcode.vue'
import { ElNotification } from "element-plus";
import UserInfoVue from "@/components/UserInfo.vue";
import useUserInfo from "./composables/getUserInfo";
import { getBiliCSRF, setBiliCSRF, clearCookie } from "@/utils/cookie";
import { getLoginUrlApi, loginApi, logoutApi } from "@/request/api/system/login";

const loginDialog = ref(false)
const userDialog = ref(false)
const loginUrl = ref('')
const loading = ref(true)
let timer: NodeJS.Timer | null = null

const { getUserInfo, userInfo, userState } = useUserInfo()

getUserInfo()
// 获取扫描URL
const getLoginUrl = async () => {
  loading.value = true
  const res = await getLoginUrlApi()
  loginUrl.value = res.data.url
  loading.value = false
  timer = setInterval(() => {
    login(res.data.oauthKey)
  }, 1000)
}

// 登录
const login = async (oauthKey:string) => {
  const res = await loginApi({oauthKey})
  if(res.code == 0) {
    loginDialog.value = false
    const cookie = qs.parse(res.data.url.split("?")[1])
    setBiliCSRF(cookie.bili_jct, {expires: ~~(cookie.Expires/60/60/24).toFixed(0)})
    getUserInfo()
  }
}
// 清除定时器
const clearTimer = () => {
  clearInterval(~~timer!)
}
// 显示扫描弹框
const showDialog = () => {
  getLoginUrl()
  loginDialog.value = true
}
// 注销
const logout = async () => {
  const { code } = await logoutApi({biliCSRF: getBiliCSRF() || ''})
  if(code == 0 ) {
    userDialog.value = false
    clearCookie()
    ElNotification({
      title: '通知',
      message: '注销成功',
      type: 'success',
      position: 'top-right',
    })
    store.clearUserInfo()
  }
}


</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  -webkit-app-region: drag;
  .logo-wrap {
    padding-top: 55px;
    padding-bottom: 30px;
    text-align: center;
  }
  .el-menu-item {
    -webkit-app-region: no-drag;
  }
  .user {
    width: 63px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    -webkit-app-region: no-drag;
    .el-avatar {
      cursor: pointer;
    }
  }
  .dialog-contain {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .tip {
      color: #d8d8d8;
    }
  }
}
</style>
