<template>
  <div class="v-wrap">
    <div class="l-con">
      <div class="video">
        <PlayerVue ref="Player" :config="playerConfig" />
      </div>
      <div class="info-wrap">
        <div class="up-info">
          <div class="up-info_top">
            <el-avatar :size="38" ></el-avatar>
            <div class="up-info_right">
              <div class="name">
                <span class="username">侯颖俊</span>
                <div class="message">
                  <el-button type="primary" class="follow" size="mini" :icon="Plus">关注</el-button>
                </div>
              </div>
              <div class="desc">
                快乐永相随。（这个后生不怕冷
              </div>
            </div>
          </div>
          <div class="up-info_bottom">
            21/11/05 09:40
          </div>
        </div>
        <div class="video-status">
          <div class="status-item">
            <el-button circle size="small">
              <svg-icon name="like" class="icon" color="#ed5b8c"></svg-icon>
            </el-button>
            <span class="number">130</span>
          </div>
          <div class="status-item">
            <el-button circle size="small">
              <svg-icon name="money" class="icon" color="#38B5DE"></svg-icon>
            </el-button>
            <span class="number">130</span>
          </div>
          <div class="status-item">
            <el-button circle size="small">
              <svg-icon name="star" class="icon" color="#ed5b8c"></svg-icon>
            </el-button>
            <span class="number">130</span>
          </div>
        </div>
      </div>
    </div>
    <div class="r-con">
      <el-tabs v-model="activeTab" >
        <el-tab-pane label="关联视频" name="video" />
        <el-tab-pane label="评论" name="recommend" />
      </el-tabs>
      <div v-show="activeTab == 'video'" class="scroll-wrap">
        <el-scrollbar style="height: 100%;">
          <div class="infinite-list-wrapper" infinite-scroll-distance="100" infinite-scroll-delay="1000" v-infinite-scroll="load">
            <VCard v-for="i in count" class="v-card"></VCard>
          </div>
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
        <el-card shadow="hover"  class="r-footer" :body-style="{ padding: '5px',display: 'flex' }">
          <el-input
            :rows="2"
            type="textarea"
            placeholder="留下你的评论吧~"
          />
          <el-button>发布</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import store from '@/utils/store'
import VCard from '@/components/VideoCard.vue'
import { Plus } from '@element-plus/icons'
import PlayerVue from './components/Player.vue'
import useVideoInfo from './composables/useVideoInfo'
import usePlayInfo from './composables/usePlayInfo'
import { ref, onUnmounted, onMounted, computed } from 'vue'

store.system.isFullScreen = true
const route = useRoute()

const activeTab = ref("video")
const count = ref(10)
const radio = ref('最热')
const Player = ref()
const {playInfo, getPlayInfo } = usePlayInfo()
const {videoInfo, getVideoInfo} = useVideoInfo()

getVideoInfo({bvid: route.params.bvid as string}).then(() => {
  const playParams = {
    ...(videoInfo.avid?{avid: videoInfo.avid}:{bvid: videoInfo.bvid}),
    ...{cid: videoInfo.cid}
  }
  getPlayInfo(playParams).then(() => {
    Player.value.init()
  })
})

const playerConfig = computed(() => {
  return {
    duration: playInfo.timelength,
    segments: playInfo.durl.map( i => {return { duration: i.length, filesize: i.size, url: i.url}})
  }
})
const load = () => {
  count.value += 2
}

onUnmounted(() => {
  store.system.isFullScreen = false
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
    .video {
      margin-top: 14px;
      width: 100%;
      height: calc(100vh - 220px);
      background: #000;
    }
    .info-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding-top: 15px;
      .up-info {
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
              .message {
                margin-left: 12px;
                font-size: 12px;
                color: #505050;
                display: inline-block;
                vertical-align: middle;
                cursor: pointer;
                .follow {
                  padding: 2px 5px;
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
            }
            .desc {
              margin-top: 4px;
              width: 256px;
              font-size: 12px;
              line-height: 16px;
              height: 16px;
              color: #999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
      }
      .video-status {
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
        .infinite-list-wrapper {
          .v-card {
            margin-bottom: 8px;
          }
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
        .el-button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>