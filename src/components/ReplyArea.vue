<template>
  <div class="reply-wrap">
    <div class="r-title" v-if="replyInfo.replyList.length">
      <h1>最{{mode == 1?'热':'新'}}评论</h1>
      <el-radio-group v-model="mode" size='mini' @change="changeMode" >
        <el-radio-button :label="0" >最热</el-radio-button>
        <el-radio-button :label="2" >最新</el-radio-button>
      </el-radio-group>
    </div>
    <div class="r-content">
      <div class="second-wrap"  v-if="isSecondReply">
        <div class="top-reply">
          <el-button type="text" class="back" @click="backRelpy">返回上一级</el-button>
          <reply-card
            class="reply-card"
            @click="chooseReplyItem(topReplyItem)"
            @likeThis="likeThis(topReplyItem)"
            :isTop="topReplyItem.isTop"
            :uname="topReplyItem.member?.uname"
            :face="topReplyItem.member?.avatar"
            :level="topReplyItem.member?.level_info.current_level"
            :time="topReplyItem.ctime"
            :content="topReplyItem.content?.message"
            :like="topReplyItem.like"
            :rpid="topReplyItem.rpid"
            :count="topReplyItem.rcount"
            :action="topReplyItem.action"
          />
        </div>
        <div class="scroll-wrap">
          <el-scrollbar>
            <div class="reply-warp" 
              infinite-scroll-distance="800" 
              infinite-scroll-delay="1000" 
              v-infinite-scroll="loadMore" 
              :infinite-scroll-immediate="false"
              :infinite-scroll-disabled="noMoreSecondReply">
              <reply-card
                v-for="item in replyInfo.replyList2"
                class="reply-card"
                @click="chooseReplyItem(item)"
                @likeThis="likeThis(item)"
                :isTop="item.isTop"
                :uname="item.member?.uname"
                :face="item.member?.avatar"
                :level="item.member?.level_info.current_level"
                :time="item.ctime"
                :content="item.content?.message"
                :like="item.like"
                :rpid="item.rpid"
                :count="item.rcount"
                :action="item.action"
              />
            </div>
          </el-scrollbar>
        </div>
      </div>
      <el-scrollbar v-show="!isSecondReply && replyInfo.replyList.length">
        <div class="reply-warp" 
          infinite-scroll-distance="800" 
          infinite-scroll-delay="1000" 
          v-infinite-scroll="getReplyInfo" 
          :infinite-scroll-immediate="false"
          :infinite-scroll-disabled="noMoreReply">
          <reply-card
            v-for="item in replyInfo.replyList"
            class="reply-card"
            @click="chooseReplyItem(item)"
            @showReplies="showReplies(item)"
            @likeThis="likeThis(item)"
            :isTop="item.isTop"
            :uname="item.member?.uname"
            :face="item.member?.avatar"
            :level="item.member?.level_info.current_level"
            :time="item.ctime"
            :content="item.content?.message"
            :like="item.like"
            :count="item.rcount"
            :action="item.action"
          />
        </div>
      </el-scrollbar>
      <Empty v-if="!replyInfo.replyList.length" tip="暂无评论  T_T" />
    </div>
    <div class="r-footer">
      <el-input
        :rows="2"
        type="textarea"
        v-model="messageInfo"
        :placeholder="replyItem.member?`回复 @${replyItem.member.uname}`:'留下你的评论吧~'"
      />
      <el-button @click="replyThis" :disabled="!messageInfo">发布</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Empty from './Empty.vue';
import ReplyCard from './ReplyCard.vue';
import { reactive, ref, watch } from 'vue';
import { ElNotification } from 'element-plus';
import { ReplyItem } from '@/request/model/reply/info';
import { likeReplyApi } from '@/request/api/reply/like';
import { addReplyApi, addReplyParams } from '@/request/api/reply/add';
import { getReplyInfoApi, getSecondReplyInfoApi } from '@/request/api/reply/info';

const props = defineProps<{
  type: number
  oid: number
}>()
// 一级评论页码
let next = 0
// 二级评论页码
let pn = 1;
// 排序方式
const mode = ref(0)
const noMoreReply = ref(false)
const noMoreSecondReply = ref(false)
// 是否显示二级评论
const isSecondReply = ref(false)
const replyInfo = reactive({
  replyList: <ReplyItem[]>[],
  // 二级回复列表
  replyList2: <ReplyItem[]>[],
})
// 回复评论对象
const replyItem = ref(<ReplyItem>{})
// 回复信息
const messageInfo = ref('')
// 展开二级评论对象
const topReplyItem = ref(<ReplyItem>{})

