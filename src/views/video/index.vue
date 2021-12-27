<template>
  <div class="v-wrap" @click="clearReplyItem">
    <div class="l-con">
      <div class="video-wrap">
        <PlayerVue ref="Player" :config="playerConfig" />
      </div>
      <div class="info-wrap">
        <div class="up-info">
          <div class="up-info_top">
            <el-avatar :size="38" :src="videoInfo.owner.face" ></el-avatar>
            <div class="up-info_right">
              <div class="name">
                <span class="username">{{videoInfo.owner.name}}</span>
              </div>
              <div class="message">
                <el-button type="primary" class="follow" size="mini"> 
                  <svg-icon name="plus" />关注
                </el-button>
              </div>
            </div>
          </div>
          <div class="up-info_bottom">
            {{parseTimestamp(videoInfo.ctime)}}
          </div>
          <div class="video-title" :title="videoInfo.title">
            {{videoInfo.title}}
          </div>
          <div class="video-desc" :title="videoInfo.desc">
            {{videoInfo.desc}}
          </div>
          <div class="count">
            <svg-icon name="view" />
            <span class="view">{{formatNumber(videoInfo.stat?.view)}}</span>
            <svg-icon name="barrage" />
            <span class="view">{{formatNumber(videoInfo.stat?.danmaku)}}</span>
            <svg-icon name="comment"/>
            <span class="view">{{formatNumber(videoInfo.stat?.reply)}}</span>
          </div>
        </div>
        <div class="btn-wrap">
          <video-state 
            :like="videoInfo.stat?.like"
            :coin="videoInfo.stat?.coin"
            :favorite="videoInfo.stat?.favorite"
            :aid="oid"
          />
        </div>
      </div>
    </div>
    <div class="r-con">
      <el-tabs v-model="actived">
        <el-tab-pane label="分集" name="分集" v-if="videoInfo.videos !== 1">
          <div class="scroll-wrap">
            <el-scrollbar>
              <el-card 
                v-for="(item, key) in videoInfo.pages" 
                @click="changeEpisode(item.cid, key)" 
                :class="`episode-card ${activedEpisode==key?'activedEpisode':''}`" 
                shadow="hover"
                :title="item.part"
                :body-style="{ 
                  padding: '8px', 
                  display: 'flex', 
                  alignItems: 'center'
                }"
              >
                <span class="index">{{key + 1}}</span>
                <p class="part">{{item.part}}</p>
              </el-card>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="关联视频" name="关联视频">
          <div class="scroll-wrap">
            <el-scrollbar>
              <v-card 
                @click="changeVideo(item.aid!)"  
                v-for="item in relatedInfo"
                :pic="item.pic"
                :title="item.title"
                :name="item.owner?.name"
                :view="item.stat?.view"
                :danmaku="item.stat?.danmaku"
                class="v-card">
              </v-card>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评论" name="评论">
        </el-tab-pane>
      </el-tabs>
      <reply-area
        v-if="actived == '评论'"
        ref="Reply"
        :type="1"
        :oid="oid"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import store from '@/utils/store'
import VCard from '@/views/video/components/RelatedCard.vue'
import VideoState from '@/components/VideoState.vue'
import PlayerVue from '@/components/Player.vue'
import useVideoInfo from './composables/useVideoInfo'
import usePlayInfo from './composables/usePlayInfo'
import useRelatedInfo from './composables/useRelatedInfo'
import { parseTimestamp, formatNumber } from '@/utils/tools'
import { ref, onBeforeUnmount, computed } from 'vue'
import ReplyArea from '@/components/ReplyArea.vue'

store.system.isFullScreen = true

const route = useRoute()
const Player = ref()
const Reply = ref()
const activedEpisode = ref(0)
// 评论区ID
const oid = ref(~~route.query.aid!)
const actived = ref("关联视频")

const {playInfo, getPlayInfo } = usePlayInfo()
const {videoInfo, getVideoInfo} = useVideoInfo()
const {relatedInfo, getRelatedInfo} = useRelatedInfo()

