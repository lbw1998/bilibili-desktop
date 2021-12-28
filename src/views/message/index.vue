<!-- 消息页面 -->
<template>
  <div class="header">
    <div class="title-bar">
      <b class="title">消息</b>
    </div>
  </div>
  <el-tabs class="tabs-wrap">
    <el-tab-pane label="回复我的">
      <div class="scrollbar-wrap" v-loading="loading">
        <el-scrollbar>
          <div class="reply-wrap" v-if="replyList.length">
            <message-card
              class="reply-card"
              v-for="item in replyList"
              :avatar="item.user.avatar"
              :nickname="item.user.nickname"
              :time="item.reply_time"
              :action="`回复了我的${item.item.business}`"
              :content="item.item.source_content"
              :target="item.item.title"
            />
          </div>
          <Empty v-else />
        </el-scrollbar>
      </div>
    </el-tab-pane>
    <el-tab-pane label="@我的">
      <div class="scrollbar-wrap">
        <el-scrollbar>
          <div class="reply-wrap" v-if="atList.length">
            <message-card
              class="reply-card"
              v-for="item in atList"
              :avatar="item.user.avatar"
              :nickname="item.user.nickname"
              :time="item.at_time"
              :action="`在${item.item.business}中@了我`"
              :content="item.item.source_content"
              :target="item.item.title"
            />
          </div>
          <Empty v-else />
        </el-scrollbar>
      </div>
    </el-tab-pane>
    <el-tab-pane label="收到的赞">
      <div class="scrollbar-wrap">
        <el-scrollbar>
          <div class="reply-wrap" v-if="likeList.length">
            <message-card
              class="reply-card"
              v-for="item in likeList"
              :avatar="item.users[0].avatar"
              :nickname="item.users[0].nickname"
              :time="item.like_time"
              :action="`在${item.item.business}中赞了我`"
              :content="item.item.title"
            />
          </div>
          <Empty v-else />
        </el-scrollbar>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Empty from '@/components/Empty.vue';
import MessageCard from './components/MessageCard.vue';
import { ReplyMeItem, LikeMeItem } from '@/request/model/reply/info';
import { getReplyMeApi, getAtMeApi, getLikeMeApi } from '@/request/api/user/info';

const replyList = ref(<ReplyMeItem[]>[])
const atList = ref(<ReplyMeItem[]>[])
const likeList = ref(<LikeMeItem[]>[])
const loading = ref(true)
const getReplyList = async () => {
  const { data } = await getReplyMeApi()
  replyList.value = data.items
  loading.value = false
}
const getAtList = async () => {
  const { data } = await getAtMeApi()
  atList.value = data.items
}
const getLikeMe = async () => {
  const { data } = await getLikeMeApi()
  likeList.value = data.total.items
}
getReplyList()
getAtList()
getLikeMe()
</script>

<style lang="scss" scoped>
.header {
  padding-right: 20px;
  .title-bar {
    padding: 8px;
    .title {
      font-size: 28px;
    }
  }
}
.tabs-wrap {
  width: 100%;
  height: calc(100vh - 200px);
  .scrollbar-wrap {
    width: 100%;
    height: calc(100vh - 179px);
    .reply-wrap {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .reply-card {
        width: 300px;
        margin-right: 30px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>