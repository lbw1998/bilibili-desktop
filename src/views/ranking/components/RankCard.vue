<template>
  <el-card shadow="hover" :body-style="{ padding: '0' }">
    <div class="card-wrap">
      <div class="index">
        {{index}}
      </div>
      <el-image class="image" :src="pic">
        <template #placeholder>
          <div class="image" v-loading="true"></div>
        </template>
      </el-image>
      <div class="info">
        <div class="info-top">{{title}}</div>
        <div class="info-bottom">
          <svg-icon name="view" />
          <span class="view">{{play}}</span>
          <svg-icon name="barrage" />
          <span class="view">{{video_review}}</span>
          <svg-icon name="user" />
          <span class="view">{{author}}</span>
        </div>
      </div>
      <div class="score">
        <div class="score-top">{{pts}}</div>
        <div class="score-bottom">综合得分</div>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
defineProps<{
  index: number,
  author: string,
  pic: string,
  title: string,
  play: number,
  video_review: number,
  pts: number
}>()
</script>

<style lang="scss" scoped>
  .el-card {
    width: 100%;
    height: 110px;
    margin-bottom: 8px;
    padding-right: 20px;
    position: relative;
    .card-wrap {
      display: flex;
      width: 100%;
      height: 110px;
      padding: 20px 0;
      .index {
        width: 70px;
        height: 70px;
        font-size: 36px;
        font-weight: 700;
        color: #b8c0cc;
        line-height: 70px;
        text-align: center;
      }
      .image {
        width: 114px;
        height: 70px;
      }
      .info {
        width: calc(100% - 300px);
        margin-left: 14px;
        height: 70px;
        .info-top {
          height: 35px;
          line-height: 20px;
          font-weight: 700;
          font-size: 14px;
          color: #222;
          transition: .3s;
        }
        .info-bottom {
          height: 35px;
          color: #99a2aa;
          .view {
            margin: 0 8px;
          }
        }
      }
      .score {
        height: 70px;
        // position: absolute;
        // right: 20px;
        text-align: center;
        .score-top {
          color: #00a1d6;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 12px;
        }
        .score-bottom {
          color: #b8c0cc;
          line-height: 20px;
        }
      }
    }
  }
</style>