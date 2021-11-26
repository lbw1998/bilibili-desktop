<template>
  <el-card shadow="hover" :body-style="{ padding: '5px' }">
    <div class="card-wrap">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image"
      />
      <div class="info">
        <div class="title">
          《激战江南》穿山甲名场面
        </div>
        <div class="count-up">
          谈崩专家康纳纳
        </div>
        <div class="count">
          <svg-icon name="view" />
          <span class="view">1</span>
          <svg-icon name="barrage" />
          <span class="view">2</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
  .el-card {
    width: 320px;
    box-sizing: border-box;
    .card-wrap {
      display: flex;
      .image {
        width: 140px;
        height: 80px;
      }
      .info {
        margin-left: 10px;
        flex: 1;
        .title {
          font-size: 14px;
          font-weight: 500;
          height: 36px;
          line-height: 18px;
          margin-bottom: 6px;
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .count-up {
          width: 160px;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #999;
        }
        .count {
          display: inline-block;
          height: 16px;
          width: 100%;
          color: #999;
          .view {
            font-size: 12px;
            width: 50px;
            display: inline-block;
            margin-right: 8px;
          }
        }
      }
    }
  }
</style>