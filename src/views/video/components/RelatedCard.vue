<template>
  <el-card shadow="hover" :body-style="{ padding: '5px' }">
    <div class="card-wrap">
      <div class="image-wrap">
        <el-image :src="pic" class="image">
          <template #placeholder>
            <div class="image" v-loading="true"></div>
          </template>
        </el-image>
        <div class="image-tip" v-if="badge_info?.text" :style="{backgroundColor: badge_info.bg_color }">
          {{badge_info.text}}
        </div>
      </div>
      <div class="info">
        <div class="title">
          {{title}}
        </div>
        <div class="count-up">
          {{name}}
        </div>
        <div class="count">
          <svg-icon name="view" />
          <span class="view">{{formatNumber(view)}}</span>
          <svg-icon name="barrage" />
          <span class="view">{{formatNumber(danmaku)}}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Badgeinfo } from '@/request/model/media/info';
import { formatNumber } from '@/utils/tools';

defineProps<{
  pic: string
  title: string
  name: string
  view: number
  danmaku: number
  badge_info?: Badgeinfo
}>()
</script>

<style lang="scss" scoped>
  .el-card {
    width: 320px;
    box-sizing: border-box;
    &:hover {
      cursor: pointer;
    }
    .card-wrap {
      display: flex;
      .image-wrap {
        position: relative;
        .image {
          width: 140px;
          height: 80px;
        }
        .image-tip {
          min-width: 40px;
          padding: 0 6px;
          height: 18px;
          font-size: 12px;
          border-radius: 0 0 0 5px;
          top: 0;
          right: 0;
          position: absolute;
          line-height: 18px;
          text-align: center;
          color: #FFFFFF
        }
      }
      .info {
        margin-left: 10px;
        width: 140px;
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
          width: 140px;
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
            text-indent: 5px;
            min-width: 50px;
            display: inline-block;
            &:first-of-type {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>