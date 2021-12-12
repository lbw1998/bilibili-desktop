<template>
  <el-scrollbar>
    <el-carousel :interval="4000" type="card" height="168px">  
      <el-carousel-item v-for="item in recommendInfo.bannerList" :key="item.aid">
        <el-image
          :src="item.cover"
          style="width:100%;height: 100%;"
          fit="cover"
          :alt="item.desc"
          @click="toMedia({season_id:item.season_id!, ep_id: item.episode_id! })"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
    <!-- 番剧显示 -->
    <template v-if="rid == 13">
      <div class="block-area" :style="{height: showAll?'auto':'290px'}">
        <div class="block-left">
          <div class="left-title">
            最近更新
          </div>
          <div class="timeline-wrap">
            <el-card shadow="hover" v-for="item in recommendInfo.timeline" :body-style="{ padding: '4px' }">
              <div class="card-wrap" @click="toMedia({season_id:item.season_id, ep_id: item.ep_id, bgmcount: item.bgmcount })">
                <el-image :src="item.square_cover" class="image">
                  <template #placeholder>
                    <div class="image" v-loading="true"></div>
                  </template>
                </el-image>
                <div class="info">
                  <div class="title">
                    {{item.title}}
                  </div>
                  <div class="num">
                    更新至
                    <p :class="`detail ${item.new?'new':''}`">
                      {{item.bgmcount}}话
                    </p>
                  </div>
                </div>
              </div>
            </el-card>
            <i></i><i></i><i></i><i></i><i></i>
          </div>
        </div>
        <div class="block-right" v-if="followShow">
          <div class="right-title">
            我的追番
          </div>
          <el-card 
            shadow="hover" 
            v-for="item in recommendInfo.followList" 
            :body-style="{ padding: '4px' }"
            @click="toMedia({season_id:item.season_id, ep_id: item.new_ep.id })"
          >
            <div class="card-wrap">
              <el-image :src="item.new_ep.cover" class="image">
                <template #placeholder>
                  <div class="image" v-loading="true"></div>
                </template>
              </el-image>
              <div class="info">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="num">
                  <div class="num-item">
                    {{item.new_ep.index_show}}
                  </div>
                  <div class="num-item">
                    {{item.progress.index_show}}
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <div class="read-all" v-if="!showAll">
        <div class="read-all-btn" @click="showAll = true">
          <svg-icon class="arrow" name="arrow"></svg-icon>
          全部
        </div>
      </div>
    </template>
    <template v-for="items in recommendInfo.bangumiList">
      <div class="hot-area" v-if="items.style == 'v_card'">
        <div class="hot-title">
          {{items.title}}
        </div>
        <div class="video-wrap">
          <b-card
            v-for="item in items.items"
            @click="toMedia({season_id:item['season_id'], ep_id: item['new_ep'].id})"
            class="item"
            :title="item.title"
            :pic="item['cover']"
            :desc="item['desc']"
            :badge_info="item['badge_info']"
          ></b-card>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </div>
      </div>
    </template>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import store from '@/utils/store'
import BCard from './BangumiCard.vue'
import { getBangumiFollowApi, getBangumiInfoApi, getBangumiTimelineApi } from '@/request/api/video/bangumi'
import { BangumiTimeline, Banner, BangumiFollow, Module  } from "@/request/model/video/bangumi"
import { toMedia } from '@/utils/redirect'

const recommendInfo = reactive({
  bannerList: <Banner[]>[{},{},{}],
  timeline: <BangumiTimeline[]>[],
  followList: <BangumiFollow[]>[],
  bangumiList: <Module[]>[]
})
const followShow = ref(false)
const showAll = ref(false)
const tabMap = {
  13: 8,
  167: 11
}
const props = defineProps<{
  rid: number
}>()

// 获取番剧分区信息
const getBangumiInfo = async () => {
  const { result } = await getBangumiInfoApi({tab_id: tabMap[props.rid]})
  recommendInfo.bannerList = result.modules[0].items as Banner[]
  recommendInfo.bangumiList = result.modules
}
// 获取番剧更新日期
const getBangumiTimeline = async () => {
  const { result } = await getBangumiTimelineApi()
  recommendInfo.timeline = result
}
// 获取追番信息
const getBangumiFollow = async () => {
  const { result } = await getBangumiFollowApi()
  if(result) {
    recommendInfo.followList = result
    followShow.value = true;
  }
}

const init = () => {
  getBangumiTimeline()
  getBangumiInfo()
  if(store.user.isLogin) {
    getBangumiFollow()
  }
}

watch(props, () => {
  init()
})
init()
</script>

<style lang="scss" scoped>
.el-scrollbar {
  padding-right: 20px;
  .block-area {
    width: 100%;
    display: flex;
    overflow: hidden;
    .block-left {
      flex: 1;
      .left-title {
        font-size: 24px;
        line-height: 24px;
        font-weight: 400;
        color: #222;
      }
      .timeline-wrap {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-right: 12px;
        padding-top: 8px;
        .el-card {
          width: 260px;
          cursor: pointer;
          margin-bottom: 6px;
          &:hover {
            transform: translateY(-5px);
          }
          transition: 0.3s;
          .card-wrap {
            display: flex;
            .image {
              width: 72px;
              height: 72px;
              border-radius: 4px;
            }
            .info {
              width: 170px;
              padding-left: 8px;
              flex-direction: column;
              .title {
                height: 50px;
              }
              .num {
                color: #AAAAAA;
                line-height: 18px;
                .detail {
                  display: inline-block;
                  background: #b8c0cc;
                  border-radius: 9px;
                  vertical-align: top;
                  text-align: center;
                  padding: 0 4px;
                  font-size: 12px;
                  height: 18px;
                  line-height: 18px;
                  min-width: 28px;
                  max-width: 80px;
                  -o-text-overflow: ellipsis;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  color: #fff;
                  margin-left: 5px;
                }
                .new {
                  background: #ff8eb3;
                }
              }
            }
          }
        }
        i {
          width: 260px;
        }
      }
    }
    .block-right {
      width: 260px;
      .right-title {
        font-size: 18px;
        font-weight: 400;
        height: 24px;
        line-height: 24px;
        margin-bottom: 8px;
      }
      .el-card {
        width: 260px;
        cursor: pointer;
        margin-bottom:8px;
        &:hover {
          transform: translateY(-5px);
        }
        transition: 0.3s;
        .card-wrap {
          display: flex;
          .image {
            width: 96px;
            height: 60px;
            border-radius: 4px;
          }
          .info {
            width: 164px;
            padding-left: 8px;
            flex-direction: column;
            .title {
              height: 20px;
            }
            .num {
              color: #AAAAAA;
              line-height: 16px;
              font-size: 12px;
              .num-item {
                margin-top: 5px;
              }
            }
          }
        }
      }
    }
  }
  .read-all {
    width: 100%;
    text-align: center;
    margin-top: 4px;
    .read-all-btn {
      cursor: pointer;
      .arrow {
        animation: arrow linear 1.2s infinite;
        font-size: 19px;
        line-height: 19px;
      }
      color: #6D757A
    }
  }
  .hot-area {
    width: 100%;
    .hot-title {
      font-size: 24px;
      line-height: 24px;
      font-weight: 400;
      color: #222;
      padding: 8px 0;
    }
    .video-wrap {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        width: 15%;
      }
      i {
        width: 15%;
      }
    }
  }
}
@keyframes arrow{
  25% {
    transform: translateY(-2px);
  }
  50%{
    transform: translateY(0);
  }
  75% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>