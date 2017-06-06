<template lang="html">
  <div>
    <div class="pc-wrapper">
      <div class="pc-content">
        <el-row>
          <el-col :span="5">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
              <div class="baby">
                <div class="photo">
                </div>
                <span class="account">17607675503</span>
              </div>
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>宝贝管理</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">添加宝贝</el-menu-item>
                  <el-menu-item index="1-2">修改宝贝信息</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2"><i class="el-icon-menu"></i><router-link to="contact/bbmana">兑换码</router-link></el-menu-item>
              <el-menu-item index="3"><i class="el-icon-setting"></i>评估历史</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="19" class="nr-panel">
            <router-view></router-view>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .pc-wrapper {
    overflow: hidden;
    padding-top: 50px;
    .pc-content {
      width: 60%;
      height: 600px;
      margin: 0 auto;
      overflow: hidden;
      .el-row {
        height: 100%;
        .el-col {
          height: 100%;
          background: #eef1f6;
          &.nr-panel {
            background: #f7f7f7;
            overflow-y: auto;
          }
          .baby {
            height: 90px;
            padding: 10px 0 0 10px;
            background: #4fc1e9;
            position: relative;
            .photo {
              display: inline-block;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              border: 1px solid #fff;
              background: url(../assets/img/logo.png) #c3e1ea no-repeat;
              background-size: cover;
            }
            .account {
              display: inline-block;
              position: absolute;
              color: #fff;
              top: 20px;
              margin-left: 10px;
            }
          }
          .el-menu-item.is-active {
            color: #4fc1e9;
          }
          .el-submenu .el-menu-item:hover, .el-submenu__title:hover,
          .el-menu-item:hover {
            background-color: #4fc1e9;
            color: #fff;
          }
        }
      }
    }
  }
</style>
