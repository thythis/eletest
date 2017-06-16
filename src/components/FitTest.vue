<template lang="html">
  <div>
    <div class="test-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="健康评估" name="first">
          <div v-if="!showsurvey">
            <div class="box">
              <div class="ribbon">
              </div>
              <span>2017小一班</span>
            </div>
            <el-table
              :data="pgblist"
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
              <!-- <el-table-column
                label="状态">
                <template scope="scope">
                  <el-tag
                    :type="scope.row.tag === '已评测' ? 'gray' : 'danger'"
                    close-transition>{{scope.row.tag}}</el-tag>
                </template>
              </el-table-column> -->
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
              <survey :pgbbh="pgbbh"></survey>
            </div>
          </transition>
        </el-tab-pane>
        <el-tab-pane label="健康监控" name="second">健康监控</el-tab-pane>
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
    var objstr = JSON.stringify({
      yhid: this.yhid
    });
    this.$http.post('http://127.0.0.1:8080/wbaobei/phone/fl', objstr).then(function(response){
      this.pgblist = response.body.results[0].zdList;
      console.log(response);
    }, function(response) {
      console.log('fail');
    })

    var objjjj = JSON.stringify({
      bbid: myfun.fetch().bbList[0].bbid
    });
    this.$http.post('http://127.0.0.1:8080/wbaobei/phone/tc', objjjj).then(function(response){
      console.log(response);
    }, function(response) {
      console.log('fail');
    })
  },
  data() {
    return {
      pgbbh: "",
      showsurvey: false,
      activeName: 'first',
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
      console.log(tab, event);
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
