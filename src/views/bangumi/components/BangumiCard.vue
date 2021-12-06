<template>
  <el-card class="card-wrap" :body-style="{ padding: '0px' }">
    <el-image class="image" :src="pic" >
      <template #placeholder>
        <div class="image" v-loading="true"></div>
      </template>
    </el-image>
    <div class="card-info">
      <div class="card-title">
        <b :title="title">
          {{title}}
        </b>
      </div>
      <div class="desc-wrap">
        <span class="desc">{{desc}}</span>
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
defineProps<{
  pic: string,
  title: string,
  desc: string
}>()

</script>

<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  margin-bottom: 10px;
  .image {
    width: 100%;
    height: 100%;
  }
  .card-info {
    padding: 0px 8px 4px;
    box-sizing: border-box;
    position: relative;
    .desc-wrap {
      display: flex;
      align-items: center;
      .desc {
        color: #999999;
      }
    }
    .card-title {
      width: 100%;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: transform 0.3s ;
  }
}
</style>