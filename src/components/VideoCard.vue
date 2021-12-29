<template>
  <el-card class="card-wrap" :body-style="{ padding: '0px' }">
    <div class="image-wrap">
      <el-image class="image" :src="pic" >
        <template #placeholder>
          <div class="image" v-loading="true"></div>
        </template>
      </el-image>
      <p class="tip" v-if="duration">{{formatTime(duration)}}</p>
    </div>
    <div class="card-info">
      <el-avatar v-if="face" :size="42" class="face" :src="face"></el-avatar>
      <div class="owner">
        <span class="owner-name">{{name}}</span>
      </div>
      <div class="card-title">
        <b v-html="title" :title="title"></b>
      </div>
      <div class="card-bottom">
        <template v-if="view">
          <svg-icon name="view" color="#999999"/>
          <span class="view">{{formatNumber(view)}}</span>
        </template>
        <template v-if="like">
          <svg-icon name="barrage" color="#999999"/>
          <span class="view">{{formatNumber(like)}}</span>
        </template>
        <template v-if="online">
          <svg-icon name="user" color="#999999" />
          <span class="view">{{formatNumber(online)}}</span>
        </template>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { formatNumber,formatTime } from '@/utils/tools';
defineProps<{
  pic: string,
  face?: string,
  name: string,
  title: string,
  view?: number,
  like?: number,
  online?: number,
  duration?: number | string
}>()

</script>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  margin-bottom: 10px;
  .image-wrap {
    width: 100%;
    padding-bottom: 62.5%;
    position: relative;
    .image {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .tip {
      position: absolute;
      left: 6px;
      bottom: 6px;
      width: 60px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      background: rgba($color: #000, $alpha: 0.5);
    }
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
      width: 100%;
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
      display: flex;
      align-items: center;
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