<template>
  <div class="player-wrap" :style="{position: playerInfo.isFullScreen?'fixed':'relative'}">
    <video 
      id="videoPlayer"
      @ended="handleEnded"
      @seeking="handleSeeking"
      @waiting="handleWaiting"
      @playing="playerInfo.isSeeking = false"
      @timeupdate="timeupdate($event)"
      @seeked="playerInfo.isSeeking = false"
      autoplay
    >
      </video>
    <div class="player-control-wrap" v-if="!playerInfo.isLoading" v-show="playerInfo.isShowControl">
      <div class="player-control">
        <div class="player-control-top">
          <div class="player-progress">
            <div class="player-bar-wrap">
              <div class="player-all-bar">
                <div class="player-real-bar" :style="{width: playerInfo.currentDuration/playerInfo.duration * 100 +'%'}"></div>
                <div class="player-bar-buffer" :style="{width: playerInfo.buffPercent + '%'}"></div>
                <input
                  class="player-bar-input"
                  type="range"
                  min="0"
                  max="1000"
                  @mousedown="playerInfo.isDragProgress = true"
                  @mouseup="playerInfo.isDragProgress = false"
                  @change="slide($event)"
                  v-model="playerInfo.playPercent"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="player-control-bottom">
          <div class="player-control-bottom-left">
            <div class="player-state-wrap" @click="handlePlay">
              <svg-icon class="icon player-video-btn" :name="playerInfo.isPaused?'play':'pause'" ></svg-icon>
            </div>
            <div class="player-time">
              {{formatTime(playerInfo.currentDuration)}} / {{formatTime(playerInfo.duration)}}
            </div>
          </div>
          <div class="player-control-bottom-right">
            <el-dropdown class="player-quality" placement="top" :appendToBody="false">
              <span class="player-dropdwon player-video-btn">
                {{playerInfo.quality.title}}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <template v-for="item in props.config.qualityList">
                    <el-dropdown-item class="player-quality-item" v-if="item.value !== 16" @click="changeQuality(item)">
                      {{ item.title }}
                    </el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown class="player-speed" placement="top" :append-to-body="false">
              <span class="player-dropdwon player-video-btn">
                {{playerInfo.speed == 1?'倍数':
                (String(playerInfo.speed).includes('.')?playerInfo.speed+'x':playerInfo.speed+'.0x')}}
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="item in speedList" @click="chooseSpeed(item)" >
                    <span class="player-speed-title">{{item + 'x'}}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-popover
              placement="top"
              class="player-loudspeaker"
              :width="30"
              trigger="hover"
              :append-to-body="false"
              popper-class="player-popper"
            >
              <template #reference>
                <svg-icon 
                  class="icon player-video-btn" 
                  :name="playerInfo.isMuted || !playerInfo.volume ?'unloudspeaker':'loudspeaker'" 
                  @click="setMuted"
                  color="#999999" />
              </template>
              <el-slider 
                v-model="playerInfo.volume" 
                vertical 
                input-size="mini" 
                height="100px"
                @input="setVolume"
                > </el-slider>
            </el-popover>
            <div class="player-fullscreen" @click="fullScreen">
              <svg-icon class="icon player-video-btn" :name="playerInfo.isFullScreen?'unfullscreen':'fullscreen'"></svg-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-wrap" @mouseenter="handControlShow" @mousemove="handControlShow" @click="handlePlay" >
      <div class="loading-wrap" v-show="playerInfo.isLoading">
        <div class="loading"></div>
        <div class="loading-tip">正在加载视频...</div>
      </div>
      <div class="seeking-wrap" v-show="playerInfo.isSeeking && !playerInfo.isLoading">
        <div class="seeking">
          <svg-icon class="seeking-icon" name="seeking" color="#38B5DE"/>
          <p class="seeking-tip">正在缓冲...{{playerInfo.seekingSpeed}}KB/s</p>
        </div>
      </div>
      <div class="video-state" v-show="playerInfo.isPaused">
        <svg-icon name="bili_play" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatTime } from '@/utils/tools'
import flvjs from 'flv.js'
import { ref, reactive } from 'vue'

let flvPlayer: flvjs.Player
interface PlayerConfig {
  segments: Segment[]
  qualityList: {title: string, value: number}[]
}
interface Segment {
  duration: number;
  filesize: number;
  url: string;
}

const speedList = ref([2, 1.5, 1.25, 1 , 0.75, 0.5])
const playerInfo = reactive({
  speed: 1,
  duration: 1,
  volume: 50,
  buffPercent: 0,
  playPercent: 0,
  isPaused: false,
  isLoading: true,
  isSeeking: false,
  seekingSpeed: 0,
  currentDuration: 0,
  isMuted: false,
  isFullScreen: false,
  isShowControl: false,
  isDragProgress: false,
  quality: <{title:string, value: number}>{title: '自动', value: 0}
})

