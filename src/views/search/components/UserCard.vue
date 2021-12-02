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
  .lv {
    background-image: url('https://s1.hdslb.com/bfs/static/jinkela/search/assets/sprite-690be8a6ea.png');
    width: 28px;
    height: 16px;
    display: inline-block;
    line-height: 16px;
    vertical-align: middle;
    margin: 5px 0;
  }
  .lv.icon-lv0{
    background-position:-148px -231px
  }
  .lv.icon-lv1{
    background-position:-148px -185px
  }
  .lv.icon-lv2{
    background-position:-148px -139px
  }
  .lv.icon-lv3{
    background-position:-365px -438px
  }
  .lv.icon-lv4{
    background-position:-319px -536px
  }
  .lv.icon-lv5{
    background-position:-261px -536px
  }
  .lv.icon-lv6{
    background-position:-377px -490px
  }
  .lv.icon-lv7{
    background-position:-319px -490px
  }
  .lv.icon-lv8{
    background-position:-377px -536px
  }
  .lv.icon-lv9{
    background-position:-261px -490px
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