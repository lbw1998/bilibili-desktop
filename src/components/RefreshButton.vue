<template>
    <el-button type="info" class="refresh" circle>
      <svg-icon name="refresh" />
    </el-button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  animated: {
    type: Boolean,
    default: false
  }
})
const refresh = computed(() => props.animated === true ?'running':'paused')

</script>

<style lang="scss" scoped>
  .refresh {
    color: #409EFF;
    animation: rotate 2s linear infinite;
    animation-play-state: v-bind(refresh);
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>