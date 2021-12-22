<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">搜索：{{searchParams.keyword}}</b>
    </div>
  </div>
  <el-tabs v-model="searchParams.search_type" @tab-click="tabChange">
    <el-tab-pane :lazy="true" v-for="item in searchTypes" :name="item.value" >
      <template #label>
        <div class="tab-wrap">
          <span>{{item.title}}{{resultAllResult.top_tlist[item.value]?`(${resultAllResult.top_tlist[item.value]})`:''}}</span>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
  <el-space wrap size="10" class="select-wrap" v-show="searchParams.search_type == 'video'">
    <el-select v-model="searchParams.order" @change="selectChange" size="mini">
      <el-option
        v-for="item in sortType"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="searchParams.duration" @change="selectChange" size="mini">
      <el-option
        v-for="item in timeType"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select v-model="searchParams.tids" @change="selectChange" size="mini">
      <el-option
        v-for="item in ridList"
        :key="item.code"
        :label="item.label"
        :value="item.rid"
      >
      </el-option>
    </el-select>
  </el-space>
  <!-- 无限滚动 -->
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" infinite-scroll-distance="800" :infinite-scroll-disabled="noMore" infinite-scroll-delay="1000" v-infinite-scroll="loadMore" >
      <template v-for="item in itemList">
        <!-- 视频 -->
        <v-card
          v-if="searchParams.search_type == 'video'"
          class="v-card card"
          :pic="item.pic"
          :name="item.author"
          :title="item.title"
          :view="item.play"
          :like="item.review"
          @click="toVideo({aid: item.id})"
        ></v-card>
        <!-- 番剧 -->
        <b-card
          v-else-if="searchParams.search_type == 'media_bangumi'"
          class="b-card card"
          :pic="item.cover"
          :title="item.title"
          :display_info="item.display_info "
          :season_type_name="item.season_type_name"
          :areas="item.areas"
          :pubtime="item.pubtime"
          :styles="item.styles"
          :fix_pubtime_str="item.fix_pubtime_str"
          :desc="item.desc"
          :cv="item.cv"
          @click="toMedia({season_id: item.season_id, ep_id: item.eps[0].id})"
          :score="item.media_score?.score"
        ></b-card>
        <!-- 直播间 -->
        <v-card
          v-else-if="searchParams.search_type == 'live_room'"
          class="v-card card"
          :pic="item.cover"
          :name="item.cate_name"
          :title="item.title"
          :face="item.uface"
          :online="item.online"
        ></v-card>
        <!-- 用户 -->
        <u-card
          v-else-if="searchParams.search_type == 'bili_user'"
          :upic="item.upic"
          :uname="item.uname"
          :level="item.level"
          :usign="item.usign"
        ></u-card>
        <!-- 影视 -->
        <b-card
          v-else-if="searchParams.search_type == 'media_ft'"
          class="b-card card"
          :pic="item.cover"
          :title="item.title"
          :display_info="item.display_info "
          :season_type_name="item.season_type_name"
          :areas="item.areas"
          :pubtime="item.pubtime"
          :styles="item.styles"
          :fix_pubtime_str="item.fix_pubtime_str"
          :desc="item.desc"
          :actors="item.cv"
          :score="item.media_score?.score"
          @click="toMedia({season_id: item.season_id, ep_id: item.eps[0].id})"
        ></b-card>
      </template>
      <!-- 当卡片最后一行未铺满时 补齐 -->
      <template v-if="'videolive_room'.includes(searchParams.search_type)">
        <i class="v-content" v-for="i in 6"></i>
      </template>
      <template v-else>
        <i class="u-content" v-for="i in 6"></i>
      </template>
    </div>
    <div v-show="!itemList[0]" class="empty-wrap">
      <img src="../../assets/img/empty.png" >
      <p class="tip">什么都没有找到啊 T_T</p>
    </div>
  </el-scrollbar> 
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import { ridList } from '@/utils/rid'
import { useRoute } from 'vue-router';
import VCard from '@/components/VideoCard.vue';
import BCard from '@/components/BangumiCard.vue';
import UCard from './components/UserCard.vue';
import useSearchResult from './composables/useSearchResult';
import { SearchTypeParams } from '@/request/api/video/search';
import { SearchItem } from '@/request/model/video/search';
import { toVideo, toMedia } from '@/utils/redirect';

