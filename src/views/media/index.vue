<template>
  <div class="v-wrap">
    <div class="l-con">
      <div class="video-wrap">
        <PlayerVue ref="Player" :config="playerConfig" />
      </div>
      <div class="info-wrap">
        <div class="media-info">
          <div class="image-wrap">
            <el-image :src="mediaInfo.cover" class="image">
              <template #placeholder>
                <div class="image" v-loading="true"></div>
              </template>
            </el-image>
          </div>
          <div class="media-detail">
            <div class="media-title">
              {{mediaInfo.title}}
            </div>
            <div class="media-count">
              <el-space :size="5">
                <span>{{formatNumber(mediaStat.views)}}播放</span>
                <span>{{formatNumber(mediaStat.danmakus)}}弹幕</span>
                <span>{{formatNumber(mediaStat.follow)}}追番</span>
              </el-space>
            </div>  
            <div class="media-pub">
              <span class="media-type">番剧</span>
              <span>{{mediaInfo.new_ep && mediaInfo.new_ep.desc}}</span>
            </div>
            <div class="media-desc">
              {{mediaInfo.evaluate}}
            </div>
            <div class="media-rating">
              <span class="score">{{mediaInfo.rating && mediaInfo.rating.score}}</span>
              <p>{{formatNumber(mediaInfo.rating && mediaInfo.rating.count)}}人评分</p>
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="video-status">
            <div class="status-item">
              <el-button circle size="small">
                <svg-icon name="like" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{formatNumber(mediaStat.likes)}}</span>
            </div>
            <div class="status-item">
              <el-button circle size="small">
                <svg-icon name="money" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{formatNumber(mediaStat.coins)}}</span>
            </div>
            <div class="status-item">
              <el-button class="btn" circle size="small">
                <svg-icon name="star" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{formatNumber(mediaStat.follow)}}</span>
            </div>
          </div>
          <el-button class="download-btn" disabled>
            <svg-icon name="download" />下载
          </el-button>
        </div>
      </div>
    </div>
    <div class="r-con">
      <el-tabs>
        <el-tab-pane label="正片">
          <div class="scroll-wrap">
            <el-scrollbar>
              <e-card
                v-for="(item, index) in mediaInfo.episodes"
                :class="`e-card ${cid == item.cid?'actived':''}`" 
                :cover="item.cover"
                :title="item.title"
                :subtitle="item.subtitle"
                :long_title="item.long_title"
                :badge_info="item.badge_info"
                @click="changeEpisode(item.cid)"
              >
              </e-card>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相关推荐">
          <div class="scroll-wrap">
            <el-scrollbar>
              <r-card
                class="r-card"
                v-for="item in mediaRelatedInfo.season"
                :pic="item.new_ep && item.new_ep.cover"
                :title="item.title"
                :name="item.new_ep && item.new_ep.index_show"
                :view="item.stat && item.stat.view"
                :danmaku="item.stat && item.stat.danmaku"
                :badge_info="item.badge_info"
              ></r-card>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论">
           <div class="recommend">
            <div class="r-title">
              <h1>最热评论</h1>
              <el-radio-group v-model="radio" size='mini' >
                <el-radio-button label="最热"></el-radio-button>
                <el-radio-button label="最新"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="r-content"></div>
            <div class="r-footer">
              <el-input
                :rows="2"
                type="textarea"
                placeholder="留下你的评论吧~"
              />
              <el-button>发布</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import store from '@/utils/store'
import ECard from './components/EpisodeCard.vue'
import RCard from '../video/components/RelatedCard.vue'
import PlayerVue from '@/components/Player.vue'
import { useMediaInfo } from './composables/useMediaInfo'
import { useMediaStat } from './composables/useMediaStat'
import { formatNumber } from '@/utils/tools'
import { ref, onBeforeUnmount, computed } from 'vue'
import { useMediaPlayInfo } from './composables/useMediaPlayInfo'
import { useMediaRelatedInfo } from './composables/useMediaRelatedInfo'

store.system.isFullScreen = true
const route = useRoute()

const radio = ref('最热')
const Player = ref()
const cid = ref(route.query.cid as unknown as number || 0)
const activedEpisode = ref(0)