// 获取一级评论
const getReplyInfo = async (first = false) => {
  next = first?0:next
  const { data } = await getReplyInfoApi({type: props.type, oid: props.oid, mode: mode.value, next})
  if(!data.replies) return noMoreReply.value = true
  next = data.cursor.next
  data.top_replies?.map( i => i.isTop = true)
  replyInfo.replyList = [...data.top_replies || [], ...first?[]:replyInfo.replyList, ...data.replies || []]
}
// 更改排序方式
const changeMode = async () => {
  replyInfo.replyList = []
  next = 0
  getReplyInfo(true)
}
// 选择指定人员回复
const chooseReplyItem = (item:ReplyItem) => {
  replyItem.value = {...item}
}
// 展开二级评论列表
const showReplies = async (replyItem:ReplyItem) => {
  isSecondReply.value = true
  replyItem && (topReplyItem.value = replyItem)
  const {data} = await getSecondReplyInfoApi({type: props.type, oid: props.oid, root: replyItem.rpid})
  if(!data.replies) return noMoreSecondReply.value = true
  topReplyItem.value = data.root!
  replyInfo.replyList2 = data.replies
  pn++
} 
// 加载更多二级评论
const loadMore = async () => {
  const {data} = await getSecondReplyInfoApi({type: props.type, oid: props.oid, root: topReplyItem.value.rpid, pn})
  if(!data.replies) return noMoreSecondReply.value = true
  replyInfo.replyList2 = [...replyInfo.replyList2, ...(data.replies?data.replies:[])]
  pn++
} 
// 返回上一级评论
const backRelpy = () => {
  isSecondReply.value = false
  replyInfo.replyList2 = []
  replyItem.value = <ReplyItem>{}
}
// （取消）点赞
const likeThis = async (reply_item:ReplyItem) => {
  const { rpid, action } = reply_item
  const actionMap = {
    0: 1,
    1: 0
  }
  const {code, message} = await likeReplyApi({type: props.type, oid: props.oid,rpid,action: actionMap[action]})
  if(code == 0 ) {
    action?reply_item.like--:reply_item.like++
    reply_item.action = actionMap[action]
  } else {
    ElNotification({
      title: '失败',
      message: message,
      type: 'error'
    })
  }
}
// 发表评论
const replyThis = async () => {
  // 发表到根评论区
  let params = <addReplyParams>{
    type: props.type,
    oid: props.oid,
    message: messageInfo.value,
  }
  if (replyItem.value.rpid) {
    // 是否回复二级评论
    if(replyItem.value.root) {
      params = {...params, root: replyItem.value.root, parent: replyItem.value.rpid  }
    } else {
      // 是否回复一级评论
      params = {...params, root: replyItem.value.rpid, parent: replyItem.value.rpid  }
    }
  }
  // 大于二级评论
  const {code, message} = await addReplyApi(params)
  if (code == 0 ) {
    ElNotification({
      title: '成功',
      message: '评论成功',
      type: 'success'
    })
    messageInfo.value = ""
    setTimeout(() => {
      isSecondReply.value?showReplies(replyItem.value):getReplyInfo(true)
    }, 800);
  } else {
    ElNotification({
      title: '失败',
      message: message,
      type: 'error'
    })
  }
}
watch(props,() => {
  getReplyInfo(true)
})

getReplyInfo(true)

</script>

<style lang="scss" scoped>
.reply-wrap {
  width: 100%;
  height: 100%;
  .r-title {
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    align-items: center;
  }
  .r-content {
    width: 100%;
    margin-right: 16px;
    padding-top: 12px;
    height: calc(100vh - 220px);
    .second-wrap {
      width: 100%;
      .top-reply {
        width: 100%;
        padding-right: 20px;
        .back {
          padding: 0 0 4px 0;
          min-height: auto;
        }
      }
      .scroll-wrap {
        width: 100%;
        height: calc(100vh - 430px);
      }
    }
    .el-scrollbar {
      padding-right: 20px;
    }
  }
  .r-footer {
    margin-top: 8px;
    display: flex;
    padding-right: 20px;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>