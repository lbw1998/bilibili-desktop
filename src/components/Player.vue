<template>
  <div class="player-wrap">
    <video id="videoPlayer" v-show="!isLoading" controls></video>
    <div class="loading-wrap" v-show="isLoading">
      <div class="loading"></div>
      <div class="loading-tip">正在加载视频...</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'
import { ref } from 'vue'

let flvPlayer: flvjs.Player
interface PlayerConfig {
  segments: Segment[];
  duration: number
}
interface Segment {
  duration: number;
  filesize: number;
  url: string;
}

const isLoading = ref(true)

const props = defineProps<{
  config: PlayerConfig
}>()
const init = (config:PlayerConfig = props.config) => {
  isLoading.value = true
  const {segments, duration} = config
  if (flvjs.isSupported()) {
    var videoPlayer = document.getElementById('videoPlayer') as HTMLElement;
    flvPlayer = flvjs.createPlayer({
        type: 'flv',
        segments,
        duration
    });
    flvPlayer.attachMediaElement(videoPlayer as any );
    // 视频准备播放时
    videoPlayer.addEventListener('loadedmetadata', function(e) {
      isLoading.value = false
    })
    flvPlayer.load();
    flvPlayer.play();
  }
}
const destroy = () => {
  flvPlayer && flvPlayer.destroy()
}
defineExpose({init, destroy})
</script>

<style lang="scss" scoped>
.player-wrap {
  width: 100%;
  height: 100%;
  background: #000;
  box-sizing: border-box;
  #videoPlayer {
    width: 100%;
    height: 100%;
  }
  .loading-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
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