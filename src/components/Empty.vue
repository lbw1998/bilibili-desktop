<template>
  <div class="empty-wrap">
    <img src="../assets/img/empty.png" >
    <p class="tip">{{tip || "什么都没有找到啊 T_T"}}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tip?: string
}>()
</script>

<style lang="scss" scoped>
  .empty-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 480px;
    }
    .tip {
      font-size: 15px;
      color: #757575;
      margin-top: 10px;
    }
  }
</style>