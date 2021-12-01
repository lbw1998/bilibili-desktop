<template>
  <el-card class="card-wrap" :body-style="{ padding: '0px' }">
    <el-image class="image" :src="pic" >
      <template #placeholder>
        <div class="image" v-loading="true"></div>
      </template>
    </el-image>
    <div class="card-info">
      <el-avatar v-if="face" :size="42" class="face" :src="face"></el-avatar>
      <div class="owner">
        <span class="owner-name">{{name}}</span>
      </div>
      <div class="card-title">
        <b v-html="title" :title="title"></b>
      </div>
      <div class="card-bottom">
        <svg-icon name="view" />
        <span class="view">{{formatNumber(view)}}</span>
        <svg-icon name="barrage" />
        <span class="view">{{like?formatNumber(like):''}}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { formatNumber } from '@/utils/tools';
defineProps<{
  pic: string,
  face?: string,
  name: string,
  title: string,
  view: number,
  like?: number
}>()

</script>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  margin-bottom: 10px;
  .image {
    width: 100%;
    height: 186px;
  }
  .card-info {
    padding: 0px 8px 4px;
    box-sizing: border-box;
    position: relative;
    .face {
      position: absolute;
      right: 12px;
      top: -25px;
      border: 1px solid rgba($color: #999, $alpha: 0.2);
    }
    .owner {
      display: flex;
      align-items: center;
      .owner-name {
        color: #999999;
      }
    }
    .card-title {
      width: 270px;
      height: 40px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      :deep(.keyword) {
        color: #f25d8e;
        font-style: normal;
      }
    }
    .card-bottom {
      span {
        font-size: 12px;
        margin: 0 8px 0 5px;
      }
    }
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: transform 0.3s ;
  }
}
</style>