<template lang="html">
  <div>
    <main-header></main-header>
    <div class="pc-wrapper">
      <div class="pc-content">
        <el-row>
          <el-col :span="5">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <div class="baby">
                <div class="photo" @click="changebb">
                </div>
                <span class="account">17607675503</span>
                <span class="bbname">{{bbList[bbindex].mc}}</span>
              </div>
              <el-menu-item index="1"><i class="el-icon-message"></i><router-link to="bbmana">宝贝管理</router-link></el-menu-item>
              <el-menu-item index="2"><i class="el-icon-menu"></i><router-link to="rcode">兑换码</router-link></el-menu-item>
              <el-menu-item index="3"><i class="el-icon-search"></i><router-link to="fittest">健康评估表</router-link></el-menu-item>
              <el-menu-item index="4"><i class="el-icon-time"></i><router-link to="history">评估历史</router-link></el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="19" class="nr-panel">
            <router-view></router-view>
          </el-col>
        </el-row>
      </div>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
import MainHeader from '../components/MainHeader.vue';
import MainFooter from '../components/MainFooter.vue';
export default {
  components: {
    MainFooter,
    MainHeader
  },
  mounted() {
    console.log(this.bbindex);
  },
  data() {
    return {
      bbindex: this.BB_INDEX,
      bbList: myfun.fetch().bbList,
    }
  },
  methods: {
    changebb() {
      this.BB_INDEX++;
      this.bbindex = this.BB_INDEX;
      console.log(this.BB_INDEX);
    }
  }
}
</script>

<style lang="scss">
  .carousel-wrapper,.nav-bar-wrapper {
    display: none;
  }
  .pc-wrapper {
    overflow: hidden;
    padding-top: 50px;
    .pc-content {
      width: 75%;
      height: 820px;
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
            .el-col {
              background: #f7f7f7;
            }
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
              cursor: pointer;
            }
            span {
              display: inline-block;
              position: absolute;
              color: #fff;
              margin-left: 10px;
              &.account {
                top: 20px;
              }
              &.bbname {
                top: 50px;
              }
            }
          }
          .el-menu-item {
            a {
              text-decoration: none;
              color: #48576a;
            }
            &.is-active {
              color: #4fc1e9;
              a {
                color: #4fc1e9;
              }
            }
          }
          .el-submenu .el-menu-item:hover, .el-submenu__title:hover,
          .el-menu-item:hover {
            background-color: #4fc1e9;
            color: #fff;
            a {
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