const {mediaInfo, getMediaInfo} = useMediaInfo()
const {mediaStat, getMediaStat} = useMediaStat()
const {mediaPlayInfo, getMediaPlayInfo} = useMediaPlayInfo()
const {mediaRelatedInfo, getMediaRelatedInfo} = useMediaRelatedInfo()
// 初始化信息
const init = (ep_id = route.query.ep_id as unknown as number) => {
  activedEpisode.value = 0
  // 获取视频信息
  getMediaInfo({ep_id}).then( result => {
    cid.value = cid.value || result.episodes[0].cid
    getMediaStat({season_id: result.season_id})
    getMediaRelatedInfo({season_id: result.season_id})
    getMediaPlayInfo({cid: cid.value}).then(() => {
      Player.value.init()
    })
  })
}

init()

const changeEpisode = ( newCid:number) => {
  Player.value.destroy()
  cid.value = newCid
  // 获取视频流
  getMediaPlayInfo({cid: cid.value}).then(() => {
    Player.value.init()
  })
}

const changeMedia = (season_id:number, ep_id:number) => {
  Player.value.destroy()
  init(ep_id)
}

const playerConfig = computed(() => {
  return {
    duration: mediaPlayInfo.timelength,
    segments: mediaPlayInfo.durl.map( i => {return { duration: i.length, filesize: i.size, url: i.url}})
  }
})

onBeforeUnmount(() => {
  store.system.isFullScreen = false
  Player.value.destroy()
})

</script>

<style lang="scss" scoped>
.v-wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 20px;
  display: flex;
  .l-con {
    width: calc(100% - 340px);
    height: 100%;
    .video-wrap {
      margin-top: 14px;
      width: 100%;
      background: #000;
      height: calc(100vh - 280px);
    }
    .info-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      .media-info {
        width: calc(100% - 220px);
        display: flex;
        .image-wrap {
          width: 134px;
          height: 179px;
          margin-right: 8px;
          .image {
            width: 134px;
            height: 179px;
            border-radius: 4px;
            display: inline-block;
          }
        }
        .media-detail {
          display: flex;
          flex-direction: column;
          .media-title {
            display: block;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #212121;
            font-weight: 500;
            margin-top: 4px;
            margin-bottom: 16px;
            padding-right: 240px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .media-count {
            height: 16px;
            line-height: 16px;
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
          }
          .media-pub {
            margin-bottom: 8px;
            font-size: 12px;
            color: #212121;
            vertical-align: middle;
            height: 16px;
            line-height: 16px;
            .media-type {
              margin-right: 10px;
            }
          }
          .media-desc {
            font-size: 12px;
            color: #212121;
            min-height: 18px;
            line-height: 18px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .media-rating {
            margin-top: 11px;
            .score {
              position: relative;
              height: 24px;
              line-height: 24px;
              font-weight: 700;
              font-size: 24px;
              color: #ffa726;
              margin-bottom: 4px;
              &::after {
                content: "分";
                display: inline-block;
                width: 14px;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                text-align: right;
                font-family: PingFangSC-Regular;
                font-weight: 400;
              }
            }
            p {
              height: 16px;
              line-height: 16px;
              font-size: 12px;
              color: #999;
            }
          }
        }
      }
      .btn-wrap {
        width: 200px;
        .video-status {
          width: 100%;
          justify-content: space-between;
          display: flex;
          .status-item {
            display: flex;
            flex-direction: column;
            margin-left: 5px;
            align-items: center;
            .btn {
              width: 48px;
            }
            .icon {
              font-size: 28px;
            }
            .number {
              width: 100%;
              text-align: center;
              color: #999;
            }
          }
        }
        .download-btn {
          width: 200px;
          margin-top: 20px;
        }
      }
    }
  }
  .r-con {
    width: 320px;
    height: 100%;
    flex: none;
    margin-left: 30px;
    .scroll-wrap {
      width: 336px;
      height: calc(100vh - 116px);
      .el-scrollbar {
        height: 100%;
        .e-card {
          margin-bottom: 8px;
          cursor: pointer;
        }
        .actived {
          border: 2px solid #ed5b8c;
        }
        .r-card {
          margin-bottom: 8px;
        }
      }
    }
    .recommend {
      width: 336px;
      height: calc(100vh - 116px);
      .r-title {
        display: flex;
        justify-content: space-between;
        padding-right: 16px;
        align-items: center;
      }
      .r-content {
        padding-right: 16px;
        background-color: pink;
        height: calc(100vh - 220px);
      }
      .r-footer {
        margin-top: 8px;
        display: flex;
        padding-right: 20px;
        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>