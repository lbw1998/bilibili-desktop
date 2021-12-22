<template>
  <el-card shadow="hover" :body-style="{ padding: '12px' }">
    <div class="left-card">
      <el-avatar :size="42" class="face" :src="face" ></el-avatar>
      <el-tag size="mini" v-if="isTop">置顶</el-tag>
    </div>
    <div class="right-card">
      <div class="title">
        <div>
          <b class="username">{{uname}}</b>
          <i :class="`lv icon-lv${level}`"></i>
        </div>
        <p class="time">{{parseTimestamp(time)}}</p>
      </div>
      <p class="reply-content">
        {{content}}
      </p>
      <div class="btn-wrap">
        <el-button size="mini" :type="action?'primary':''" class="like" @click.stop="likeThis" >
          <el-icon>
            <svg-icon name="like" />
          </el-icon>
          {{formatNumber(like)}}
        </el-button>
        <el-button type="text" size="mini" v-if="count" @click="showReplies" >
          共回复{{formatNumber(count)}}条
          <svg-icon name="arrow_right" />
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { formatNumber, parseTimestamp } from '@/utils/tools';

defineProps<{
  isTop?: boolean,
  uname: string,
  face: string,
  level: number,
  time: number,
  content: string,
  like: number,
  count: number,
  action: number // 0 无点赞 1 点赞 2 踩
}>()
const emit = defineEmits<{
  (event: 'showReplies',):void
  (event: 'likeThis',):void
}>()


const likeThis = () => {
  emit('likeThis')
}
const showReplies = () => {
  emit('showReplies')
}
</script>

<style lang="scss">
.el-card {
  margin-bottom: 8px;
  .left-card {
    display: inline-block;
    text-align: center;
    margin-right: 10px ;
    vertical-align: top;
    .face {
      display: block;
      border: 1px solid rgba($color: #999, $alpha: 0.2);
      margin-bottom: 5px;
    }
  }
  .right-card {
    display: inline-block;
    width: calc(100% - 52px);
    .title {
      width: 100%;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      margin-bottom: 5px;
      .username {
        margin-right: 5px;
      }
      .time {
        font-size: 12px;
        color: #999999;
        // text-align: right;;
      }
    }
    .reply-content {
      width: 100%;
      line-height: 22px;
      margin-bottom: 12px;
    }
    .btn-wrap {
      width: 100%;
      .like {
        padding: 0px 8px;
      }
      .el-button:first-of-type {
        margin-right: 14px;
      }
    }
  }
}
</style>