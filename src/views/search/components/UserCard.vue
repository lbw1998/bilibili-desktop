<template>
  <el-card class="card-wrap" :body-style="{ padding: '14px 0 20px', display: 'flex',flexDirection: 'column',alignItems: 'center' }">
    <el-avatar class="avatar" size="32" :src="upic"></el-avatar>
    <b class="title">{{uname}}</b>
    <i :class="`lv icon-lv${level}`"></i>
    <div class="desc">
      {{usign || '此用户没有个性签名啊啊啊'}}
    </div>
    <el-button size="small" type="primary" class="follow">关 注</el-button>
  </el-card>
</template>

<script lang="ts" setup>
defineProps<{
  upic: string,
  uname: string,
  level: number,
  usign: string,
}>()

</script>

<style lang="scss" scoped>
.card-wrap {
  width: 210px;
  margin-bottom: 20px;
  .avatar {
    margin-bottom: 5px;
  }
  .desc {
    width: 160px;
    text-align: center;
    font-size: 12px;
    height: 50px;
    margin-bottom: 12px;
    color: #999999;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .follow {
    width: 140px;
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    transition: transform 0.3s ;
  }
}
</style>