<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">推荐</b>
      <refresh-button @click="refreshAll" :animated="refresh"></refresh-button>
    </div>
  </div>
  <el-scrollbar v-loading="refresh" ref="scrollWrap" >
    <div class="contain-wrap"  infinite-scroll-distance="800" infinite-scroll-delay="1000" v-infinite-scroll="loadMore" >
      <div class="item" v-for="(item, key) in itemList">
        <v-card 
          @click="toVideo({aid: item.id})" 
          :pic="item.pic"  
          :name="item.owner.name"
          :title="item.title"
          :view="item.stat.view"
          :like="item.stat.like"
          :face="item.owner.face"
        ></v-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onActivated, onDeactivated } from 'vue'
import RefreshButton from '@/components/RefreshButton.vue'
import VCard from '@/components/VideoCard.vue'
import { toVideo } from '@/utils/redirect'
import { refreshAllApi } from '@/request/api/video/recommend'
import { Item } from '@/request/model/video/recommend'

const itemList = ref(<Item[]>[])
const refresh = ref(false)
const scrollWrap = ref()
let scrollTop = 0
const refreshAll = () => {
  refresh.value = true
  refreshAllApi().then( res => {
    itemList.value = res.data.item
    refresh.value = false
  })
}

const loadMore = () => {
  refreshAllApi().then( res => {
    itemList.value = [...itemList.value, ...res.data.item]
  })
}

refreshAll()

onActivated(() => {
  scrollWrap.value.setScrollTop(scrollTop)
  
})
onDeactivated(() => {
  scrollTop = scrollWrap.value.moveY
})
</script>

<style lang="scss" scoped>
  .header {
    padding-right: 20px;
    .title-bar {
      display: flex;
      justify-content: space-between;
      padding: 8px;
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
    background-color: transparent;
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