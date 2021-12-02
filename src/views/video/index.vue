<template>
  <div class="v-wrap">
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
                <el-button type="primary" class="follow" size="mini" :icon="Plus">关注</el-button>
              </div>
            </div>
          </div>
          <div class="up-info_bottom">
            21/11/05 09:40
          </div>
          <div class="video-title" :title="videoInfo.title">
            {{videoInfo.title}}
          </div>
          <div class="video-desc" :title="videoInfo.desc">
            {{videoInfo.desc}}
          </div>
          <div class="count">
            <svg-icon name="view" />
            <span class="view">{{videoInfo.stat.view}}</span>
            <svg-icon name="barrage" />
            <span class="view">{{videoInfo.stat.danmaku}}</span>
            <svg-icon name="comment"/>
            <span class="view">{{videoInfo.stat.reply}}</span>
          </div>
        </div>
        <div class="btn-wrap">
          <div class="video-status">
            <div class="status-item">
              <el-button circle size="small">
                <svg-icon name="like" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{videoInfo.stat.like}}</span>
            </div>
            <div class="status-item">
              <el-button circle size="small">
                <svg-icon name="money" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{videoInfo.stat.coin}}</span>
            </div>
            <div class="status-item">
              <el-button circle size="small">
                <svg-icon name="star" class="icon" color="#ed5b8c"></svg-icon>
              </el-button>
              <span class="number">{{videoInfo.stat.favorite}}</span>
            </div>
          </div>
          <el-button :icon="Download" class="download-btn" disabled>下载</el-button>
        </div>
      </div>
    </div>
    <div class="r-con">
      <el-tabs v-model="activeTab" >
        <el-tab-pane label="关联视频" name="video" />
        <el-tab-pane label="评论" name="recommend" />
      </el-tabs>
      <div v-show="activeTab == 'video'" class="scroll-wrap">
        <el-scrollbar>
          <VCard @click="changeVideo(item.aid!)"  v-for="item in relatedInfo" :video-info="item" class="v-card"></VCard>
        </el-scrollbar>
      </div>
      <div v-show="activeTab == 'recommend'" class="recommend">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import store from '@/utils/store'
import VCard from '@/views/video/components/RelatedCard.vue'
import { Plus, Download } from '@element-plus/icons'
import PlayerVue from './components/Player.vue'
import useVideoInfo from './composables/useVideoInfo'
import usePlayInfo from './composables/usePlayInfo'
import useRelatedInfo from './composables/useRelatedInfo'
import { ref, onBeforeUnmount, computed } from 'vue'

store.system.isFullScreen = true
const route = useRoute()

const activeTab = ref("video")
const radio = ref('最热')
const Player = ref()

const {playInfo, getPlayInfo } = usePlayInfo()
const {videoInfo, getVideoInfo} = useVideoInfo()
const {relatedInfo, getRelatedInfo} = useRelatedInfo()
// 初始化信息
const init = (aid = route.query.aid as unknown as number) => {
// 获取视频信息
  getVideoInfo({aid}).then(() => {
    const playParams = {
      ...(videoInfo.aid?{avid: videoInfo.aid}:{bvid: videoInfo.bvid}),
      ...{cid: videoInfo.cid}
    }
    // 获取视频流
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

init()

const changeVideo = (aid:number) => {
  Player.value.destroy()
  init(aid)
}

const playerConfig = computed(() => {
  return {
    duration: playInfo.timelength,
    segments: playInfo.durl.map( i => {return { duration: i.length, filesize: i.size, url: i.url}})
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
            margin-right: 6px;
            text-indent: 5px;
          }
        }
      }
      .btn-wrap {
        width: 200px;
        .video-status {
          width: 200px;
          justify-content: center;
          display: flex;
          .status-item {
            display: flex;
            flex-direction: column;
            margin-left: 5px;
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
        .v-card {
          margin-bottom: 8px;
          cursor: pointer;
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