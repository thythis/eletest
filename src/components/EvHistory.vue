<template lang="html">
  <div>
    <div class="history-panel">
      <el-tag class="toptag" type="gray">已评估的记录</el-tag>
      <div class="hisitem" v-for="item in hisList">
        <div class="box">
          <div class="ribbon">
          </div>
          <span>{{item.mc}}</span>
        </div>
        <el-table
          :data="item.list"
          :default-sort = "{prop: 'pgrq', order: 'descending'}"
          border
          stripe
          style="width: 100%">
          <el-table-column
            prop="pgrq"
            sortable
            label="评估日期">
            <!-- <template scope="scope">
              {{scope.row.list[0].pgrq}}
            </template> -->
          </el-table-column>
          <el-table-column
            prop="mc"
            label="筛查表">
          </el-table-column>
          <el-table-column
            prop="synld"
            label="年龄段">
            <!-- <template scope="scope">
              {{scope.row.list[0].synld}}
            </template> -->
          </el-table-column>
          <el-table-column
            prop="jg"
            label="结果"
            width="100"
            :filters="[{ text: '正常', value: '正常' }, { text: '可疑', value: '可疑' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template scope="scope">
              <el-tag
                :type="scope.row.jg == '1' ? 'success' : 'warning'"
                close-transition>{{scope.row.jg == '1' ? '正常' : '可疑'}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import myfun from '../assets/js/test.js'
export default {
  mounted() {
    var objjjj = JSON.stringify({
      yhid: myfun.fetch().yhid,
      bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
    });
    this.$http.post('http://127.0.0.1:8080/wbaobei/phone/pgbrecord',objjjj).then(function(response){
      console.log(response);
      this.hisList = response.body.results;
    }, function(response){
        console.log('fail');
    });
  },
  computed: {
    requestTc() {
      return this.$store.state.count
    }
  },
  watch: {
    requestTc(val) {
      var objjjj = JSON.stringify({
        yhid: myfun.fetch().yhid,
        bbid: myfun.fetch().bbList[this.$store.state.count].bbid,
      });
      this.$http.post('http://127.0.0.1:8080/wbaobei/phone/pgbrecord', objjjj).then(function(response){
        console.log(response);
        this.hisList = response.body.results;
      }, function(response) {
        this.loading = false;
        console.log('fail');
      })
    }
  },
  data() {
    return {
      hisList: [],
      tableData: [{
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '正常',
      }, {
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '可疑',
      }, {
        subtime: '2017-01-20',
        pgbname: '自闭症筛查',
        agerange: '6月-2岁',
        tag: '正常',
      }],
    }
  },
  methods: {
    filterTag(value, row) {
      return row.tag === value;
    }
  }
}
</script>

<style lang="scss">
  .history-panel {
    width: 80%;
    margin: 50px auto 0 auto;
    .toptag {
      margin-bottom: 20px;
    }
    .hisitem {
      margin-bottom: 20px;
    }
    .box {
      width: 100%;
    }
  }
</style>
