<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">搜索：{{searchParams.keyword}}</b>
    </div>
  </div>
  <el-tabs v-model="searchParams.search_type" @tab-click="selectChange">
    <el-tab-pane  v-for="item in searchTypes" :name="item.value" >
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
  <el-scrollbar v-loading="refresh">
    <div class="contain-wrap" infinite-scroll-distance="800" :infinite-scroll-disabled="noMore" infinite-scroll-delay="1000" v-infinite-scroll="loadMore" >
      <div class="item" v-for="(item, key) in itemList">
        <template v-if="searchParams.search_type == 'video'">
          <v-card
            class="v-card card"
            :pic="item.pic"
            :name="item.author"
            :title="item.title"
            :view="item.play"
            :like="item.review"
          ></v-card>
          <i></i><i></i><i></i><i></i><i></i>
        </template>
        <template v-if="searchParams.search_type == 'media_bangumi'">
          <b-card
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
            :score="item.media_score && item.media_score.score"
          ></b-card>
        </template>
        <template v-if="searchParams.search_type == 'live_room'">
          <v-card
            class="v-card card"
            :pic="item.cover"
            :name="item.cate_name"
            :title="item.title"
            :face="item.uface"
            :view="item.online"
          ></v-card>
        </template>
      </div>
    </div>
  </el-scrollbar> 
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ridList } from '@/utils/rid'
import { useRoute } from 'vue-router';
import VCard from '@/components/VideoCard.vue';
import BCard from '@/components/BangumiCard.vue';
import useSearchResult from './composables/useSearchResult';
import { SearchTypeParams } from '@/request/api/video/search';
import { SearchItem } from '@/request/model/video/search';

const route = useRoute()
const { resultAllResult, searchAllResult, searchTypeResult } = useSearchResult()
const searchParams = reactive(<SearchTypeParams>{
  keyword: route.params.keyword as unknown as string,
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
  {
    title: '专栏',
    value: 'artice'
  },
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
  const res = await searchTypeResult(params)
  itemList.value = res.result
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
  console.log(data);
  
  refresh.value = false
  itemList.value = data.result
}

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
      &:hover {
        transform: translateY(-4px);
      }
    }
    i {
      width: 800px;
      margin-right: 6px;
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