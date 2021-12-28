<template>
  <el-card 
    class="message-card" 
    shadow="hover" 
    :body-style="{ padding: '12px 12px' }">
    <div class="top">
      <div class="user-wrap">
        <el-avatar :size="32" :src="avatar" ></el-avatar>
        <p class="name">{{nickname}}</p>
      </div>
      <div class="time">
        {{parseTimestamp(time)}}
      </div>
    </div>
    <div class="tip">
      {{action}}
    </div>
    <div class="reply">
      {{content}}
    </div>
    <div class="reply-bootom" v-if="target">
      {{target}}
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { parseTimestamp } from '@/utils/tools';

defineProps<{
  avatar: string,
  nickname: string,
  time: number,
  action: string,
  content: string,
  target?: string
}>()
</script>

<style lang="scss" scoped>
.message-card {
  width: 100%;
  .top {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    .user-wrap {
      display: flex;
      align-items: center;
      .name {
        margin-left: 6px;
        font-size: 12px;
      }
    }
    .time {
      font-size: 12px;
      color: #999999;
    }
  }
  .tip {
    font-size: 12px;
    color: #999999;
  }
  .reply {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .reply-bootom {
    font-size: 12px;
    color: #999999;
    margin-top: 6px;
    padding-left: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>