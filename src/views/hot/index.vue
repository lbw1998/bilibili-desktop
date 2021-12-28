<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">热门</b>
    </div>
  </div>
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" infinite-scroll-distance="800" infinite-scroll-delay="1000" v-infinite-scroll="loadMore" >
      <div class="item" v-for="(item, key) in itemList">
        <v-card 
          @click="toVideo({aid: item.aid})" 
          :pic="item.pic"  
          :name="item.owner.name"
          :title="item.title"
          :view="item.stat.view"
          :like="item.stat.like"
          :face="item.owner.face"
          :duration="item.duration"
        ></v-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toVideo } from '@/utils/redirect'
import VCard from '@/components/VideoCard.vue'
import { getHotApi } from '@/request/api/video/hot'
import { HotInfo } from '@/request/model/video/hot'

const itemList = ref(<HotInfo[]>[])
const refresh = ref(false)
let pn = 1

const getHot = () => {
  refresh.value = true
  getHotApi({pn}).then( res => {
    itemList.value = res.data.list
    refresh.value = false
    pn++
  })
}

const loadMore = () => {
  getHotApi({pn}).then( res => {
    itemList.value = [...itemList.value, ...res.data.list]
    pn++
  })
}

getHot()

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
    }
  }
</style>