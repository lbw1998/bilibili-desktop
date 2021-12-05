<template>
  <el-card shadow="hover" :body-style="{ padding: '5px' }">
    <div class="card-wrap">
      <el-image :src="videoInfo.pic" class="image">
        <template #placeholder>
          <div class="image" v-loading="true"></div>
        </template>
      </el-image>
      <div class="info">
        <div class="title">
          {{videoInfo.title}}
        </div>
        <div class="count-up">
          {{videoInfo.owner.name}}
        </div>
        <div class="count">
          <svg-icon name="view" />
          <span class="view">{{formatNumber(videoInfo.stat.view)}}</span>
          <svg-icon name="barrage" />
          <span class="view">{{formatNumber(videoInfo.stat.danmaku)}}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { VideoInfo } from '@/request/model/video/info';
import { formatNumber } from '@/utils/tools';

const props = defineProps<{
  videoInfo: VideoInfo
}>()
</script>

<style lang="scss" scoped>
  .el-card {
    width: 320px;
    box-sizing: border-box;
    .card-wrap {
      display: flex;
      .image {
        width: 140px;
        height: 80px;
      }
      .info {
        margin-left: 10px;
        width: 160px;
        .title {
          font-size: 14px;
          font-weight: 500;
          height: 36px;
          line-height: 18px;
          margin-bottom: 6px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .count-up {
          width: 160px;
          margin-bottom: 4px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          line-clamp: 2;
        }
        .count {
          display: inline-block;
          height: 16px;
          width: 100%;
          color: #999;
          .view {
            font-size: 12px;
            min-width: 55px;
            text-indent: 5px;
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>