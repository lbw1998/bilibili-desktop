<template>
  <el-card class="card-wrap" :body-style="{ padding: '8px', display: 'flex' }">
    <div class="image-wrap">
      <el-image class="image" :src="pic" >
        <template #placeholder>
          <div class="image" v-loading="true"></div>
        </template>
      </el-image>
      <div class="image-tip" v-if="display_info" :style="{backgroundColor: display_info[0].bg_color,color: display_info[0].text_color }">
        {{display_info[0].text}}
      </div>
    </div>
    <div class="video-info">
      <div class="video-title">
        <span class="title-tip">
          {{season_type_name}}
        </span>
        <b v-html="title"></b>
      </div>
      <div class="intros">
        <div class="intros-top">
          <div class="intros-left" v-if="styles">
            <label class="intros-title">风格：</label>
            {{styles}}
          </div>
          <label class="intros-title">地区：</label>
          {{areas}}
        </div>
        <div class="intros-top">
          <div class="intros-left">
            <label class="intros-title">开播时间：</label>
            {{fix_pubtime_str?fix_pubtime_str:parseTimestamp(pubtime)}}
          </div>
          <template v-if="cv">
            <label class="intros-title">声优：</label>
            <span v-html="cv" class="intros-cv" :title="cv"></span>
          </template>
        </div>
        <div class="intros-desc">
          简介：{{desc}}
        </div>
      </div>
    </div>
    <div class="score" v-if="score">
      {{score}}
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { parseTimestamp } from '@/utils/tools';
import { Badge } from '@/request/model/video/search';

defineProps<{
  pic: string,
  title: string,
  display_info: Badge[] | undefined,
  desc: string,
  areas: string,
  cv: string,
  styles: string,
  fix_pubtime_str?: string,
  season_type_name: string,
  pubtime: number,
  score: number
}>()

</script>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  margin-bottom: 10px;
  position: relative;
  .image-wrap {
    position: relative;
    width: 139.5px;
    height: 186px;
    .image {
      width: 139.5px;
      height: 186px;
      border-radius: 5px;
    }
      .image-tip {
        width: 60px;
        height: 24px;
        font-size: 12px;
        border-radius: 0 5px 0 5px;
        top: 0;
        right: 0;
        position: absolute;
        line-height: 24px;
        text-align: center;
      }
  }
  .video-info {
    padding-left: 12px;
    .video-title {
      font-size: 18px;
      height: 60px;
      line-height: 60px;
      display: flex;
      align-items: center;
      .title-tip {
        display: inline-block;
        height: 24px;
        padding: 0 10px;
        border: 1px solid #979797;
        color: #979797;
        text-align: center;
        line-height: 24px;
        border-radius: 100px;
        margin-right: 12px;
        font-size: 12px;
        vertical-align: middle;
      }
      :deep(.keyword) {
        color: #f25d8e;
        font-style: normal;
      }
    }
    .intros {
      margin-top: 20px;
      font-size: 12px;
      .intros-top {
        display: flex;
        margin-bottom: 4px;
        .intros-left {
          width: 244px;
        }
        .intros-title {
          color: #999;
        }
        .intros-cv {
          width: 260px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .intros-desc{
        color: #999;
        padding-top: 10px;
      }
    }
  }
  .score {
    position: absolute;
    top: 20px;
    right: 20px;
    color: #00a1d6;
    font-weight: 700;
    font-size: 39px;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: transform 0.3s ;
  }
}
</style>