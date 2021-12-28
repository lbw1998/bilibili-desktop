<!-- 稍后再看页面 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">稍后再看</b>
    </div>
  </div>
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" v-if="itemList.length" >
      <div class="item" v-for="item in itemList">
        <v-card 
          @click="toVideo({aid: item.aid})" 
          :pic="item.pic"  
          :name="item.owner.name"
          :title="item.title"
          :face="item.owner.face"
          :duration="item.duration"
          :view="item.stat.view"
          :like="item.stat.like"
        ></v-card>
      </div>
      <i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <Empty v-else />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toVideo } from '@/utils/redirect'
import Empty from '@/components/Empty.vue'
import VCard from '@/components/VideoCard.vue'
import { getPendingApi } from '@/request/api/user/pending'
import { PendingItem } from '@/request/model/user/pending'


const itemList = ref(<PendingItem[]>[])
const refresh = ref(false)

const getPending = () => {
  refresh.value = true
  getPendingApi().then( res => {
    itemList.value = res.data.list
    refresh.value = false
  })
}


getPending()
</script>

<style lang="scss" scoped>
  .header {
    padding-right: 20px;
    .title-bar {
      padding-bottom: 8px;
      .title {
        font-size: 28px;
      }
    }
    .tab-wrap {
      display: flex;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
  .el-scrollbar {
    height: calc(100vh - 120px);
    .contain-wrap {
      width: 100%;
      padding-top: 5px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      transition: transform 0.3s ;
      .item {
        width: 300px;
        height: 280px;
        margin-right: 8px;
        margin-bottom: 10px;
      }
      i {
        width: 300px;
        margin-right: 8px;
      }
    }
  }
</style>