<template lang="html">
  <div>
    <div class="test-content">
      <el-tabs v-model="bbname" type="card" @tab-click="handleClick">
        <el-tab-pane v-for="item in bbList" :label="item.mc" :name="item.mc">
          <el-tabs v-model="activeName" @tab-click="handleBaby">
            <el-tab-pane label="健康评估" name="first">
              <div v-if="!showsurvey">
                <div class="box">
                  <div class="ribbon">
                  </div>
                  <span>{{bbname}}</span>
                </div>
                <el-table
                  :data="pgblist"
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
                      <el-button size="small" icon="search" type="danger" @click.native.prevent="checkSurvey(scope.row.pgbbh)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <transition name="el-fade-in">
                <div v-if="showsurvey">
                  <el-button type="primary" icon="arrow-left" @click="checkSurvey">返回</el-button>
                  <survey :pgbbh="pgbbh" :kh="kh"></survey>
                </div>
              </transition>
            </el-tab-pane>
            <el-tab-pane label="健康监控" name="second">
              <div v-if="!showsurvey">
                <el-table
                  :data="pgblist"
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
                      <el-button size="small" icon="search" type="danger" @click.native.prevent="checkSurvey(scope.row.pgbbh)">查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <transition name="el-fade-in">
                <div v-if="showsurvey">
                  <el-button type="primary" icon="arrow-left" @click="checkSurvey">返回</el-button>
                  <survey :pgbbh="pgbbh" :kh="kh"></survey>
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
    this.loading = true;
    this.$http.post('http://127.0.0.1:8080/wbaobei/phone/tc', objjjj).then(function(response){
      this.loading = false;
      if(response.body.results.length >= 2) {
        this.pgblist = response.body.results[1].zdlist;
        this.kh = response.body.results[1].kh;
      } else {
        this.pgblist = response.body.results[0].zdlist;
      }
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
      this.$http.post('http://127.0.0.1:8080/wbaobei/phone/tc', objjjj).then(function(response){
        this.loading = false;
        if(response.body.results.length >= 2) {
          this.pgblist = response.body.results[1].zdlist;
          this.kh = response.body.results[1].kh;
        } else {
          this.pgblist = response.body.results[0].zdlist;
        }
        console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    }
  },
  data() {
    return {
      yhid: myfun.fetch().yhid,
      bbindex: myfun.fetch().currenbaby,
      bbname: myfun.fetch().bbList[this.$store.state.count].mc,
      bbList: myfun.fetch().bbList,
      pgbbh: "",
      kh: "",
      loading: false,
      showsurvey: false,
      activeName: 'first',
      activeBaby: myfun.fetch().bbList[0].mc,
      pgblist: [],
      tableData: [{
        pgbname: '儿童行为量表',
        agerange: '2岁-4岁11月',
        tag: '已评测',
      }, {
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '可查看报告',
      }, {
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '可查看报告',
      }],
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
      this.$http.post('http://127.0.0.1:8080/wbaobei/phone/tc', objjjj).then(function(response){
        this.loading = false;
        if(response.body.results.length >= 2) {
          this.pgblist = response.body.results[1].zdlist;
          this.kh = response.body.results[1].kh;
        } else {
          this.pgblist = response.body.results[0].zdlist;
        }
        console.log(response);
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    },
    changebb() {
      console.log('thyyy');
    },
    checkSurvey(pgbbh) {
      this.showsurvey = !this.showsurvey;
      this.pgbbh = pgbbh;
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
