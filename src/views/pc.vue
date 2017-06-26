<template lang="html">
  <div>
    <main-header></main-header>
    <div class="pc-wrapper">
      <div class="step-bar">
        <el-steps :space="200" :active="1">
          <el-step title="步骤 1" description="在左边“导航栏”中进入“宝贝管理”，输入幼儿资料并保存（宝宝真实姓名）"></el-step>
          <el-step title="步骤 2" description="在左边“导航栏”中进入“兑换码”，输入儿童心理筛查兑换卡背面的兑换码"></el-step>
          <el-step title="步骤 3" description="在左边“导航栏”中进入“健康评估表”填写有“可评测”标识的心理调查问卷，填写完毕后，请提交"></el-step>
        </el-steps>
      </div>
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
              <el-menu-item index="1" @click="gobaby(1)"><i class="el-icon-message"></i>宝贝管理</el-menu-item>
              <el-menu-item index="2" @click="gobaby(2)"><i class="el-icon-menu"></i>兑换码</el-menu-item>
              <el-menu-item index="3" @click="gobaby(3)"><i class="el-icon-search"></i>健康评估表</el-menu-item>
              <el-menu-item index="4" @click="gobaby(4)"><i class="el-icon-time"></i>评估历史</el-menu-item>
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
  computed: {
    requestTc() {
      return this.$store.state.count
    }
  },
  watch: {
    requestTc(val) {
      this.bbindex = this.$store.state.count;
    }
  },
  data() {
    return {
      bbindex: this.$store.state.count,
      bbList: myfun.fetch().bbList,
    }
  },
  methods: {
    changebb() {
      if(this.$store.state.count == (this.bbList.length-1)) {
        this.$store.commit('setCount', 0);
      } else {
        this.$store.commit('increment')
      }
      this.bbindex = this.$store.state.count;
    },
    gobaby(index) {
      if(index == 1) {
        this.$router.push('/bbmana')
      } else if(index == 2) {
        this.$router.push('/rcode')
      } else if(index == 3) {
        this.$router.push('/fittest')
      } else if(index == 4) {
        this.$router.push('/history')
      }
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
    .step-bar {
      display: flex;
      justify-content: center;
    }
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
