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
        <el-button class="btn" circle size="small" @click="openDialog">
          <svg-icon name="star" class="icon" :color="state.isFavorited?'#ed5b8c':''"></svg-icon>
        </el-button>
        <span class="number">{{formatNumber(favorite || 0 + state.favouritNum)}}</span>
      </div>
    </div>
    <el-button class="download-btn" disabled>
      <svg-icon name="download" />下载
    </el-button>
  </div>
  <el-dialog 
    v-model="visible" 
    title="添加到收藏夹" 
    width="340px" 
    destroy-on-close
    close-on-click-modal="false"
    @close="clearDialog"
    center>
    <el-checkbox-group class="checkbox-group" v-model="checkList">
      <el-checkbox 
        v-for="(item, index) in favoriteList" 
        :label="item.id"
        @change="changeCheckNum(item)"
        :checked="!!item.fav_state">
        {{item.title}}
        <div class="percent">{{item.media_count + (index?'/1000':'')}}</div>
      </el-checkbox>
    </el-checkbox-group> 
    <template #footer>
      <span class="dialog-footer">
        <el-button 
          type="primary" 
          :disabled="!editFavorite.addList.length && !editFavorite.delList.length" 
          @click="favoriteThis"
          >确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import store from '@/utils/store';
import { reactive, watch ,inject, ref} from 'vue';
import { ElMessage } from "element-plus";
import { formatNumber } from '@/utils/tools';
import { coinVideoApi, favoriteVideoApi, likeVideoApi } from '@/request/api/video/action';
import { getVideoCoinStateApi, getVideoFavouriteStateApi, getVideoLikeStateApi } from '@/request/api/video/info';
import { getFavoriteApi } from '@/request/api/user/favorite';
import { FavoriteItem } from '@/request/model/user/favorite';

const visible = ref(false)
const checkList = ref([])
const editFavorite = reactive({
  addList: <number[]>[],
  delList: <number[]>[]
})
const favoriteList = ref(<FavoriteItem[]>[])
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
  getVideoCoinStateApi(params).then( ({data:{multiply}}) => {
    state.isCoined = !!multiply
  })
  getVideoFavouriteStateApi(params).then( ({data:{favoured}}) => {
    state.isFavorited = favoured
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
// 获取收藏夹列表
const getFavoriteList = async () => {
  const {data:{list}} = await getFavoriteApi({up_mid: store.user.mid, rid: props.aid, type: 2})
  favoriteList.value = list
}
// 打开弹框
const openDialog = async () => {
  getFavoriteList()
  visible.value = true

}
const changeCheckNum = (item:FavoriteItem) => {
  item.fav_state = !item.fav_state as unknown as number
  if(item.fav_state) {
    // 如果变为选中状态
    item.media_count++
    if (editFavorite.delList.includes(item.id)) {
      editFavorite.delList = editFavorite.delList.filter( i => i !=item.id)
    } else {
      editFavorite.addList.push(item.id)
    }
  } else {
    item.media_count--
    if (editFavorite.addList.includes(item.id)) {
      editFavorite.addList = editFavorite.addList.filter( i => i !=item.id)
    } else {
      editFavorite.delList.push(item.id)
    }
  }
}
// 收藏
const favoriteThis = () => {
  if (!editFavorite.addList.length && !editFavorite.delList.length) {
    visible.value = false
    return
  }
  const params = {
    rid: props.aid, 
    type: 2, 
    add_media_ids: editFavorite.addList.toString(),
    del_media_ids: editFavorite.delList.toString()
  }
  favoriteVideoApi(params).then( () => {
    state.isFavorited = !state.isFavorited
    state.isFavorited?state.favouritNum++:state.favouritNum--
    visible.value = false
    ElMessage.success("收藏成功")
  })
}
const clearDialog = () => {
  checkList.value = []
  favoriteList.value = []
  editFavorite.addList = []
  editFavorite.delList = []
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
.checkbox-group {
  display: flex;
  flex-direction: column;
  .percent {
    position: absolute;
    right: 0px;
    top: 13px;
  }
  .el-checkbox:last-of-type {
    margin-right: 30px;
  }
}
</style>