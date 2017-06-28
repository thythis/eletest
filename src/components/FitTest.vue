<template lang="html">
  <div  v-loading.body="reqloading">
    <div class="test-content">
      <el-tabs v-model="bbname" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="item in bbList" :label="item.mc" :name="item.mc">
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
                        <el-button size="small" icon="search" type="danger" @click.native.prevent="checkSurvey(scope.row.pgbbh, scope.row.bbpgbid, scope.row.zt)">查看详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <transition name="el-fade-in">
                <div v-if="showsurvey">
                  <el-button type="primary" icon="arrow-left" @click="checkSurvey">返回</el-button>
                  <survey :bbinfo="bbinfo"></survey>
                </div>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="健康监控" name="second">
              <div v-if="!showsurvey">
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
                        <el-button size="small" icon="search" type="danger" @click.native.prevent="checkSurvey(scope.row.pgbbh, scope.row.bbpgbid, scope.row.zt)">查看详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <transition name="el-fade-in">
                <div v-if="showsurvey">
                  <el-button type="primary" icon="arrow-left" @click="checkSurvey">返回</el-button>
                  <survey :bbinfo="bbinfo"></survey>
                </div>
              </transition>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
import {getTC} from '@/config/env'
import Survey from '../components/Survey.vue';
export default {
  components: {
    Survey
  },
  mounted() {
    var objjjj = JSON.stringify({
      yhid: myfun.fetch().yhid,
      bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
      flbh: "jkpg"
    });
    this.reqloading = true;
    this.$http.post(this.getTC, objjjj).then(function(response){
      this.reqloading = false;
      this.pgblist = response.body.results;
      console.log(response);
    }, function(response) {
      this.loading = false;
      console.log('fail');
    })

    this.$store.commit('bblist',this.pgblist)
  },
  computed: {
    requestTc() {
      return this.$store.state.count
    }
  },
  watch: {
    requestTc(val) {
      this.bbname = myfun.fetch().bbList[this.$store.state.count].mc;
      this.loading = true;
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
        flbh: "jkpg"
      });
      this.$http.post(this.getTC, objjjj).then(function(response){
        this.loading = false;
        this.pgblist = response.body.results;
        console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    }
  },
  data() {
    return {
      getTC,
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
      activeName: 'first',
      activeBaby: myfun.fetch().bbList[0].mc,
      pgblist: [],
    };
  },
  methods: {
    handleClick(tab, event) {
      var num = parseInt(tab.index);
      console.log(num);
      this.$store.commit('setCount',num);
    },
    handleBaby(tab, event) {
      this.loading = true;
      if(tab.index == "0") {
        var objjjj = JSON.stringify({
          yhid: myfun.fetch().yhid,
          bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
          flbh: "jkpg"
        });
      } else if(tab.index == "1") {
        var objjjj = JSON.stringify({
          yhid: myfun.fetch().yhid,
          bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
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
    changebb() {
      console.log('thyyy');
    },
    checkSurvey(pgbbh, bbpgbid, zt) {
      this.showsurvey = !this.showsurvey;
      this.bbinfo.pgbbh = pgbbh;
      this.bbinfo.bbpgbid = bbpgbid;
      this.bbinfo.zt = zt;
    }
  }
}
</script>

<style lang="scss">
  .el-tabs__item {
    font-size: 16px;
  }

  .test-content {
    width: 80%;
    margin: 50px auto 20px auto;
  }
</style>
