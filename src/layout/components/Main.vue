<template>
  <div class="main-wrap">
    <!-- <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>     -->
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>


