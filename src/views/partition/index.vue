<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">分区</b>
    </div>
  </div>
  <div class="contain-wrap">
    <template v-for="item in ridList">
      <el-card 
        shadow="hover"
        class="partition-wrap"
        v-if="item.rid && item.isRank "
        @click="toRegion({code: item.code})"
        :body-style="{ padding: '20px'}">
        <div class="contain">
          <svg-icon class="icon" :name="item.code"></svg-icon>
          <div class="label">{{item.label}}</div>
        </div>
      </el-card>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ridList } from '@/utils/rid';
import { toRegion } from '@/utils/redirect';

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
.contain-wrap {
  padding-right: 20px;
  display: flex;
  flex-wrap: wrap;
  .partition-wrap {
    cursor: pointer;
    margin-right: 16px;
    margin-bottom: 14px;
    border-radius: 8px;
    .contain {
      width: 60px;
      height: 60px;
      text-align: center;
      .icon {
        font-size: 48px;
      }
    }
  }
}
</style>