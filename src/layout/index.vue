<template>
  <el-container class="app-wrap">
    <el-aside v-show="!store.system.isFullScreen">
      <Aside ref="AsideBar"></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header ref="Head"></Header>
      </el-header>
      <el-main>
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Aside from "./components/Aside/index.vue";
import Main from "./components/Main.vue";
import Header from "./components/Header.vue";
import store from "@/utils/store";
import { ref, provide } from "vue";

const AsideBar = ref()

// 校验是否登录
const verifyLogin = (cb:Function) => {
  const _this = this
  return function () {
    if (store.user.isLogin) {
      cb.apply(_this, arguments)
    } else {
      console.log(AsideBar.value.getLoginUrl);
      AsideBar.value.showDialog()
    }
  }
}
provide('verifyLogin', verifyLogin)

</script>

<style lang="scss" scoped>
.app-wrap {
  width: 100%;
  height: 100%;
  .el-aside {
    width: auto;
  }
  .el-header {
    height: 24px;
    padding: 0;
  }
  .el-main {
    padding-right: 0;
  }
}
</style>
