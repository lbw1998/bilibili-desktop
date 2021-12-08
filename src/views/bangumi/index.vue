<!-- 动态 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">番剧</b>
      <refresh-button ></refresh-button>
    </div>
  </div>
  <el-tabs class="tabs-wrap">
    <el-tab-pane label="推荐">
      <RecommendTab></RecommendTab>
    </el-tab-pane>
    <!-- <el-tab-pane label="高分番剧">Config</el-tab-pane>
    <el-tab-pane label="官方索引">Role</el-tab-pane> -->
  </el-tabs>
</template>

<script lang="ts" setup>
import RefreshButton from '@/components/RefreshButton.vue'
import RecommendTab from './components/RecommendTab.vue';

</script>

<style lang="scss" scoped>
.header {
  padding-right: 20px;
  .title-bar {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    .title {
      font-size: 28px;
    }
  }
}
.tabs-wrap {
  .el-tab-pane {
    height: calc(100vh - 170px);
  }
}
</style>