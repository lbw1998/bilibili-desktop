<template>
  <div class="header-wrap">
    <div class="search-wrap">
      <el-button type="info" class="back" :icon="ArrowLeftBold" v-show="store.system.isFullScreen" circle @click="router.back()"></el-button>
      <el-input
        class="search-input"
        placeholder="搜索视频,番剧或UP主"
        :prefix-icon="Search"
        :input-style="{borderRadius: `var(--el-border-radius-round)`}"
      />
    </div>
    <el-space>
      <div class="btn" @click="handleWindow('minWindow')" style="background-color: #909399;" >
        <svg t="1636980864414" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2253" width="14" height="14"><path d="M928.2 548h-832c-17.7 0-32-14.3-32-32s14.3-32 32-32h832c17.7 0 32 14.3 32 32s-14.3 32-32 32z" p-id="2254" fill="#ffffff"></path></svg>
      </div>
      <div class="btn" @click="handleWindow('maxWindow')" style="background-color: #E6A23C;" >
        <svg t="1636980838192" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1998" width="14" height="14"><path d="M892.3 224H133c-37.9 0-68.8 30.9-68.8 68.8V795c0 37.9 30.9 68.8 68.8 68.8h759.3c37.9 0 68.8-30.9 68.8-68.8V292.7c0-37.9-30.8-68.7-68.8-68.7zM133 288h759.3c2.6 0 4.8 2.1 4.8 4.8v57.7H128.2v-57.7c0-2.7 2.2-4.8 4.8-4.8z m759.3 511.7H133c-2.6 0-4.8-2.1-4.8-4.8V414.3h768.9V795c0 2.6-2.1 4.7-4.8 4.7z" p-id="1999" fill="#ffffff"></path></svg>
      </div>
      <div class=" btn " @click="handleWindow('closeWindow')" style="background-color: #F56C6C;" >
        <svg t="1636980708154" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1639" width="14" height="14"><path d="M556.6 513.2L827.8 242c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L511.3 468 240.1 196.7c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l271.3 271.3-271.3 271.2c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l271.3-271.3 271.3 271.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L556.6 513.2z" p-id="1640" fill="#ffffff"></path></svg>
      </div>
    </el-space>
  </div>
</template>

<script lang="ts" setup>
import store from '@/utils/store'
import { useRouter } from 'vue-router'
import { ArrowLeftBold, Search } from '@element-plus/icons'

const router = useRouter()

const { ipcRenderer } = require('electron')
const handleWindow = (data:string) => {
  ipcRenderer.send('handleWindow', data)
}
  
</script>

<style lang="scss" scoped>
.header-wrap {
  width: 100%;
  height: 40px;
  -webkit-app-region:drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .search-wrap {
    transform: translateY(6px);
    padding-left: 20px;
    display: flex;
    .back {
      color: #999999;
      margin-right: 20px;
      -webkit-app-region: no-drag;
    }
    .search-input {
      border-radius: 50%;
      -webkit-app-region: no-drag;
    }
  }
  .el-space {
    -webkit-app-region: no-drag;
    .btn {
      display: flex;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-weight: bold;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .icon {
      opacity: 0;
      transition: opacity 0.2s;
    }
    &:hover {
      .icon {
        opacity: 1;
      }
    }
  }
}
</style>

