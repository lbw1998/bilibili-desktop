<template>
  <div class="state-wrap">
    <div class="video-status">
      <div class="status-item">
        <el-button circle size="small" @click="likeThis">
          <svg-icon name="like" class="icon" :color="state.isLiked?'#ed5b8c':''"></svg-icon>
        </el-button>
        <span class="number">{{formatNumber(like || 0 + state.likeNum)}}</span>
      </div>
      <div class="status-item">
        <el-button circle size="small" @click="coinThis">
          <svg-icon name="money" class="icon" :color="state.isCoined?'#ed5b8c':''"></svg-icon>
        </el-button>
        <span class="number">{{formatNumber(coin || 0 + state.coinNum)}}</span>
      </div>
      <div class="status-item">
        <el-button class="btn" circle size="small" @click="favoriteThis">
          <svg-icon name="star" class="icon" :color="state.isFavorited?'#ed5b8c':''"></svg-icon>
        </el-button>
        <span class="number">{{formatNumber(favorite || 0 + state.favouritNum)}}</span>
      </div>
    </div>
    <el-button class="download-btn" disabled>
      <svg-icon name="download" />下载
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import store from '@/utils/store';
import { reactive, watch ,inject} from 'vue';
import { ElMessage } from "element-plus";
import { formatNumber } from '@/utils/tools';
import { coinVideoApi, favoriteVideoApi, likeVideoApi } from '@/request/api/video/action';
import { getVideoCoinStateApi, getVideoFavouriteStateApi, getVideoLikeStateApi } from '@/request/api/video/info';

const props = defineProps<{
  like: number,
  coin: number,
  favorite: number
  aid: number
}>()
const state = reactive({
  isLiked: false,
  isCoined: false,
  isFavorited: false,
  likeNum: 0,
  coinNum: 0,
  favouritNum: 0
})
const verifyLogin = <Function>inject('verifyLogin')
// 视频是否被点赞/投币/收藏
const getVideoState = () => {  
  if (!store.user.isLogin || !props.aid) return
  const params = {
    aid: props.aid
  }
  getVideoLikeStateApi(params).then( ({data}) => {
    state.isLiked = !!data
  })
  getVideoCoinStateApi(params).then( ({data}) => {
    state.isCoined = !!data.multiply
  })
  getVideoFavouriteStateApi(params).then( ({data}) => {
    state.isFavorited = data.favoured
  })
}

// 点赞
const likeThis = verifyLogin(() => {
  likeVideoApi({aid: props.aid,like: state.isLiked?2:1 }).then( () => {
    state.isLiked = !state.isLiked
    state.isLiked?state.likeNum++:state.likeNum--
    state.isLiked?ElMessage.success("点赞成功"):ElMessage.info("取消点赞")
  })
})
// 投币
const coinThis = () => {
  coinVideoApi({aid: props.aid, multiply: 1}).then( () => {
    state.isCoined = !state.isCoined
    state.isCoined?state.coinNum++:state.coinNum--
    ElMessage.success("投币成功")
  })
}
// 收藏
const favoriteThis = () => {
  favoriteVideoApi({rid: props.aid, type: 2}).then( () => {
    state.isFavorited = !state.isFavorited
    state.isFavorited?state.favouritNum++:state.favouritNum--
    ElMessage.success("收藏成功")
  })
}

watch(props,() => {
  getVideoState()
})

getVideoState()

</script>

<style lang="scss" scoped>
.state-wrap {
  width: 100%;
  .video-status {
    width: 100%;
    justify-content: space-between;
    display: flex;
    .status-item {
      display: flex;
      flex-direction: column;
      margin-left: 5px;
      align-items: center;
      .btn {
        width: 48px;
      }
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
</style>