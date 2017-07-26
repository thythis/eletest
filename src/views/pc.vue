<template lang="html">
  <div class="main-field">
    <main-header :yhsjh="yhsjh"></main-header>
    <div class="pc-wrapper">
      <div class="step-bar">
        <el-steps :space="200" :active="active">
          <el-step title="步骤 1"  description="在左边“导航栏”中进入“宝贝管理”，输入幼儿资料并保存（宝宝真实姓名）"></el-step>
          <el-step title="步骤 2"  description="在左边“导航栏”中进入“兑换码”，输入儿童心理筛查兑换卡背面的兑换码"></el-step>
          <el-step title="步骤 3"  description="在左边“导航栏”中进入“健康评估表”填写有“可评测”标识的心理调查问卷，填写完毕后，请提交"></el-step>
        </el-steps>
        <el-button type="primary" v-if="stepbtn" @click="next" v-text="steptxt"></el-button>
      </div>
      <div class="pc-content">
        <el-row>
          <el-col :span="3">
            <el-menu default-active="1" class="el-menu-vertical-demo">
              <div class="baby">
                <div class="photo" @click="changebb">
                </div>
                <span class="account">{{yhsjh}}</span>

                <span class="bbname" v-if="bbList.length>0">{{bbList[bbindex].mc}}<i class="el-icon-caret-bottom el-icon--right"></i></span>

              </div>
              <el-tooltip :value="fstep" :manual="true" content="添加或编辑宝宝资料" placement="left">
                <el-menu-item index="1" @click="gobaby(1)"><i class="el-icon-message"></i>宝贝管理</el-menu-item>
              </el-tooltip>
              <el-tooltip :value="sstep" :manual="true" content="兑换健康评估表" placement="left">
                <el-menu-item index="2" @click="gobaby(2)"><i class="el-icon-menu"></i>兑换码</el-menu-item>
              </el-tooltip>
              <el-tooltip :value="tstep" :manual="true" content="填写健康评估表" placement="left">
                <el-menu-item index="3" @click="gobaby(3)">
                    <i class="el-icon-search"></i>
                    健康评估表
                </el-menu-item>
              </el-tooltip>
              <el-menu-item index="4" @click="gobaby(4)"><i class="el-icon-time"></i>评估历史</el-menu-item>
              <el-menu-item index="5" @click="gobaby(5)"><i class="el-icon-setting"></i>修改密码</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="21" class="nr-panel">
            <div class="nr-header">
              <div class="nr-header-content">
                <div>
                  <strong>宝宝列表：</strong>
                  <el-select v-model="bbindex" filterable placeholder="请选择">
                    <el-option
                      v-for="(item, index) in bbList"
                      :key="item.mc"
                      :label="item.mc"
                      :value="index">
                    </el-option>
                  </el-select>
                </div>
                <div>
                  <el-tag class="switch-info" type="primary">显示所有评估表</el-tag>
                  <el-switch
                    v-model="pgblx"
                    on-value="0"
                    off-value="1">
                  </el-switch>
                </div>
              </div>
            </div>
            <div class="nr-content">
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
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

  },
  computed: {
    requestTc() {
      return this.$store.state.count
    },
    watchbb() {
      return this.bbindex
    },
    watchpgblx() {
      return this.pgblx
    }
  },
  watch: {
    requestTc(val) {
      this.bbindex = this.$store.state.count;
      this.bbList = myfun.fetch().bbList;
    },
    watchbb(val) {
      this.$store.commit('setCount', val);
    },
    watchpgblx(val) {
      console.log(this.$store.state.pgblx);
      this.$store.commit('setPgblx', val);
    }
  },
  data() {
    return {
      bbindex: this.$store.state.count,
      pgblx: this.$store.state.pgblx,
      bbList: myfun.fetch().bbList,
      yhsjh:   myfun.fetch().yhsjh,
      active: 0,
      fstep: false,
      sstep: false,
      stepbtn: true,
      tstep: false,
      steptxt: '下一步',
    }
  },
  methods: {
    changebb() {
      if(this.$store.state.count == (this.bbList.length-1)) {
        this.$store.commit('setCount', 0);
      } else {
        this.$store.commit('increment')
      }
      this.bbList = myfun.fetch().bbList;
      this.bbindex = this.$store.state.count;
    },
    next() {
      if (++this.active > 3) this.stepbtn = false;
      if(this.active == 1) {
        this.tstep = false;
        this.fstep = true;
      } else if(this.active == 2) {
        this.fstep = false;
        this.sstep = true;
      } else if(this.active == 3) {
        this.steptxt = "完成";
        this.sstep = false;
        this.tstep = true;
      } else {
        this.tstep = false;
        this.steptxt = "下一步";
      }
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
      } else if(index == 5) {
        this.$router.push('/changepwd')
      }
    }
  }
}
</script>

<style lang="scss">
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .carousel-wrapper,.nav-bar-wrapper,.search-bar-wrapper {
    display: none;
  }
  .main-field {
    height: 100%;
  }
  .mask {
		position: absolute;
		width: 100%;
		height: 100%;
		background: #000;
		display: block;
		z-index: 9999;
	}
  .el-menu {
    background: none;
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
    .badge-item {
    }
  }
  .el-submenu .el-menu-item:hover, .el-submenu__title:hover,
  .el-menu-item:hover {
    background-color: #f3f3f3;
  }
  .pc-wrapper {
    overflow: hidden;
    .step-bar {
      display: none;
      justify-content: center;
      margin-bottom: 20px;
      margin-top: 20px;
      .el-button {
        height: 40px;
        margin-top: 10px;
        margin-left: 20px;
      }
    }
    .pc-content {
      // min-height: 820px;
      margin: 0 auto;
      // overflow: hidden;
      .el-row {
        // height: 100%;
        .el-col {
          height: 100%;
          &.nr-panel {
            overflow-y: auto;
            .nr-header {
              height: 50px;
              line-height: 50px;
              padding: 0 20px;
              border-bottom: 1px solid #ccc;
              .nr-header-content {
                width: 80%;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                strong {
                  color: #656564;
                }
              }
            }
            .nr-content {
              max-height: 800px;
              overflow-y: auto;
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

        }
      }
    }
  }
</style>
