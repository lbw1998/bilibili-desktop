<template>
  <el-card class="card-wrap" :body-style="{ padding: '0px' }">
    <el-image class="image" :src="pic" >
      <template #placeholder>
        <div class="image" v-loading="true"></div>
      </template>
    </el-image>
    <div class="card-info">
      <div class="owner">
        <!-- <el-avatar :size="36" :src="face"></el-avatar> -->
        <span class="owner-name">{{name}}</span>
      </div>
      <div class="card-title">
        <b>{{title}}</b>
      </div>
      <div class="card-bottom">
        <svg-icon name="view" />
        <span class="view">{{view}}</span>
        <svg-icon name="barrage" />
        <span class="view">{{like}}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
const props = defineProps<{
  pic: string,
  face?: string,
  name: string,
  title: string,
  view: number,
  like: number
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
    padding: 4px 8px;
    box-sizing: border-box;
    .owner {
      display: flex;
      align-items: center;
      .owner-name {
        color: #999999;
      }
    }
    .card-title {
      width: 270px;
      /*强制文字在一行文本框内*/
      white-space: nowrap;
      /*溢出部分文字隐藏*/
      overflow: hidden;
      /*溢出部分省略号处理*/
      text-overflow: ellipsis;
      padding: 5px 0;
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