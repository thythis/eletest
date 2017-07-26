<template lang="html">
  <div  v-loading.body="reqloading">
    <div class="test-content">
        <!-- <div class="list-panel">
          <strong>宝宝列表：</strong>
          <a v-for="(item, index) in bbList"
          :class="[{hover: isBaby(index)}]"
          @click="changebb(index)">{{item.mc}}</a>
          <div class="exchange-part">
            <el-input placeholder="请输入兑换口令" v-model="xdbh"></el-input>
            <el-button :disabled="xdbh?false:true" type="primary" @click="testCmd">兑换</el-button>
          </div>
        </div> -->
        <el-tabs v-model="activeName" @tab-click="handleBaby">
          <el-tab-pane label="健康评估" name="first">
            <div v-if="!showsurvey">
              <div v-for="item in pgblist">
                <div class="box">
                  <div class="ribbon">
                  </div>
                  <span>{{item.xsbt}}</span>
                </div>
                <el-table
                  :data="item.zdlist"
                  :default-sort = "{prop: 'synld', order: 'descending'}"
                  v-loading.body="loading"
                  border
                  stripe
                  style="width: 100%">
                      <el-table-column
                      prop="mc"
                      label="筛查表">
                        <template scope="scope">
                          <el-tag
                          type="primary"
                          close-transition>{{scope.row.mc}}</el-tag>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="synld"
                        sortable
                        :formatter="ageFormat"
                        label="年龄段">
                      </el-table-column>
                      <el-table-column
                      prop="zt"
                      label="状态">
                      <template scope="scope">
                        <el-tag
                        :type="scope.row.zt == 1 ? 'gray' : (scope.row.zt == 2?'primary':'success')"
                        close-transition>{{scope.row.zt == 1 ? '已做' : (scope.row.zt == 2?'可评测':'报告已出')}}</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template scope="scope">
                      <el-button size="small" icon="search" type="danger" @click.stop="(scope.row.qzpgbbh!='lh_jbxx')?checkSurvey(scope.row):specSurvey(scope.row, item.zdlist)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <transition name="el-fade-in">
              <div v-if="showsurvey">
                <el-button type="primary" icon="arrow-left" @click="goBack">返回</el-button>
                <survey :bbinfo="bbinfo"></survey>
              </div>
            </transition>
          </el-tab-pane>
          <el-tab-pane label="健康监控" name="second">
            <div v-if="!showsurvey2">
              <div v-for="item in pgblist">
                <el-table
                  :data="item.zdlist"
                  v-loading.body="loading"
                  border
                  stripe
                  style="width: 100%">
                  <el-table-column
                  prop="mc"
                  label="筛查表">
                    <template scope="scope">
                      <el-tag
                        type="primary"
                        close-transition>{{scope.row.mc}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                  prop="synld"
                  :formatter="ageFormat"
                  label="年龄段">
                  </el-table-column>
                  <el-table-column
                    prop="zt"
                    label="状态">
                    <template scope="scope">
                      <el-tag
                        :type="scope.row.zt == 1 ? 'primary' : (scope.row.zt == 2?'gray':'success')"
                        close-transition>{{scope.row.zt == 1 ? '已做' : (scope.row.zt == 2?'可评测':'报告已出')}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template scope="scope">
                      <el-button size="small" icon="search" type="danger" @click.stop="checkSurvey(scope.row)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <transition name="el-fade-in">
              <div v-if="showsurvey2">
                <el-button type="primary" icon="arrow-left" @click="showsurvey2= false">返回</el-button>
                <survey :bbinfo="bbinfo"></survey>
              </div>
            </transition>
          </el-tab-pane>
        </el-tabs>
    </div>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
import {getTC, pgbxddh} from '@/config/env'
import Survey from '../components/Survey.vue';
export default {
  components: {
    Survey
  },
  mounted() {
    var objjjj = JSON.stringify({
      yhid: myfun.fetch().yhid,
      bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
      pgblx: this.$store.state.pgblx,
      flbh: "jkpg"
    });
    this.reqloading = true;
    this.$http.post(this.getTC, objjjj).then(function(response){
      this.reqloading = false;
      this.pgblist = response.body.results;
      console.log(this.pgblist);
    }, function(response) {
      this.loading = false;
      console.log('fail');
    })

    // this.$store.commit('bblist',this.pgblist)
  },
  computed: {
    requestTc() {
      return this.$store.state.count
    },
    switchLx() {
      return this.$store.state.pgblx;
    }
  },
  watch: {
    requestTc(val) {
      this.showsurvey = false;
      this.showsurvey2 = false;
      this.loading = true;
      var flbh = "";
      if(this.activeName == "first") {
        flbh = "jkpg";
      } else {
        flbh = "jkjk";
      }
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
        pgblx: this.pgblx,
        flbh: flbh
      });
      this.$http.post(this.getTC, objjjj).then(function(response){
        this.loading = false;
        this.pgblist = response.body.results;
        // console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    },
    switchLx(val) {
      var flbh = "";
      if(this.activeName == "first") {
        flbh = "jkpg";
      } else {
        flbh = "jkjk";
      }
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
        pgblx: val,
        flbh: flbh
      });
      this.$http.post(this.getTC, objjjj).then(function(response){
        this.loading = false;
        this.pgblist = response.body.results;
        // console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    }
  },
  data() {
    return {
      getTC,
      pgbxddh,
      bbindex: 5,
      xdbh: '',
      pgblx: 1,
      yhid: myfun.fetch().yhid,
      bbindex: myfun.fetch().currenbaby,
      bbname: myfun.fetch().bbList[this.$store.state.count].mc,
      bbList: myfun.fetch().bbList,
      bbinfo: {
        pgbbh: "",
        bbpgbid: 0,
        kh: "",
      },
      loading: false,
      reqloading: false,
      showsurvey: false,
      showsurvey2: false,
      activeName: 'first',
      activeBaby: myfun.fetch().bbList[0].mc,
      pgblist: [],
    };
  },
  methods: {
    changebb(index) {
      this.$store.commit('setCount', index);
    },
    testCmd() {
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
        token: myfun.fetch().token,
        xdbh: this.xdbh
      });
      this.$http.post(this.pgbxddh, objjjj).then(function(response){
        console.log(response);
        if(response.body.code == "1") {
          this.$message({
            type: 'success',
            duration: 2000,
            message: '兑换成功!'
          });
          this.$router.go(0);
        } else {
          this.$message({
            type: 'warning',
            duration: 2000,
            message: response.body.message
          });
        }
      }, function(response) {
        console.log('fail');
      })
    },
    handleBaby(tab, event) {
      this.loading = true;
      if(tab.index == "0") {
        this.showsurvey2 = false;
        var objjjj = JSON.stringify({
          yhid: myfun.fetch().yhid,
          bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
          pgblx: this.$store.state.pgblx,
          flbh: "jkpg"
        });
      } else if(tab.index == "1") {
        this.showsurvey = false;
        var objjjj = JSON.stringify({
          yhid: myfun.fetch().yhid,
          bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
          pgblx: this.$store.state.pgblx,
          flbh: "jkjk"
        });
      }
      this.$http.post(this.getTC, objjjj).then(function(response){
        this.loading = false;
        this.pgblist = response.body.results;
        console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    },
    ageFormat(row, col) {
      var agerange = row.synld;
      if (agerange == undefined) {
         return "";
      }
      var arr = agerange.split('-');
      arr[0] = parseInt(arr[0]);
      arr[1] = parseInt(arr[1]);
      if(arr[0] >= 12) {
        var mon = arr[0] % 12;
        arr[0] = Math.floor(arr[0]/12);
        mon>0?arr[0]=arr[0]+"岁"+mon+"月":arr[0]=arr[0]+"岁";
      } else {
        arr[0] += "月";
      }

      if(arr[1] >= 12) {
        var mon = arr[1] % 12;
        arr[1] = Math.floor(arr[1]/12);
        mon>0?arr[1]=arr[1]+"岁"+mon+"月":arr[1]=arr[1]+"岁";
      } else {
        arr[1] += "月";
      }
      var str = arr[0] + "-" + arr[1];
      return str;
    },
    isBaby(index) {
      if(this.$store.state.count == index) {
        return true;
      }
      return false;
    },
    goBack() {
      this.showsurvey= false;
    },
    checkSurvey(pgbinfo) {
      this.bbinfo = pgbinfo;
      console.log(pgbinfo);
      if(this.activeName == "first") {
        this.showsurvey = !this.showsurvey;
      } else {
        this.showsurvey2 = !this.showsurvey2;
      }
    },
    specSurvey(pgbinfo, list) {
      for (var i = 0; i < list.length; i++) {
        if((list[i].pgbbh == "lh_jbxx") && (list[i].zt != 1)) {
          this.$confirm('请先填写基本信息表', '提示', {
            confirmButtonText: '确定',
            showCancelButton: false,
            type: 'warning'
          })
        } else {
          this.bbinfo = pgbinfo;
          if(this.activeName == "first") {
            this.showsurvey = !this.showsurvey;
          } else {
            this.showsurvey2 = !this.showsurvey2;
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__item {
    font-size: 16px;
  }

  .exchange-part {
    width: 80%;
    margin-top: 10px;
    .el-input {
      width: 50%;
    }
    .el-button {
      margin-left: 10px;
    }
  }

  .box {
    display: inline-block;
    padding-right: 30px;
    height: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    background: #f1f1f1;
    box-shadow: 0 0 15px rgba(0,0,0,.1);
    span {
      margin-left: 20px;
      font-size: 16px;
      color: #4fc1e9;
    }
    .ribbon {
      width: 10px;
      height: 20px;
      float: left;
      position: relative;
      margin-bottom: 12px;
      color: #48576a;
      background: #4fc1e9;
      top: -3px;
      left: 10px;
      &:before {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        border-bottom: 3px solid #4fc1c9;
        border-right: 3px solid transparent;
        right: -3px;
      }
      &:after {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        border-left: 5px solid #4fc1e9;
        border-right: 5px solid #4fc1e9;
        border-bottom: 5px solid transparent;
        bottom: -5px;
      }
    }
  }

  .test-content {
    width: 80%;
    margin: 10px auto 20px auto;
    .switch-list {
      display: flex;
      justify-content: flex-end;
      .switch-info {
        margin-right: 10px;
      }
    }
    .list-panel {
      padding: 20px 0;
      border-bottom: 1px dashed #d1dee5;
      strong {
        color: #656564;
      }
      a {
        margin-right: 10px;
        display: inline-block;
        height: 26px;
        line-height: 26px;
        padding: 0 10px;
        &:hover {
          color: #4fc1e9;
        }
        &.hover {
          background: #4fc1e9;
          color: #fff;
          border-radius: 3px;
        }
      }
    }
  }
</style>