const route = useRoute()
const { resultAllResult, searchAllResult, searchTypeResult } = useSearchResult()
const searchParams = reactive(<SearchTypeParams>{
  keyword: route.query.keyword as unknown as string,
  search_type: 'video',
  order: 'totalrank',
  duration: 0,
  tids: 0,
  page: 1
})
const refresh = ref(true)
const noMore = ref(false)
const itemList = ref(<SearchItem[]>[])
const searchTypes = [
  {
    title: '视频',
    value: 'video'
  },
  {
    title: '番剧',
    value: 'media_bangumi'
  },
  {
    title: '直播',
    value: 'live_room'
  },
  {
    title: '用户',
    value: 'bili_user'
  },
  {
    title: '影视',
    value: 'media_ft'
  },
  // {
  //   title: '专栏',
  //   value: 'artice'
  // },
]
const sortType = [
  {
    label: "综合排序",
    value: "totalrank"
  },
  {
    label: "最多播放",
    value: "click"
  },
  {
    label: "弹幕最多",
    value: "dm"
  },
  {
    label: "最新发布",
    value: "pubdate"
  }
]
const timeType = [
  {
    label: '全部时长',
    value: 0
  },
  {
    label: '10分钟以下',
    value: 1
  },
  {
    label: '10-30分钟',
    value: 2
  },
  {
    label: '30-60分钟',
    value: 3
  },
  {
    label: '60分钟以上',
    value: 4
  }
]
const getSearchResult = async () => {
  refresh.value = true
  const params  = {
    keyword: searchParams.keyword,
    search_type: searchParams.search_type,
    order: searchParams.order,
    duration: searchParams.duration,
    tids: searchParams.tids,
    page: searchParams.page
  }
  const data = await searchTypeResult(params)
  if(!data.result) {
    itemList.value = []
  } else {
    itemList.value = data.result
  }
  refresh.value = false
}
const loadMore = async () => {
  searchParams.page!++
  const params  = {
    keyword: searchParams.keyword,
    search_type: searchParams.search_type,
    order: searchParams.order,
    duration: searchParams.duration,
    tids: searchParams.tids,
    page: searchParams.page
  }
  const data = await searchTypeResult(params)
  if(!data.result) {
    noMore.value = true
  } else {
    itemList.value = [...itemList.value, ...data.result]
  }
}
const selectChange = async () => {
  refresh.value = true
  searchParams.page = 1
  const params  = {
    keyword: searchParams.keyword,
    search_type: searchParams.search_type,
    order: searchParams.order,
    duration: searchParams.duration,
    tids: searchParams.tids,
    page: searchParams.page
  }
  const data = await searchTypeResult(params)
  if(!data.result) {
    itemList.value = []
  } else {
    itemList.value = data.result
  }
  refresh.value = false
}
const tabChange = (e: any) => {
  itemList.value = []
  selectChange()
}
watch(route, value => {
  searchParams.keyword = value.query.keyword as unknown as string
  if(searchParams.keyword) {
    searchAllResult({keyword: searchParams.keyword})
    getSearchResult()
  }
})
searchAllResult({keyword: searchParams.keyword})
getSearchResult()
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
.select-wrap {
  padding-bottom: 8px;
  .el-select {
    width: 140px;
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
    justify-content: space-evenly;
    .v-card {
      width: 298px;
    }
    .b-card {
      width: 90vw;
    }
    @media screen and (min-width:1500px) {
      .b-card {
        width: 45vw;
      }
    }
    .card {
      cursor: pointer;
      margin-right: 6px;
      margin-bottom: 15px;
      &:hover {
        transform: translateY(-4px);
      }
    }
    .v-content {
      width: 298px;
    }
    .u-content {
      width: 210px;
    }
  }
  .empty-wrap {
    width: 100%;
    height: calc(100vh - 320px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 480px;
    }
    .tip {
      font-size: 15px;
      color: #757575;
      margin-top: 10px;
    }
  }
}
.el-tabs {
  margin-left: 10px;
  :deep(.el-tabs__header) {
    margin-bottom: 10px;
  }
  :deep(.el-tabs__nav-wrap::after) {
    content: none;
  }
}
</style>