// 初始化信息
const init = ({aid = route.query.aid as unknown as number, bvid =route.query.bvid as unknown as string}) => {
  activedEpisode.value = 0
  const params = aid?{aid}:{bvid}
  // 获取视频信息
  getVideoInfo(params).then(() => {
    actived.value =  (videoInfo.videos !== 1)?"分集":"关联视频"
    const playParams = {
      ...(videoInfo.aid?{avid: videoInfo.aid}:{bvid: videoInfo.bvid}),
      ...{cid: videoInfo.cid}
    }
    // 获取视频流并播放
    getPlayInfo(playParams).then(() => {
      Player.value.init()
    })
    const relatedParams = {
      ...(videoInfo.aid?{aid: videoInfo.aid}:{bvid: videoInfo.bvid}),
    }
    // 获取视频推荐信息
    getRelatedInfo(relatedParams)
  })
}

init({})

const changeVideo = (aid:number) => {
  Player.value.destroy()
  oid.value = aid
  init({aid})
}

const changeEpisode = ( cid:number, index:number) => {
  Player.value.destroy()
  activedEpisode.value = index
  // 获取视频流
  const playParams = {
    ...(videoInfo.aid?{avid: videoInfo.aid}:{bvid: videoInfo.bvid}),
    ...{cid}
  }
  getPlayInfo(playParams).then(() => {
    Player.value.init()
  })
}

const playerConfig = computed(() => {
  return {
    duration: playInfo.timelength,
    segments: playInfo.durl.map( i => {return { duration: i.length, filesize: i.size, url: i.url}})
  }
})

const clearReplyItem = () => {
  // Reply.clearReplyItem()
}

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
  display: flex;
  .l-con {
    width: calc(100% - 340px);
    height: 100%;
    .video-wrap {
      margin-top: 14px;
      width: 100%;
      height: calc(100vh - 280px);
    }
    .info-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      .up-info {
        width: calc(100% - 220px);
        display: flex;
        flex-direction: column;
        .up-info_top {
          box-sizing: border-box;
          padding-bottom: 5px;
          display: flex;
          .up-info_right {
            width: 256px;
            margin-left: 13px;
            .name {
              line-height: 20px;
              height: 20px;
              .username {
                position: relative;
                font-size: 14px;
                color: #212121;
                font-weight: 500;
                display: inline-block;
                max-width: 180px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                vertical-align: top;
                &:hover {
                  color: #00a1d6;
                  cursor: pointer;
                }
              }
              
            }
            .message {
              font-size: 12px;
              color: #505050;
              display: inline-block;
              cursor: pointer;
              .follow {
                padding: 1px 5px;
                min-height: 10px;
              }
              .icon {
                font-size: 16px;
                margin-right: 4px;
                height: 16px;
                width: 16px;
                vertical-align: text-bottom;
              }
              &:hover {
                color: #00a1d6;
                }
            }
            .btn-panel {
              display: flex;
              margin-top: 5px;
            }
          }
        }
        .up-info_bottom {
          font-size: 12px;
          color: #999;
        }
        .video-title {
          width: 100%;
          padding-top: 8px;
          padding-bottom: 4px;
          font-size: 22px;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .video-desc {
          font-size: 14px;
          color: #999;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .count {
          display: inline-block;
          width: 100%;
          padding: 4px 0;
          height: 16px;
          color: #999;
          .view {
            font-size: 12px;
            // width: 60px;
            display: inline-block;
            margin-right: 12px;
            text-indent: 5px;
          }
        }
      }
      .btn-wrap {
        width: 200px;
      }
    }
  }
  .r-con {
    width: 320px;
    height: 100%;
    flex: none;
    margin-left: 20px;
    position: relative;
    .el-tabs {
      :deep(.el-tabs__header) {
        padding-right: 20px;
      }
    }
    .scroll-wrap {
      width: 100%;
      height: calc(100vh - 116px);
      .el-scrollbar {
        height: 100%;
        padding-right: 20px;
        box-sizing: border-box;
        .v-card {
          width: 300px;
          margin-bottom: 8px;
        }
        .episode-card {
          width: 300px;
          cursor: pointer;
          margin-bottom: 4px;
          font-weight: bold;
          align-items: center;
          .index {
            width: 35px;
          }
          .part {
            width: 263px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .activedEpisode {
          border: 2px solid #ed5b8c;
        }
      }
    }
    
  }
}
</style>