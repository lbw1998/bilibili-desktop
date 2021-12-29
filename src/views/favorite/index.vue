<!-- 收藏夹 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">我的收藏</b>
    </div>
  </div>
  <div class="content">
    <div class="content-left">
      <el-tabs v-model="activeMedia" @tab-click="changeFavorite" tab-position="left">
        <el-tab-pane :label="`${item.title}(${item.media_count})`" :name="item.id" v-for="item in favoriteList" />
      </el-tabs>
    </div>
    <div class="content-right">
      <el-scrollbar v-loading="isLoading">
        <div class="video-wrap"
          infinite-scroll-distance="800" 
          infinite-scroll-delay="1000"
          v-if="favoriteMediaList.length"
          v-infinite-scroll="loadMore" 
          :infinite-scroll-immediate="false"
          :infinite-scroll-disabled="noMore">
          <video-card
            class="video-card"
            v-for="item in favoriteMediaList"
            @click="toVideo({aid: item.id})"
            :duration="item.duration"
            :title="item.title"
            :name="item.upper.name"
            :face="item.upper.face"
            :pic="item.cover"
            :view="item.cnt_info.play"
            :like="item.cnt_info.danmaku"
          />
        </div>
        <Empty v-else />
      </el-scrollbar>
    </div>
  </div>
</template>

 <script lang="ts" setup>
import { ref } from 'vue';
import store from '@/utils/store';
import Empty from '@/components/Empty.vue';
import { toVideo } from '@/utils/redirect';
import VideoCard from '@/components/VideoCard.vue';
import { FavoriteItem, FavoriteMedia } from '@/request/model/user/favorite';
import { getFavoriteApi, getFavoriteDetailApi } from '@/request/api/user/favorite';

const favoriteList = ref(<FavoriteItem[]>[])
const favoriteMediaList = ref(<FavoriteMedia[]>[])
const activeMedia = ref(0)
const isLoading = ref(false)
const noMore = ref(false)
let pn = 1

const getFavoriteList = async () => {
  const { data:{list} } = await getFavoriteApi({up_mid: store.user.mid, type: 2})
  favoriteList.value = list
  activeMedia.value = list[0].id
  getFavoriteDetail()
}

const getFavoriteDetail = async () => {
  isLoading.value = true
  const {data:{medias}} = await getFavoriteDetailApi({media_id: activeMedia.value, ps: 20, pn})
  isLoading.value = false
  favoriteMediaList.value = medias?medias:[]
  pn++
}

const loadMore = async () => {
  const {data:{medias}} = await getFavoriteDetailApi({media_id: activeMedia.value, ps: 20, pn})
  if(!medias) {
    noMore.value = true
    return
  }
  favoriteMediaList.value = [...favoriteMediaList.value, ...medias]
  pn++
}

const changeFavorite = () => {
  pn = 1
  getFavoriteDetail()
}

getFavoriteList()
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
.content {
  width: 100%;
  height: calc(100vh - 109px );
  display: flex;
  .content-left {
    width: 180px;
    height: 100%;
    padding-top: 1px;
    .el-tabs {
      height: 100%;
      &:deep(.el-tabs__item) {
        padding-left: 8px;
      }
    }
  }
  .content-right {
    width: 100%;
    height: 100%;
    .video-wrap {
      display: flex;
      flex-wrap: wrap;
      .video-card {
        width: 300px;
        height: 280px;
        margin-right: 12px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>