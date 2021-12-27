<!-- 动态 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">{{regionTabs[0].label}}</b>
      <refresh-button ></refresh-button>
    </div>
  </div>
  <el-tabs v-model="rid" class="tabs-wrap" @tab-click="changeRid">
    <template v-for="item in regionTabs" >
      <el-tab-pane :label="item.label" :name="item.rid">
      </el-tab-pane>
    </template>
  </el-tabs>
  <el-scrollbar v-loading="refresh" height="calc(100vh - 130px)">
    <div class="block-area">
      <RecommendTab :rid="rid" v-show="rid == regionTabs[0].rid"></RecommendTab>
      <template v-if="mediaInfo.recommend">
        <div class="block-title">
          推荐
        </div>
        <div class="block-recommend">
          <v-card
            class="recommend-card"
            @click="toVideoOrMedia({aid: item.param as unknown as number})"
            v-for="item in mediaInfo.recommend"
            :pic="item.cover"
            :face="item.face"
            :like="item.like"
            :name="item.name"
            :view="item.play"
            :title="item.title"
            :duration="item.duration"
          ></v-card>
        </div>
      </template>
      <div class="block-title">
        综合动态
      </div>
      <div class="block-new" infinite-scroll-distance="1200" infinite-scroll-delay="1000" v-infinite-scroll="getRegionNewInfo" >
        <v-card
          class="new-card"
          @click="redirect(item)"
          v-for="item in mediaInfo.new"
          :pic="item.pic"
          :face="item.owner.face"
          :like="item.stat.like"
          :name="item.owner.name"
          :view="item.stat.view"
          :title="item.title"
          :duration="item.duration"
        ></v-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import RefreshButton from '@/components/RefreshButton.vue'
import RecommendTab from './components/RecommendTab.vue';
import { ridChild } from '@/utils/rid';
import { reactive, ref, watch } from 'vue';
import VCard from '@/components/VideoCard.vue';
import { Archive, RegionRecommend } from '@/request/model/region/info';
import { getRegionInfoApi, getRegionNewInfoApi } from '@/request/api/region/info';
import { useRoute } from 'vue-router';
import { toVideo, toMedia, toVideoOrMedia } from '@/utils/redirect';

const route = useRoute()
const mediaInfo = reactive({
  recommend: <RegionRecommend[]>[],
  new: <Archive[]>[]
})
const refresh = ref(true)
const regionTabs = ref(ridChild[route.query.code as string])
const rid = ref(ridChild[route.query.code as string][0].rid)

const getRegionRecommend = async () => {
  const { data } = await getRegionInfoApi({rid: rid.value})
  mediaInfo.recommend = data.recommend
  refresh.value = false
}

const redirect = (item:any) => {
  if(item.tname.includes('动画')) {
    item.redirect_url = item.redirect_url.replace('https://www.bilibili.com/bangumi/play/ep', '')
    toMedia({ep_id:item.redirect_url as number, cid: item.cid})
  } else {
    toVideo({aid: item.aid})
  }
}

const getRegionNewInfo = async () => {
  const { data } = await getRegionNewInfoApi({rid: rid.value})
  mediaInfo.new = [...mediaInfo.new, ...data.archives]
}

const changeRid = () => {
  refresh.value = true
  mediaInfo.new = []
  getRegionRecommend()
  getRegionNewInfo()
}

getRegionRecommend()
getRegionNewInfo()

watch(route, () => {
  if( route.query.code) {
    refresh.value = true
    regionTabs.value = ridChild[route.query.code as string]
    rid.value = ridChild[route.query.code as string][0].rid
    changeRid()
  }  
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
}
.el-scrollbar {
  padding-right: 20px;
  .block-area {
    width: 100%;
    .block-title {
      font-size: 24px;
      line-height: 24px;
      font-weight: 400;
      color: #222;
      margin-bottom: 8px;
    }
    .block-recommend {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .recommend-card {
        width: 23%;
      }
    }
    .block-new {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .new-card {
        width: 260px;
        margin-bottom: 15px;
      }
    }
  }
}
</style>