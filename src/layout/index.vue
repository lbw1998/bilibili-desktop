<template>
  <el-container class="app-wrap">
    <el-aside v-show="!store.system.isFullScreen">
      <Aside></Aside>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
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
