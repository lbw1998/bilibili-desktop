<template>
  <video id="videoPlayer" crossorigin="anonymous"></video>
</template>

<script lang="ts" setup>
import flvjs from 'flv.js'

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

const props = defineProps<{
  config: PlayerConfig
}>()
const init = (config:PlayerConfig = props.config) => {
  const {segments, duration} = config
  if (flvjs.isSupported()) {
    var videoPlayer = document.getElementById('videoPlayer');
    flvPlayer = flvjs.createPlayer({
        type: 'flv',
        segments,
        duration
    });
    flvPlayer.attachMediaElement(videoPlayer as any );
    flvPlayer.load();
    flvPlayer.play();
  }
}
defineExpose({init})
</script>

<style lang="scss" scoped>
#videoPlayer {
  width: 100%;
  height: 100%;
}

</style>