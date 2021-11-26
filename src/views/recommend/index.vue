<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">推荐</b>
      <refresh-button @click="refreshAll" :animated="refresh"></refresh-button>
    </div>
    <!-- <el-tabs v-model="activeRid" @tab-click="handleClick">
      <el-tab-pane v-for="item in ridList" :name="item.rid" :key="item.rid">
      <template #label>
          <div class="tab-wrap">
            <svg-icon class="icon" :name="item.code" />
            <span>{{item.label}}</span>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs> -->
  </div>
  <el-scrollbar >
    <div class="contain-wrap">
      <div class="item" v-for="(item, key) in itemList">
        <el-skeleton :loading="skeletonList" animated>
          <template #template>
            <div class="item">
              <el-skeleton-item variant="image" style="width: 300px;height:200px"/>
              <div style="padding: 14px">
                <el-skeleton-item variant="h3" style="width: 50%" />
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-items: space-between;
                    margin-top: 16px;
                    height: 16px;
                  "
                >
                  <el-skeleton-item variant="text" style="margin-right: 16px" />
                  <el-skeleton-item variant="text" style="width: 30%" />
                </div>
              </div>
            </div>
          </template>
          <template #default>
              <el-card  :body-style="{ padding: '0px' }" @click="toVideo({bvid: item.bvid})">
                <img
                  :src="item.pic"
                  class="image"
                />
                <div class="item-info">
                  <div class="owner">
                    <!-- <el-avatar :size="36" :src="item.owner.face"></el-avatar> -->
                    <span class="owner-name">{{item.owner.name}}</span>
                  </div>
                  <div class="item-title">
                    <b>{{item.title}}</b>
                  </div>
                  <div class="item-bottom">
                    <svg-icon name="view" />
                    <span class="view">{{item.stat.view}}</span>
                    <svg-icon name="barrage" />
                    <span class="view">{{item.stat.like}}</span>
                  </div>
                </div>
              </el-card>
          </template>
        </el-skeleton>
      </div>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import RefreshButton from '@/components/RefreshButton.vue'
import { ridList } from '@/utils/rid'
import { refreshAllApi, Item } from "@/api/video/recommend"
import { toVideo } from '@/utils/redirect'

const itemList = ref(<Item[]>[])
const refresh = ref(false)
const skeletonList = ref(true)
const activeRid = ref(0)

const refreshAll = () => {
  refresh.value = true
  skeletonList.value = true
  refreshAllApi().then( res => {
    itemList.value = res.data.item
    skeletonList.value = false
    refresh.value = false
    skeletonList.value = false
  })
}

refreshAll()

</script>

<style lang="scss" scoped>
  .header {
    padding-right: 20px;
    .title-bar {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
      .title {
        font-size: 28px;
      }
    }
    .tab-wrap {
      display: flex;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
        margin-right: 5px;
      }
    }
  }
  .contain-wrap {
    width: 100%;
    height: calc(100vh - 158px);
    padding-right: 20px;
    padding-top: 5px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-around;
    flex-wrap: wrap;
    transition: transform 0.3s ;
    .item {
      width: 300px;
      height: 280px;
      margin-bottom: 10px;
      .image {
        width: 100%;
      }
      .item-info {
        padding: 8px;
        .owner {
          display: flex;
          align-items: center;
          .owner-name {
            color: #999999;
          }
        }
        .item-title {
          width: 270px;
          /*强制文字在一行文本框内*/
          white-space: nowrap;
          /*溢出部分文字隐藏*/
          overflow: hidden;
          /*溢出部分省略号处理*/
          text-overflow: ellipsis;
          padding: 5px 0;
        }
        .item-bottom {
          span {
            font-size: 12px;
            margin: 0 8px 0 5px;
          }
        }
      }
      &:hover {
        cursor: pointer;
        transform: translateY(-5px);
        transition: transform 0.3s ;
      }
    }
  }
  
</style>