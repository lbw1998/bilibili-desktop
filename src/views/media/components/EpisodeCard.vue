<template>
  <el-card shadow="hover" :body-style="{ padding: '5px' }">
    <div class="card-wrap">
      <div class="image-wrap">
        <el-image :src="cover" class="image">
          <template #placeholder>
            <div class="image" v-loading="true"></div>
          </template>
        </el-image>
        <div class="image-tip" v-if="badge_info.text" :style="{backgroundColor: badge_info.bg_color }">
          {{badge_info.text}}
        </div>
      </div>
      <div class="info">
        <div class="title">
         {{long_title}}
        </div>
        <div class="count">
           第{{title}}话 
        </div>
        <div class="subtitle">
          {{subtitle}}
        </div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Badgeinfo } from '@/request/model/media/info';

defineProps<{
  cover: string
  title: string
  subtitle: string
  long_title: string
  badge_info: Badgeinfo
}>()
</script>

<style lang="scss" scoped>
  .el-card {
    width: 320px;
    box-sizing: border-box;
    .card-wrap {
      display: flex;
      .image-wrap {
        position: relative;
        .image {
          width: 140px;
          height: 80px;
        }
        .image-tip {
          width: 40px;
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
        width: 160px;
        .title {
          font-size: 14px;
          font-weight: 500;
          height: 26px;
          padding-top: 8px;
          line-height: 18px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .count {
          height: 16px;
          width: 100%;
          margin-bottom: 8px;
        }
        .subtitle {
          height: 16px;
          width: 100%;
          color: #999;
        }
      }
    }
  }
</style>