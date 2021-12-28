<!-- 观看历史页面 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">观看历史</b>
    </div>
  </div>
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" 
      v-if="itemList.length" 
      infinite-scroll-distance="800" 
      infinite-scroll-delay="1000" 
      infinite-scroll-immediate="false"
      v-infinite-scroll="loadMore" >
      <div class="item" v-for="item in itemList">
        <v-card 
          @click="toVideo({aid: item.history.oid})" 
          :pic="item.cover"  
          :name="item.author_name"
          :title="item.title"
          :face="item.author_face"
          :duration="item.duration"
        ></v-card>
      </div>
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <Empty v-else />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toVideo } from '@/utils/redirect'
import Empty from '@/components/Empty.vue'
import VCard from '@/components/VideoCard.vue'
import { getHistoryApi } from '@/request/api/user/history'
import { HistoryItem } from '@/request/model/user/history'

const itemList = ref(<HistoryItem[]>[])
const refresh = ref(false)
const params = {
  max: 0,
  view_at: 0
}

const getHistory = () => {
  refresh.value = true
  getHistoryApi(params).then( res => {
    itemList.value = res.data.list
    refresh.value = false
    if (!res.data.cursor.is_end) {
      params.max = res.data.cursor.max
      params.view_at = res.data.cursor.view_at
    }
  })
}

const loadMore = () => {
  getHistoryApi(params).then( res => {
    itemList.value = [...itemList.value, ...res.data.list]
    if (!res.data.cursor.is_end) {
      params.max = res.data.cursor.max
      params.view_at = res.data.cursor.view_at
    }
  })
}

getHistory()
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