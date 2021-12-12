<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">{{route.query.regionName}}</b>
    </div>
  </div>
  <el-tabs v-model="rid" class="tabs-wrap" @tab-click="changeRid">
    <el-tab-pane v-for="item in ridChild[code]" :label="item.label" :name="item.rid">
    </el-tab-pane>
  </el-tabs>
  <el-scrollbar v-loading="refresh" height="calc(100vh - 130px)"  >
    <div class="block-area">
      <template v-if="regionInfo.recommend">
        <div class="block-title">
          推荐
        </div>
        <div class="block-recommend">
          <v-card
            class="recommend-card"
            v-for="item in regionInfo.recommend"
            @click="toVideo({aid: item.param as unknown as number})"
            :pic="item.cover"
            :face="item.face"
            :like="item.like"
            :name="item.name"
            :view="item.play"
            :title="item.title"
          ></v-card>
        </div>
      </template>
      <div class="block-title">
        综合动态
      </div>
      <div class="block-new" infinite-scroll-distance="1200" infinite-scroll-delay="1000" v-infinite-scroll="getRegionNewInfo">
        <v-card
          class="new-card"
          v-for="item in regionInfo.new"
          @click="toVideo({aid: item.aid})"
          :pic="item.pic"
          :face="item.owner.face"
          :like="item.stat.like"
          :name="item.owner.name"
          :view="item.stat.view"
          :title="item.title"
        ></v-card>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import VCard from '@/components/VideoCard.vue';
import { getRegionInfoApi, getRegionNewInfoApi } from '@/request/api/region/info';
import { toVideo } from '@/utils/redirect';
import { Archive, RegionRecommend } from '@/request/model/region/info';
import { ridChild } from '@/utils/rid';

const route = useRoute()

let code = route.query.code as string
const rid = ref(ridChild[code][0].rid)
const refresh = ref(true)

const regionInfo = reactive({
  recommend: <RegionRecommend[]>[],
  new: <Archive[]>[]
})

const getRegionRecommend = async () => {
  const { data } = await getRegionInfoApi({rid: rid.value})
  regionInfo.recommend = data.recommend
  refresh.value = false
}

const getRegionNewInfo = async () => {
  const { data } = await getRegionNewInfoApi({rid: rid.value})
  data.archives && (regionInfo.new = [...regionInfo.new, ...data.archives])
}

const changeRid = () => {
  refresh.value = true
  regionInfo.new = []
  getRegionRecommend()
  getRegionNewInfo()
}

getRegionRecommend()
getRegionNewInfo()

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