const props = defineProps<{
  config: PlayerConfig
}>()

const emit = defineEmits<{
  (event: 'changeQuality', qn:number):void
}>()

let videoPlayer:HTMLVideoElement;
// 缓冲区时间
let buffertimer:NodeJS.Timer | null = null
// 控制栏消失时间
let controlTimer:NodeJS.Timer | null = null

// 选择速度
const chooseSpeed = (speed:number) => {
  playerInfo.speed = speed
  videoPlayer.playbackRate = speed
}
//播放进度更新回调
const timeupdate = (e:Event) => {
  let dom = e.target as HTMLVideoElement;
  // 视频时长
  playerInfo.duration = dom.duration || 1;
  // currentTime 当前播放时长
  playerInfo.currentDuration = dom.currentTime;
  //当前缓冲进度时长结束位置
  const buffLength = dom.buffered.length
  if (buffLength != 0) {
    var currentBuffer = dom.buffered.end(buffLength - 1);
    var percentage = (100 * currentBuffer) / playerInfo.duration;
    playerInfo.buffPercent = percentage;
    if(currentBuffer === dom.currentTime) {
      loadBuffer()
    }
  }
  if(!playerInfo.isDragProgress) {
    playerInfo.playPercent = playerInfo.currentDuration/playerInfo.duration * 1000
  }
}
const slide = (e:Event, type?:string) => {
  buffertimer && clearInterval(buffertimer!)
  //进度滑动设置
  const dom = e.target as HTMLInputElement;
  playerInfo.currentDuration = 
    (Number(dom.value) * playerInfo.duration) / 1000;

  // if (type == "continue") {
  //   videoPlayer.pause();
  // } else {
      videoPlayer.currentTime = playerInfo.currentDuration;
      loadBuffer()
  // }
}
// 设置静音
const setMuted = () => {
  playerInfo.isMuted = !playerInfo.isMuted
  videoPlayer.muted = playerInfo.isMuted
}
// 缓冲区加载
const loadBuffer = () => {
  buffertimer = setInterval(() => {
    const buffLength = videoPlayer.buffered.length
    if (buffLength != 0) {
      var currentBuffer = videoPlayer.buffered.end(buffLength - 1);
      var percentage = (100 * currentBuffer) / playerInfo.duration;
      playerInfo.buffPercent = percentage;
      if(currentBuffer - playerInfo.currentDuration > 10) {
        videoPlayer.currentTime = playerInfo.currentDuration
        clearInterval(buffertimer!)
      }
    }
  }, 1000)
}
// 播放暂停
const handlePlay = () => {
  playerInfo.isPaused?videoPlayer.play():videoPlayer.pause()
  playerInfo.isPaused = !playerInfo.isPaused
}
// 设置音量
const setVolume = (volume: number) => {
  videoPlayer.volume = volume / 100
}
const fullScreen = () => {
  if (playerInfo.isFullScreen) {
    document.exitFullscreen()
  } else {
    document.getElementsByClassName('player-wrap')[0].requestFullscreen()
  }
  playerInfo.isFullScreen = !playerInfo.isFullScreen
}
// 缓冲
const handleSeeking = () => {
  playerInfo.isSeeking = true
  flvPlayer.on('statistics_info', function(res) {
      playerInfo.seekingSpeed = res.speed.toFixed(2)
  })
}
// 
const handleWaiting = () => {
  handleSeeking()
}
// 视频播放结束
const handleEnded = () => {
  buffertimer && clearInterval(buffertimer!)
}
// 切换清晰度
const changeQuality = (item:{ title: string; value: number; }) => {
  playerInfo.quality = item
  emit('changeQuality', item.value) 
}
// 显示控制栏
const handControlShow = () => {
  controlTimer && clearTimeout(controlTimer)
  playerInfo.isShowControl = true
  controlTimer = setTimeout(() => {
    playerInfo.isShowControl = false;
  }, 3000);
}
const init = (config:PlayerConfig = props.config) => {
  playerInfo.isLoading = true
  const {segments} = config
  if (flvjs.isSupported()) {
    videoPlayer = document.getElementById('videoPlayer') as  HTMLVideoElement
    flvPlayer = flvjs.createPlayer({
        type: 'flv',
        segments
    });
    flvPlayer.attachMediaElement(videoPlayer as any );
    // 视频准备播放时
    videoPlayer.addEventListener('loadedmetadata', function(e) {
      playerInfo.isLoading = false
    })
    flvPlayer.load();
    flvPlayer.play();
  }
}

