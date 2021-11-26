<template>
  <el-drawer
    :modelValue="props.visible"
     @update:modelValue="emit('changeVisible', $event)"
    :show-close="false"
    :with-header="false"
    :size="280"
    direction="rtl"
    modal-class="modal-wrap"
  >
    <div class="drawer-wrap">
      <div class="bili-avatar">
        <el-avatar :size="68" :src="userInfo.face"></el-avatar>
        <img v-if="userInfo.vipStatus != 0" class="bili-avatar-icon" :src="userInfo.vip.avatar_subscript_url">
      </div>
      <template v-if="userInfo.vipStatus != 0">
        <p class="nickname"  :style="{color: userInfo.vip_nickname_color}">
          {{userInfo.uname}}
        </p>
        <div class="vip">
          {{userInfo.vip.label.text}}
        </div>
      </template>
      <div class="level-content">
        <div class="level-info">
          <div class="grade">
            等级 {{userInfo.level_info.current_level}}
          </div>
          <div class="progress">
            {{userInfo.level_info.current_exp}} / {{userInfo.level_info.next_exp}}
          </div>
        </div>
        <el-progress color="#f3cb85" :show-text="false" :percentage="Number(userInfo.level_info.current_exp/userInfo.level_info.next_exp)*100" />
      </div>
      <div class="coins">
        <div class="coins-container">
          <div class="info">
            <svg-icon class="icon" name="money" color="#38B5DE" />
            <span class="money">{{userInfo.money}}.0</span>
            <svg-icon class="icon" name="coin" />
            <span class="money">{{userInfo.wallet.bcoin_balance}}</span>
          </div>
        </div>
      </div>
      <div class="counts">
        <div class="count-item">
          <div class="item-key">关注</div>
          <div class="item-value">{{userState.following}}</div>
        </div>
        <div class="count-item">
          <div class="item-key">粉丝</div>
          <div class="item-value">{{userState.follower}}</div>
        </div>
        <div class="count-item">
          <div class="item-key">动态</div>
          <div class="item-value">{{userState.dynamic_count}}</div>
        </div>
      </div>
      <el-menu
        default-active="2"
      >
        <el-menu-item index="1">
          <el-icon><location /></el-icon>
          <span>个人主页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <span>消息</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <span>我的收藏</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>稍后再看</span>
        </el-menu-item>
        <el-menu-item index="5">
          <el-icon><setting /></el-icon>
          <span>历史记录</span>
        </el-menu-item>
      </el-menu>
      <el-button class="logout" round size="small" type="danger" @click="emit('logout')">注销</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons'
import { UserInfo, UserState  } from '@/api/system/user';

const props = defineProps<{
  visible: boolean,
  userInfo: UserInfo,
  userState: UserState
}>()
const emit = defineEmits<{
  (event: 'changeVisible', visible:boolean): void,
  (event: 'logout'): void,
}>()

</script>

<style lang="scss" scoped >
.drawer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  .bili-avatar {
    display: block;
    width: 68px;
    height: 68px;
    position: relative;
    .bili-avatar-icon {
      width: 33.33333%;
      height: 33.33333%;
      position: absolute;
      right: 0;
      bottom: 0;
      background-size: cover;
      image-rendering: -webkit-optimize-contrast;
    }
  }
  .nickname {
    color: #212121;
    font-weight: 600;
    font-size: 16px;
    padding-top: 8px;
  }
  .vip {
    margin-top: 4px;
    width: 66px;
    text-align: center;
    background-color: #fb7299;
    color: #fff;
    font-size: 12px;
    border-radius: 2px;
  }
  .level-content {
    width: 100%;
    .level-info {
      margin: 20px 0 5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .grade {
        font-size: 14px;
        color: #212121;
      }
      .progress {
        font-size: 12px;
        color: #999;
      }
    }
  }
  .coins {
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    padding: 14px 20px;
    color: #212121;
    .coins-container {
      display: flex;
      justify-content: space-between;
      .info {
        display: flex;
        align-items: center;
        .icon {
          width: 20px;
          height: 20px;
        }
        .money {
          margin: 0 20px 0 8px;
        }
      }
    }
  }
  .counts {
    height: 58px;
    width: 100%;
    border-bottom: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 20px;
    .count-item {
      text-align: center;
      flex: 1;
      .item-key {
        font-size: 12px;
        color: #999;
      }
      .item-value {
        font-size: 16px;
        color: #212121;
        height: 20px;
        font-weight: 600;
      }
    }
  }
  .el-menu ::v-deep {
    padding: 0 40px;
    border: none;
    li {
      padding: 0 180px;
      padding-left: 80px!important;
    }
  }
  .logout {
    position: absolute;
    bottom: 0;
    width: 180px;
  }
}
</style>