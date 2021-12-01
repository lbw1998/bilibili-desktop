<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">排行榜</b>
    </div>
    <el-tabs v-model="activeRid" @tab-click="changeRid">
      <template v-for="item in ridList" :key="item.rid">
        <el-tab-pane  :name="item.rid" v-if="item.isRank" >
          <template #label>
            <div class="tab-wrap">
              <svg-icon class="icon" :name="item.code" />
              <span>{{item.label}}</span>
            </div>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>
  </div>
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" >
      <r-card 
        v-for="(item, index) in itemList"
        class="r-card"
        :index="index + 1"
        :author="item.author"
        :pic="item.pic"
        :title="item.title"
        :play="item.play"
        :video_review="item.video_review"
        :pts="item.pts"
        @click="toVideo({aid: item.aid})"
      ></r-card>
    </div>
  </el-scrollbar> 
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toVideo } from '@/utils/redirect';
import RCard from './components/RankCard.vue';
import { ridList } from '@/utils/rid'
import { getRankingApi } from '@/request/api/video/rank';
import { RankVideoInfo } from '@/request/model/video/rank';
const activeRid = ref(0)
const refresh= ref(true)
const itemList = ref(<RankVideoInfo[]>[])
const changeRid = (tab: { props: { name: number; }; }) => {
  getRanking(tab.props.name)
}

const getRanking = async (rid:number = 0) => {
  refresh.value = true
  const res = await getRankingApi(rid == 0?undefined:{rid})
  refresh.value = false
  itemList.value = res.data.list
}

getRanking()
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
  height: calc(100vh - 180px);
  .contain-wrap {
    width: 100%;
    padding-top: 5px;
    padding-right: 20px;
    display: flex;
    flex-wrap: wrap;
    transition: transform 0.3s ;
    justify-content: space-around;
    .r-card {
      cursor: pointer;
      &:hover {
        transform: translateY(-4px);
      }
    }
  }
}

@media screen and (min-width:1500px) {
  .r-card {
    width: 48%;
  }
}
</style>