const destroy = () => {
  handleEnded()
  flvPlayer?.destroy()
}

defineExpose({init, destroy})

</script>

<style lang="scss" scoped>
.player-wrap {
  width: 100%;
  height: 100%;
  background: #000;
  top: 0;
  left: 0;
  box-sizing: border-box;
  position: relative;
  #videoPlayer {
    width: 100%;
    height: 100%;
  }
  .player-video-btn {
    fill: #ffffffCC;
    font-size: 23px;
    color: #ffffffCC;
    &:hover {
      fill: #fff;
      color: #fff;
      cursor: pointer;
    }
  }
  .player-control-wrap {
    z-index: 70;
    padding: 0 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    transition: opacity .2s ease-in;
    .player-control {
      display: flex;
      flex-shrink: 0;
      position: relative;
      z-index: 71;
      height: 44px;
      line-height: 36px;
      zoom: 1;
      .player-control-top {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 32px;
        .player-progress {
          cursor: pointer;
          height: 14px;
          display: flex;
          vertical-align: middle;
          align-items: center;
          justify-content: center;
          &:hover .player-bar-wrap .player-all-bar {
            height: 4px;
          }
          .player-bar-wrap {
            position: relative;
            width: 100%;
            .player-all-bar {
              height: 2px;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              border-radius: 1.5px;
              background: hsla(0,0%,100%,.2);
              .player-real-bar {
                background-color: #ed5b8c;
                height: 100%;
                position: absolute;
                z-index: 1;
              }
              .player-bar-buffer {
                background: hsla(0,0%,100%,.3);
                height: 100%;
                position: absolute;
              }
              .player-bar-input {
                position: absolute;
                height: 100%;
                margin: auto;
                width: 100%;
                z-index: 999;
                cursor: pointer;
                opacity: 0;
              }
            }
          }
        }
      }
      .player-control-bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 29px;
        line-height: 22px;
        margin: 14px 0 0;
        .player-control-bottom-left {
          display: flex;
          .player-state-wrap {
            width: 36px;
            margin-left: -12px;
            padding-left: 12px;
            margin-right: 10px;
            .icon {
              width: 100%;
            }
          }
          .player-time {
            color: #FFFFFFE6;
            font-size: 12px;
            line-height: 29px;
          }
        }
        .player-control-bottom-right {
          display: flex;
          align-items: center;
          .player-quality {
            .player-quality-item {
              width: 140px;
            }
          }
          .player-dropdwon {
            font-size: 14px;
            margin-right: 12px;
          }
          .player-speed {
            .player-speed-title {
              width: 100%;
              text-align: center;
            }
          }
          .player-loudspeaker {
          }
          .player-fullscreen {
            margin-left: 12px;
          }
        }
      }
    }
  }
  .video-wrap {
    width: 100%;
    height: 100%;
    top: 0;
    cursor: pointer;
    position: absolute;
    .loading-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      .loading {
        width: 320px;
        height: 184px;
        z-index: 999;
        background: url("../assets/img/loading.png");
        transform: scale(.5);
        animation: iconAnimation .94s steps(1) infinite;
      }
      .loading-tip {
        position: absolute;
        left: 5px;
        bottom: 40px;
        color: white;
      }
    }
    .seeking-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      .seeking {
        text-align: center;
        .seeking-icon {
          font-size: 24px;
        }
        .seeking-tip {
          color: #ffffff
        }
      }
    }
    .video-state {
      position: absolute;
      width: 64px;
      height: 64px;
      font-size: 64px;
      right: 14px;
      bottom: 64px;
    }
  }
}

@keyframes iconAnimation {
  0% {
    background-position: 0 0;
  }
  6.25% {
      background-position: -320px 0;
  }
  12.5% {
      background-position: -640px 0;
  }
  18.75% {
      background-position: -960px 0;
  }
  25% {
      background-position: -1280px 0;
  }
  31.25% {
      background-position: -1600px 0;
  }
  37.5% {
      background-position: -1920px 0;
  }
  43.75% {
      background-position: -2240px 0;
  }
  50% {
      background-position: -2560px 0;
  }
  56.25% {
      background-position: -2880px 0;
  }
  62.5% {
      background-position: -3200px 0;
  }
  68.75% {
      background-position: -3520px 0;
  }
  75% {
      background-position: -3840px 0;
  }
  81.25% {
      background-position: -4160px 0;
  }
  87.5% {
      background-position: -4480px 0;
  }
  93.75% {
      background-position: 0 -184px;
  }
  100% {
      background-position: -320px -184px;
  }
}

</style>

<style lang="scss">
.player-popper {
  min-width: 30px !important;
  .el-slider.is-vertical .el-slider__runway {
    margin: 0;
  }
}
</style>